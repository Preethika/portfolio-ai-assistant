// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for admin ops like inserting embeddings)
export const supabaseAdmin = () =>
  createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

/*
  ──────────────────────────────────────────────────────────────────────────────
  SUPABASE SETUP — run these SQL commands in your Supabase SQL editor:
  ──────────────────────────────────────────────────────────────────────────────

  -- 1. Enable pgvector extension
  create extension if not exists vector;

  -- 2. Portfolio knowledge base table
  create table portfolio_chunks (
    id          bigserial primary key,
    content     text not null,
    embedding   vector(768),   -- Gemini embedding-001 outputs 768 dims
    metadata    jsonb default '{}',
    created_at  timestamptz default now()
  );

  -- 3. HNSW index for fast similarity search
  create index on portfolio_chunks
    using hnsw (embedding vector_cosine_ops)
    with (m = 16, ef_construction = 64);

  -- 4. Contact submissions table
  create table contact_submissions (
    id          bigserial primary key,
    name        text not null,
    email       text not null,
    company     text,
    role_level  text,
    message     text not null,
    created_at  timestamptz default now()
  );

  -- 5. Match function for RAG similarity search
  create or replace function match_portfolio_chunks (
    query_embedding vector(768),
    match_threshold float default 0.75,
    match_count     int  default 5
  )
  returns table (
    id       bigint,
    content  text,
    metadata jsonb,
    similarity float
  )
  language sql stable
  as $$
    select
      id, content, metadata,
      1 - (embedding <=> query_embedding) as similarity
    from portfolio_chunks
    where 1 - (embedding <=> query_embedding) > match_threshold
    order by similarity desc
    limit match_count;
  $$;

  ──────────────────────────────────────────────────────────────────────────────
*/
