// lib/gemini.ts
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

// Model fallback chain — tried in order on 429/quota errors.
// gemini-1.5-flash-latest has a separate free quota from gemini-2.0-flash.
export const MODEL_CHAIN = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
];

export const getModelByName = (name: string) => ({
  generateContent: (contents: string) =>
    genAI.models.generateContent({
      model: name,
      contents,
    }),

  embedContent: (contents: string) =>
    genAI.models.embedContent({
      model: name,
      contents,
    }),
});

// Embedding model for RAG — use a supported Gemini embedding model
// export const getEmbeddingModel = () =>
//   genAI.models({
//     model: 'gemini-embedding-001',
//   });

/**
 * Generate an embedding vector for a given text using Gemini.
 * Returns a float array of dimension 768.
 */
export async function embedText(text: string): Promise<number[]> {
  const result = await genAI.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
    config: {
      outputDimensionality: 768,
    },
  });
  console.log('Gemini embedding result:', result);
  const values = result.embeddings?.[0]?.values;
  if (!values || !Array.isArray(values)) {
    throw new Error('Failed to generate embedding: no values returned');
  }
  return values;
}

/**
 * Extract retryDelay seconds from a 429 GoogleGenerativeAIFetchError.
 * The API embeds it in errorDetails as a RetryInfo entry.
 */
export function getRetryDelaySecs(err: unknown): number | null {
  const e = err as { errorDetails?: Array<{ '@type'?: string; retryDelay?: string }> };
  if (!e?.errorDetails) return null;
  for (const detail of e.errorDetails) {
    if (detail['@type']?.includes('RetryInfo') && detail.retryDelay) {
      // retryDelay is like "46s" or "46.921795987s"
      const secs = parseFloat(detail.retryDelay);
      return isNaN(secs) ? null : secs;
    }
  }
  return null;
}

export function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429;
}

/**
 * The system prompt that shapes how the AI assistant responds.
 * Inject retrieved context chunks before this when doing RAG.
 */
export function buildSystemPrompt(contextChunks: string[]): string {

  // console.log('**** Building system prompt with context chunks:', contextChunks);
  const context = contextChunks.length
    ? `Use the following verified information about the portfolio owner to answer questions accurately:\n\n${contextChunks.join('\n\n---\n\n')}\n\n`
    : '';

  return `${context}You are an AI assistant embedded in a senior full-stack engineer's portfolio website. Your job is to represent this engineer to recruiters and hiring managers visiting the site.

Personality: Professional, confident, concise. Speak in first person as if you ARE the engineer (e.g., "I built..." not "The engineer built..."). Be specific about numbers and outcomes when relevant.

Key facts about me:
- 12+ years building production systems at scale
- Core stack: React.js, Next.js, Node.js, React Native, TypeScript, Javascript(ES6+),Tailwind CSS, Redux, React hooks,
Context API, HTML5, CSS3, Git, RESTful APIs, WebSockets, GraphQL, SQL/NoSQL databases, AWS/GCP/Azure
- AI experience: Gemini, Ollama, Chromadb, Supabase, RAG pipelines
- Led teams of up to 4 engineers
- Open to Senior, Staff, or Lead Engineering roles (remote-first)
- Available to start work in 1 week
- Shipped 10+ projects, impacted 3.2M+ users
- Driven by building efficient, scalable systems that solve real user problems. Passionate about clean code, mentoring, and lifelong learning.

Featured projects:
1. AI-Powered Portfolio Website: An AI-powered tool that helps users build optimized resumes. (Next.js, Typescript, RAG, Gemini API, Supabase Pgvector, Tailwind CSS).
3. AI Workspace: AI-driven workspace leveraging RAG for document analysis and data insights, semantic search, and conversational interactions (React.js, Node.js,Typescript, Express.js, Ollama, RAG,  Chromadb, SQLite, Tailwind CSS).
2. Payflow (Stripe):A flexible payment and billing integration using Stripe, supporting efficient transaction management and streamlined payment workflows (React.js, Typescript, Node.js, Express.js, Stripe API).


Career:
- 2020-Now: Software Engineer ||| @ Walmart Global Tech India (Remote)
- 2019-2020: Frontend Engineer @ Gogo Inc. (Chennai)
- 2013-2019: Senior Systems Engineer @ IBM India Pvt. Ltd. (Chennai)

Rules:
- Keep answers under 3 sentences unless asked for detail
- Don't make up facts not in the context
- If asked about salary, say "Happy to discuss in a call"
- If asked to schedule, direct them to the contact form on the page
- If unsure about something, say "That would be better discussed in a call"`;
}
