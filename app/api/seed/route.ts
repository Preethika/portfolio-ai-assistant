// app/api/seed/route.ts
// POST /api/seed?secret=YOUR_SECRET — run once to populate Supabase pgvector
import { NextRequest, NextResponse } from 'next/server';
import { embedText } from '@/lib/gemini';
import { supabaseAdmin } from '@/lib/supabase';
import { PORTFOLIO_KNOWLEDGE } from '@/lib/rag';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  console.log('1 Seeding portfolio knowledge with secret:', secret);
  // Simple protection — set SEED_SECRET in env
  if (secret !== process.env.SEED_SECRET) {
    console.log('Unauthorized seed attempt with secret:', secret);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = supabaseAdmin();
  const results: string[] = [];
  let success = 0;
  let failed = 0;

  for (const chunk of PORTFOLIO_KNOWLEDGE) {
    try {
      console.log('3 Seeding chunk:', chunk.content.slice(0, 50) + '...', chunk.metadata);
      const embedding = await embedText(chunk.content);

      const { error } = await client.from('portfolio_chunks').insert({
        content: chunk.content,
        embedding,
        metadata: chunk.metadata,
      });

      if (error) {
        results.push(`FAILED: ${chunk.metadata.section} — ${error.message}`);
        failed++;
      } else {
        results.push(`OK: ${chunk.metadata.section}`);
        success++;
      }
    } catch (err) {
      results.push(`ERROR: ${chunk.metadata.section} — ${String(err)}`);
      failed++;
    }
  }

  return NextResponse.json({
    message: `Seeded ${success}/${PORTFOLIO_KNOWLEDGE.length} chunks`,
    success,
    failed,
    results,
  });
}

// Add SEED_SECRET to .env.local, e.g.:
// SEED_SECRET=supersecretvalue123
// Then run: curl -X POST "http://localhost:3000/api/seed?secret=supersecretvalue123"
