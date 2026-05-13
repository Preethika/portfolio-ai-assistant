// components/fab/FabRail.tsx
'use client';

import BotIcon from '@/components/ui/BotIcon';
import DownloadIcon from '@/components/ui/DownloadIcon';

interface FabRailProps {
  visible: boolean;
  chatOpen: boolean;
  onToggleChat: () => void;
  onDownload: () => void;
}

export default function FabRail({ visible, chatOpen, onToggleChat, onDownload }: FabRailProps) {
  return (
    <div className={`
      fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-[9999]
      transition-all duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)]
      max-sm:right-3.5
      ${visible ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-[70px]'}
    `}>
      {/* AI button */}
      <div className="relative group">
        <button
          onClick={onToggleChat}
          className={`
            w-[46px] h-[46px] rounded-[13px] backdrop-blur-[12px] flex items-center justify-center
            border-half transition-all duration-200 cursor-pointer relative overflow-hidden
            shadow-[0_0_0_1px_rgba(243, 173, 98,0.1),0_4px_24px_rgba(0,0,0,0.4)]
            max-sm:w-[42px] max-sm:h-[42px]
            ${chatOpen
              ? 'bg-[rgba(244, 194, 77, 0.7)] border-[rgba(243, 173, 98,0.7)]'
              : 'bg-[rgba(20,20,32,0.92)] border-[rgba(243, 173, 98,0.45)] hover:bg-[rgba(243, 173, 98,0.18)] hover:border-[rgba(243, 173, 98,0.65)] hover:scale-[1.06]'}
          `}
        >
          <div className="absolute inset-[-1px] rounded-[13px] bg-[rgba(243, 173, 98,0.15)] animate-fab-glow pointer-events-none" />
          <BotIcon size={20} />
        </button>
        <span className="absolute right-[54px] top-1/2 -translate-y-1/2 bg-[rgba(15,15,23,0.95)] border-half border-[var(--border2)] text-[var(--sub)] text-[11px] font-mono px-[11px] py-[5px] rounded-[7px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_2px_12px_rgba(0,0,0,0.4)] tracking-[0.5px]">
          AI Assistant
        </span>
      </div>

      {/* Divider */}
      <div className="w-7 h-px bg-[var(--border2)] self-center" />

      {/* Download button */}
      <div className="relative group">
        <button
          onClick={onDownload}
          className="w-[46px] h-[46px] rounded-[13px] backdrop-blur-[12px] flex items-center justify-center border-half border-[rgba(86, 236, 84, 0.35)] bg-[rgba(20,20,32,0.92)] transition-all duration-200 hover:bg-[rgba(94,234,212,0.12)] hover:border-[rgba(94,234,212,0.65)] hover:scale-[1.06] cursor-pointer relative overflow-hidden shadow-[0_0_0_1px_rgba(94,234,212,0.05),0_4px_24px_rgba(0,0,0,0.4)] max-sm:w-[42px] max-sm:h-[42px]"
        >
          <div className="absolute inset-[-1px] rounded-[13px] bg-[rgba(94, 234, 136, 0.1)] animate-fab-glow-dl pointer-events-none" />
          {/* Green dot */}
          <span className="absolute top-[-3px] right-[-3px] w-2 h-2 rounded-full bg-green border-[1.5px] border-bg animate-pulse-dot" />
          <DownloadIcon size={20} />
        </button>
        <span className="absolute right-[54px] top-1/2 -translate-y-1/2 bg-[rgba(15,15,23,0.95)] border-half border-[var(--border2)] text-[var(--sub)] text-[11px] font-mono px-[11px] py-[5px] rounded-[7px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-[0_2px_12px_rgba(0,0,0,0.4)] tracking-[0.5px]">
          Download Résumé
        </span>
      </div>
    </div>
  );
}
