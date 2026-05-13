// components/sections/ProjectsSection.tsx
import SectionHeader from '@/components/ui/SectionHeader';
import { FaReact, FaNodeJs, FaGithub, FaRobot, FaHeart } from "react-icons/fa";
import {
  SiTypescript,
  SiOpenai,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiGooglegemini
} from "react-icons/si";

const PROJECTS = [
  {
    full: true,
    tag: 'Featured · LLM · RAG',
    accent: true,
    name: 'AI-Powered Portfolio Website',
    desc: 'Personal portfolio site with an integrated AI assistant. Agentic retrieval of personal info (e.g., resume details) to answer visitor questions in a portfolio context.',
    // metrics: [{ v: '↓ 68%', k: 'Query time' }, { v: '2M+', k: 'Events / day' }, { v: '$1.2M', k: 'Annual savings' }],
    stack: [
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "text-grey",
      },
      {
        name: "Typescript",
        icon: SiTypescript,
        color: "text-blue-500",
      },
      {
        name: "RAG",
        icon: FaRobot,
        color: "text-black",
      },
      {
        name: "Gemini API",
        icon: SiGooglegemini,
        color: "text-purple-500",
      },
      {
        name: "Supabase",
        icon: SiSupabase,
        color: "text-green",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-blue-400",
      },
    ]
  },
  {
    tag: 'Featured · LLM · RAG',
    accent: false,
    name: 'AI Workspace',
    desc: 'Demonstrates how LLM works with vector DB and structured data sources. Data insights convert user query to sql, run against a SQLite DB, then combined with retrieved context to answer user questions in a chat interface.',
    features: ['RAG pipelines for document Q&A and data insights', 'Conversational interface with streaming response and contextual memory', 'Semantic search with embeddings'],
    // metrics: [{ v: '1.4K ★', k: 'GitHub stars' }],
    stack: [
      {
        name: "React JS",
        icon: FaReact,
        color: "text-cyan-400",
      },
      {
        name: "Typescript",
        icon: SiTypescript,
        color: "text-blue-400",
      },
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "text-green",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-black",
      },
      {
        name: "AI/LLM",
        icon: SiOpenai,
        color: "text-white",
      },
      {
        name: "RAG",
        icon: FaRobot,
        color: "text-grey",
      },

    ],
  },
  {
    tag: 'FinTech',
    accent: false,
    name: 'PayFlow (Stripe)',
    desc: 'A flexible payment and billing integration using Stripe, supporting efficient transaction management and streamlined payment workflows',
    // metrics: [{ v: '99.98%', k: 'Uptime' }, { v: '400K', k: 'DAU' }],
    stack: [
      {
        name: "React JS",
        icon: FaReact,
        color: "text-cyan-400",
      },
      {
        name: "Typescript",
        icon: SiTypescript,
        color: "text-blue-400",
      },
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "text-green",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-black",
      },
    ],
  },
];

// const BADGES = [
//   { icon: '🏆', label: 'Scale Wizard' },
//   { icon: '⚡', label: 'AI Pioneer' },
//   { icon: '🌿', label: 'Open Source Hero' },
// ];

export default function ProjectsSection() {
  return (
    <section id="work" className="px-12 py-20 border-t-half border-[var(--border)] max-md:px-6 max-md:py-14">
      <SectionHeader eyebrow="FEATURED WORK" title="Work that ships." subtitle="Real outcomes, real numbers." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border-half border-[var(--border)] rounded-[12px] overflow-hidden">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            className={`bg-[var(--surface)] p-7 relative overflow-hidden hover:bg-[#12121c] transition-colors ${p.full ? 'md:col-span-2' : ''}`}
          >
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-px ${p.accent ? 'bg-gradient-to-r from-accent to-transparent' : 'bg-gradient-to-r from-accent to-transparent'}`} />

            <div className="inline-block text-[11px] text-[var(--muted)] border-half border-[var(--border2)] px-2 py-[3px] rounded-[4px] mb-3.5 tracking-[0.5px]">{p.tag}</div>
            <div className="text-[19px] font-normal text-white mb-2 tracking-[-0.3px]">{p.name}</div>
            <p className="text-[16px] text-[var(--muted)] leading-[1.7] font-light mb-5">{p.desc}</p>

            {p.features && (
              <div className="flex gap-6 mb-5 ">
                {p.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[16px] text-green mt-0.5">•</span>
                    <span className="text-[14px] text-[var(--muted)]">{f}</span>
                  </div>
                ))}
              </div>
            )}
            {p.stack && (
              <div className="mt-6 flex flex-wrap gap-2">
                {Array.isArray(p.stack) && p.stack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <span
                      key={tech.name}
                      className=" flex items-center gap-2 px-4 py-2
                                                bg-white/10 rounded text-sm text-[var(--muted)]"
                    >
                      {Icon && <Icon className={`text-lg ${tech.color || ""}`} />}
                      <span>{tech.name}</span>
                    </span>

                  );
                })}

              </div>
            )}

            {/* <div className="flex gap-6 mb-5 flex-wrap">
              {p.metrics.map(m => (
                <div key={m.k}>
                  <div className="text-[21px] font-light text-green tracking-[-0.5px] font-mono">{m.v}</div>
                  <div className="text-[12px] text-[var(--muted)] mt-0.5">{m.k}</div>
                </div>
              ))}
            </div> */}

            {/* <div className="flex gap-1.5 flex-wrap">
              {p.stack.map(s => (
                <span key={s} className="text-[13px] text-[var(--muted)] bg-white/[0.04] px-[7px] py-[3px] rounded-[4px]">{s}</span>
              ))}
            </div> */}


            {/* <div className="absolute bottom-6 right-6 text-[15px] text-[var(--muted)]">↗</div> */}
          </div>
        ))}
      </div>

      {/* <div className="flex gap-2.5 mt-5 flex-wrap">
        {BADGES.map(b => (
          <div key={b.label} className="flex items-center gap-2 bg-[rgba(245,158,11,0.06)] border-half border-[rgba(245,158,11,0.2)] rounded-[8px] px-3 py-2">
            <span className="text-[14px]">{b.icon}</span>
            <span className="text-[12px] font-medium text-[rgba(252,211,77,0.85)]">{b.label}</span>
          </div>
        ))}
        <div className="bg-white/[0.02] border-half border-[var(--border)] rounded-[8px] px-3 py-2 text-[12px] text-white/15">🔒 &nbsp;Keep scrolling to unlock</div>
      </div> */}
    </section>
  );
}
