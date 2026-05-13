// components/sections/HeroLeft.tsx
const STATS = [
  { val: '12', sup: '+', label: 'Years experience' },
  { val: '4', sup: '+', label: 'AI/RAG projects' },
  { val: '99', sup: '%', label: 'System Reliability' },
];

export default function HeroLeft() {
  return (
    <div className="relative z-10">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot flex-shrink-0" />
        <span className="font-mono text-[15px] text-[var(--muted)] tracking-[1.5px]">
          Available for senior engineering roles
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-[58px] font-light text-white tracking-[-2.2px] leading-[1.05] mb-3 max-md:text-[44px] max-sm:text-[36px] max-sm:tracking-[-1.2px]">
        Senior Full Stack<br />
        <em className="not-italic text-accent2 font-normal">Engineer</em> &amp;<br />
        AI Builder.
      </h1>

      {/* Role line — bigger per spec */}
      <div className="font-mono text-[15px] text-[var(--muted)] tracking-[1px] mb-6">
        &gt; 12+ years &nbsp;·&nbsp; Systems at scale &nbsp;·&nbsp; Remote-first
      </div>

      {/* Description */}
      <p className="text-[17px] text-[var(--sub)] leading-[1.8] font-light mb-10 ">
        I design and ship production-grade systems with a bias for AI integration and outcomes that move the needle. Ask my <span className="text-accent">AI assistant</span> anything.
      </p>

      {/* Buttons */}
      <div className="flex gap-2.5 flex-wrap max-sm:flex-col">
        <a href="#ai-assistant"
          className="bg-accent text-white text-[15px] font-medium px-6 py-3 rounded-[8px] hover:opacity-85 transition-opacity cursor-pointer text-center">
          Chat with AI me
        </a>
        <a href="#work"
          className="text-[15px] text-[var(--muted)] px-[18px] py-[11px] border-half border-[var(--border2)] rounded-[8px] hover:border-white/30 hover:text-[var(--sub)] transition-all cursor-pointer text-center">
          View projects
        </a>
        <a href="#contact"
          className="text-[15px] text-[var(--muted)] px-[18px] py-[11px] border-half border-[var(--border2)] rounded-[8px] hover:border-white/30 hover:text-[var(--sub)] transition-all cursor-pointer text-center">
          Book a call
        </a>
      </div>

      {/* Stats */}
      <div className="flex gap-10 mt-14 pt-10 border-t-half border-[var(--border)] flex-wrap max-sm:gap-7">
        {STATS.map(s => (
          <div key={s.label}>
            <div className="text-[30px] font-light text-white tracking-[-1px] leading-none">
              {s.val}<span className="text-accent2 font-normal">{s.sup}</span>
            </div>
            <div className="text-[12px] text-[var(--muted)] mt-1.5 tracking-[0.5px]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
