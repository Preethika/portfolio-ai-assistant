// components/sections/HeroRight.tsx
import HeroChatCard from '@/components/chat/HeroChatCard';
import DownloadIcon from '@/components/ui/DownloadIcon';

export default function HeroRight() {
  return (
    <div className="relative z-10 flex flex-col gap-3 hidden md:flex">

      {/* Resume download card */}
      <a
        href="/Resume-PreethikaR.pdf"
        download="Resume-PreethikaR.pdf"
        className="bg-[var(--surface)] border-half border-[var(--border2)] rounded-[14px] px-5 py-5 flex items-center justify-between gap-3 hover:border-[rgba(94,234,212,0.4)] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[9px] bg-[rgba(94,234,212,0.1)] border-half border-[rgba(94,234,212,0.3)] flex items-center justify-center flex-shrink-0">
            <DownloadIcon size={20} />
          </div>
          <div>
            <div className="text-[15px] font-medium text-white mb-0.5">Download Resume</div>
            <div className="text-[12px] text-[var(--muted)] font-mono">PDF · Updated 2026</div>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot flex-shrink-0" />
          <div className="bg-[rgba(94,234,212,0.12)] border-half border-[rgba(94,234,212,0.3)] text-green text-[12px] font-medium font-mono px-3.5 py-2 rounded-[6px] whitespace-nowrap">
            ↓ PDF
          </div>
        </div> */}
      </a>

      {/* AI Chat card — 20% bigger than before */}
      <HeroChatCard />

    </div>
  );
}
