# Portfolio — Next.js + Gemini + Supabase pgvector + Resend

A production-grade AI-powered portfolio built with:
- **Next.js 14** (App Router, Server Components, streaming)
- **Google Gemini 1.5 Flash** (free tier) — AI chat + response generation
- **Gemini text-embedding-004** — vector embeddings for RAG
- **Supabase pgvector** — vector similarity search knowledge base
- **Resend** — transactional email (contact form + AI-generated acknowledgements)

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local` and fill in your keys:

```env
GEMINI_API_KEY=         # ai.google.dev → Get API Key (free)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=         # resend.com → free tier: 3000 emails/month
CONTACT_EMAIL=          # Your email to receive contact notifications
FROM_EMAIL=             # Verified sender (use onboarding@resend.dev for dev)
SEED_SECRET=            # Any random string, e.g. "mysecret123"
NEXT_PUBLIC_SITE_URL=   # e.g. https://yourname.dev (for resume redirect)
```

### 3. Set up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the SQL in `lib/supabase.ts` (the large comment block)
3. Copy your project URL + anon key + service role key into `.env.local`

### 4. Seed the AI knowledge base
```bash
npm run dev
# Then in another terminal:
curl -X POST "http://localhost:3000/api/seed?secret=mysecret123"
```
This embeds portfolio knowledge chunks into Supabase pgvector.

### 5. Add your resume
Place your resume PDF at `public/resume.pdf`

### 6. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Gemini streaming chat + RAG
│   │   ├── contact/route.ts     # Resend email + Supabase storage
│   │   ├── resume/route.ts      # Resume download handler
│   │   └── seed/route.ts        # One-time knowledge base seeding
│   ├── globals.css              # All styles (matches original design)
│   ├── layout.tsx
│   └── page.tsx                 # Main portfolio page
├── components/
│   ├── AIChat.tsx               # Reusable streaming AI chat component
│   ├── AISectionChatClient.tsx  # Section-level chat with FAQ wiring
│   ├── ContactForm.tsx          # Contact form → Resend
│   └── FloatingChatFab.tsx      # Floating AI + download buttons
├── lib/
│   ├── gemini.ts                # Gemini client + system prompt
│   ├── rag.ts                   # pgvector retrieval + knowledge chunks
│   └── supabase.ts              # Supabase client + SQL setup docs
└── public/
    └── resume.pdf               # ← Place your resume here
```

---

## Customization

### Update your info
Edit these files:
- `lib/rag.ts` → `PORTFOLIO_KNOWLEDGE` array — your actual experience/projects
- `lib/gemini.ts` → `buildSystemPrompt()` — your key facts and persona
- `app/page.tsx` → All the visible text, stats, timeline entries
- `app/globals.css` → Colors via CSS variables at `:root`

### Re-seed after changes
After updating `PORTFOLIO_KNOWLEDGE`, delete old rows and re-seed:
```sql
-- In Supabase SQL Editor
DELETE FROM portfolio_chunks;
```
Then `curl -X POST "http://localhost:3000/api/seed?secret=YOUR_SECRET"`

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel
```
Set all env vars in Vercel dashboard. The project deploys as-is.

---

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Streaming Gemini chat with RAG context |
| `/api/contact` | POST | Save contact + send Resend emails |
| `/api/resume` | GET | Serve/redirect to resume PDF |
| `/api/seed` | POST | Seed Supabase pgvector (one-time) |
