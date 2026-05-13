// lib/rag.ts
import { embedText } from './gemini';
import { supabaseAdmin } from './supabase';

export interface RagChunk {
  id: number;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
}

/**
 * Given a user question, embed it and retrieve the top-k most relevant
 * portfolio knowledge chunks from Supabase pgvector.
 */
export async function retrieveRelevantChunks(
  query: string,
  matchCount = 5
): Promise<RagChunk[]> {
  try {
    console.log('1 RAG')
    const embedding = await embedText(query);
    console.log('1a RAG ', embedding.length, embedding.slice(0, 5))

    const client = supabaseAdmin();
    const { data, error } = await client.rpc('match_portfolio_chunks', {
      query_embedding: embedding,
      match_threshold: 0.1,
      match_count: matchCount,
    });
    console.log('2 RAG', { data, error })

    if (error) {
      console.error('RAG retrieval error:', error);
      return [];
    }
    console.log('3 RAG')
    return (data as RagChunk[]) || [];
  } catch (err) {
    console.log('4 RAG')
    console.error('RAG error:', err);
    return [];
  }
}

/**
 * Seed the portfolio knowledge base.
 * Run this once (e.g. via POST /api/seed) to populate the vector store.
 */
export const PORTFOLIO_KNOWLEDGE: Array<{ content: string; metadata: Record<string, unknown> }> = [
  {
    content:
      'I am a Senior Full Stack Engineer with 12+ years of experience building scalable enterprise web, mobile, and AI-powered platforms. I specialize in React, Next.js, Node.js, React Native, TypeScript, cloud-based architectures, and AI integrations. I have delivered analytics and automation systems that reduced regression defects by 30–40%, improved operational efficiency, and accelerated release cycles across enterprise teams.',
    metadata: { section: 'summary' },
  },
  {
    content: 'I am actively exploring Senior, Staff, and Lead Engineering roles and am available within 1 week of an accepted offer.',
    metadata: { section: 'opportunities' },
  },
  {
    content: 'Most impactful project: AI-resume assistant. Developed an AI-powered interactive resume platform enabling recruiters to explore candidate experience through conversational interactions. Built a resume-trained chatbot capable of answering questions about skills, projects, achievements, and work experience. Designed RAG-based retrieval pipeline to generate grounded and accurate responses from resume data. Integrated streaming AI responses for a real-time conversational experience. Deployed scalable full stack architecture with cloud-hosted frontend and backend services Stack: Next.js, FastAPI, Kafka, pgvector, Ollama.',
    metadata: { section: 'projects', project: 'ai-analytics' },
  },
  {
    content:
      'My core tech stack includes React, Next.js, TypeScript, JavaScript, Node.js, React Native, GraphQL, Redux, Tailwind CSS, Material UI, AG Grid, Jest, Cypress, Appium, Kubernetes, SQLite, and Supabase. For AI engineering I use Google Gemini API, Ollama, ChromaDB, pgvector, RAG pipelines, semantic search, embeddings, and streaming AI responses.',
    metadata: { section: 'stack' },
  },

  {
    content:
      'Built 4 internal automation platforms that reduced manual operational work by 30% and improved productivity across engineering workflows. Developed centralized workflow systems eliminating Excel-based coordination, reporting, and manual validation processes.',
    metadata: { section: 'achievements' },
  },

  {
    content:
      'Developed a centralized Change Management Portal to automate project release locking, project access approvals, workflow orchestration, reporting, and manual operational tasks. Eliminated Excel-based coordination and improved release governance efficiency across teams.',
    metadata: {
      section: 'projects',
      project: 'change-management-portal',
    },
  },

  {
    content:
      'Developed an Improvement Ideas Management Platform that automated idea submission tracking, data validation, reporting workflows, and analytics. Eliminated spreadsheet-driven operations and reduced repetitive manual effort for business teams.',
    metadata: {
      section: 'projects',
      project: 'improvement-management-system',
    },
  },

  {
    content:
      'AI Resume Assistant project: Developed an AI-powered interactive resume platform enabling recruiters to explore candidate experience through conversational interactions. Built a resume-trained chatbot capable of answering questions about skills, projects, achievements, and work experience. Designed a RAG-based retrieval pipeline using Gemini embeddings and Supabase pgvector to generate grounded responses from resume data. Integrated streaming AI responses for real-time conversational experience. Stack: Next.js, TypeScript, Gemini API, Supabase pgvector, Tailwind CSS.',
    metadata: {
      section: 'projects',
      project: 'ai-resume-assistant',
    },
  },

  {
    content:
      'AI Workspace platform: Led the design and development of a full-stack AI-powered workspace supporting conversational AI, semantic document search, embeddings, vector retrieval, and natural language data insights. Built hybrid semantic search using embeddings, ChromaDB, keyword ranking, and RAG pipelines. Integrated streaming responses and context-aware conversational workflows. Stack: React, Node.js, TypeScript, Ollama, ChromaDB, SQLite, Tailwind CSS.',
    metadata: {
      section: 'projects',
      project: 'ai-workspace',
    },
  },

  {
    content:
      'Finance Data Hub mobile analytics platform: Built an executive mobile analytics application delivering AI-powered business insights, KPI monitoring, and region-wise financial drill-down analysis. Implemented user-specific KPI watchlists and integrated Appium automation into CI pipelines, reducing regression defects by 30%. Stack: React Native, TypeScript, GraphQL, Redux, Jest, Appium.',
    metadata: {
      section: 'projects',
      project: 'finance-data-hub',
    },
  },

  {
    content:
      'Sam’s Club Financial Reporting System: Developed enterprise P&L visualization and budgeting platform supporting multi-region financial analysis and long-range planning. Implemented AG Grid-based dynamic reporting modules and integrated Cypress automation into CI/CD workflows to accelerate release validation. Stack: React.js, Redux, AG Grid, Material UI, Jest, Cypress, Kubernetes.',
    metadata: {
      section: 'projects',
      project: 'sams-club-financial-reporting',
    },
  },

  {
    content:
      'Annual Operating Plan Financial Reporting System: Developed executive financial dashboards supporting annual budgeting and long-range planning for 200+ business executives. Delivered real-time sales and P&L analytics improving decision-making speed by 30% and reducing manual analysis effort by 35% through automated reporting workflows.',
    metadata: {
      section: 'projects',
      project: 'annual-operating-plan',
    },
  },

  {
    content:
      'Walmart Global Tech India: Leading frontend engineering for enterprise analytics platforms using React, React Native, TypeScript, and AI-powered analytics systems. Architected scalable Redux-based state management solutions for KPI-driven executive dashboards and integrated Appium automation into CI pipelines reducing regression defects by 30%.',
    metadata: {
      section: 'experience',
      company: 'walmart-global-tech',
    },
  },

  {
    content:
      'Gogo Inc: Built high-performance AG Grid-based financial data visualization systems handling multi-year datasets. Implemented Cypress automation within CI/CD pipelines reducing manual QA effort and improving release efficiency. Contributed to React migration and component-driven frontend architecture modernization.',
    metadata: {
      section: 'experience',
      company: 'gogo-inc',
    },
  },

  {
    content:
      'IBM India Pvt Ltd: Delivered automation and analytics platforms reducing manual validation effort by 40% and saving over 30 hours per week of operational work. Built workflow automation portals eliminating Excel-based processes and contributed to UI modernization initiatives including Mainframe-to-Angular migration proof of concept.',
    metadata: {
      section: 'experience',
      company: 'ibm',
    },
  },

  {
    content:
      'Leadership experience: Mentored junior developers, guided frontend architecture modernization initiatives, and promoted engineering best practices around scalable UI architecture, state management, testing automation, and workflow optimization.',
    metadata: { section: 'leadership' },
  },

  {
    content:
      'Professional impact metrics: 12+ years of engineering experience, 4 automation platforms delivered, 30–40% reduction in regression defects and manual operational effort, enterprise financial platforms supporting executive-level analytics and decision-making.',
    metadata: { section: 'stats' },
  },

  {
    content:
      'I am actively exploring Senior Full Stack, Staff Engineer, Lead Frontend, and AI Engineering roles focused on scalable product engineering, AI integrations, analytics platforms, and developer tooling. Open to remote and high-impact engineering opportunities.',
    metadata: { section: 'availability' },
  },
];
