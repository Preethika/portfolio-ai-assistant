// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { MODEL_CHAIN, buildSystemPrompt, is429, getRetryDelaySecs } from '@/lib/gemini';
import { retrieveRelevantChunks } from '@/lib/rag';
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Max seconds we'll wait before giving up on a 429 retry
const MAX_RETRY_WAIT_SECS = 10;

function buildChatHistory(messages: { role: string; content: string }[], systemPrompt: string) {
  const history: any[] = [
    { role: 'user' as const, parts: [{ text: systemPrompt }] },
    { role: 'model' as const, parts: [{ text: "Understood. I'm ready to represent you as your AI assistant. I'll answer questions concisely and professionally." }] },
  ];

  for (const msg of messages.slice(0, -1)) {
    if (msg.role === 'user') {
      history.push({ role: 'user' as const, parts: [{ text: msg.content }] });
    } else if (msg.role === 'assistant') {
      history.push({ role: 'model' as const, parts: [{ text: msg.content }] });
    }
  }

  return {
    history,
    generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
  };
}

/**
 * Try to get a stream from a model. Returns the stream or throws.
 * Tries each model in MODEL_CHAIN. On 429:
 *   - if retryDelay <= MAX_RETRY_WAIT_SECS, waits and retries same model once
 *   - otherwise falls through to next model in chain
 */
async function getStream(
  messages: { role: string; content: string }[],
  systemPrompt: string,
  lastUserMessage: string
) {

  for (const modelName of MODEL_CHAIN) {
    try {
      // Prepend system prompt to the message
      const fullMessage = systemPrompt + '\n\n' + lastUserMessage;
      console.log('1 get Stream with messages:', 'model:', modelName, fullMessage.slice(0, 5));
      let result;
      try {
        result = await genAI.models.generateContentStream({
          model: modelName,
          contents: fullMessage,
        });
        console.log('2 result from Gemini:', result);
      } catch (err) {
        console.error('Error during generateContentStream:', err);
        throw err;
      }

      console.log(`[chat] using model: ${modelName}`);

      return result;
    } catch (err) {
      if (is429(err)) {
        const delaySecs = getRetryDelaySecs(err);
        console.warn(`[chat] 429 on ${modelName}, retryDelay=${delaySecs}s`);

        // Short wait — retry same model once
        if (delaySecs !== null && delaySecs <= MAX_RETRY_WAIT_SECS) {
          console.log(`[chat] waiting ${delaySecs}s then retrying ${modelName}…`);
          await new Promise(r => setTimeout(r, delaySecs * 1000));
          try {
            const fullMessage = systemPrompt + '\n\n' + lastUserMessage;
            const result2 = await genAI.models.generateContentStream({
              model: modelName,
              contents: fullMessage,
            });
            console.log(`[chat] retry succeeded on ${modelName}`);
            return result2;
          } catch (retryErr) {
            console.warn(`[chat] retry also failed on ${modelName}:`, retryErr);
            // fall through to next model
          }
        }
        // delay too long or retry failed — try next model in chain
        continue;
      }
      // Non-429 error — rethrow immediately
      throw err;
    }
  }
  // All models exhausted
  throw new Error('All models quota-exhausted. Please try again in a few minutes.');
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastUserMessage = messages[messages.length - 1]?.content ?? '';
    const chunks = await retrieveRelevantChunks(lastUserMessage);
    console.log('Last user message:', lastUserMessage, chunks);
    const systemPrompt = buildSystemPrompt(chunks.map(c => {
      console.log('** RAG chunk metadata:', c.content, c.metadata);
      return c.content
    }));

    // console.log('**** systemPrompt:', systemPrompt);

    let streamResult;
    try {
      streamResult = await getStream(messages, systemPrompt, lastUserMessage);
      console.log('[chat] obtained streamResult:', streamResult);
    } catch (err) {
      const isQuota = is429(err) || (err as Error).message?.includes('quota-exhausted');
      const delaySecs = is429(err) ? getRetryDelaySecs(err) : null;
      const msg = isQuota
        ? `I'm getting a lot of questions right now — quota limit hit.${delaySecs ? ` Please try again in ~${Math.ceil(delaySecs)}s.` : ' Please try again in a minute.'}`
        : "Something went wrong on my end. Please try again.";

      // Return a graceful SSE message instead of a hard error
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`0:${JSON.stringify(msg)}\n`));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'X-Vercel-AI-Data-Stream': 'v1' },
      });
    }

    // Pipe the stream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
          }
        } catch (err) {
          console.error('[chat] stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    });
  } catch (error) {
    console.error('[chat] unhandled error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
