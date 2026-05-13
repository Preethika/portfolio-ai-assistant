// components/fab/DownloadToast.tsx
import DownloadIcon from '@/components/ui/DownloadIcon';

interface DownloadToastProps { visible: boolean }

export default function DownloadToast({ visible }: DownloadToastProps) {
  return (
    <div className={`
      fixed right-[82px] bottom-[calc(50%-80px)] z-[9999]
      flex items-center gap-3 px-[18px] py-3.5 rounded-[12px]
      bg-[var(--surface)] border-half border-[rgba(94,234,212,0.3)]
      shadow-[0_4px_24px_rgba(0,0,0,0.4)] whitespace-nowrap
      transition-opacity duration-200
      max-sm:right-16
      ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className="w-8 h-8 bg-[rgba(94,234,212,0.1)] rounded-[8px] flex items-center justify-center flex-shrink-0">
        <DownloadIcon size={16} />
      </div>
      <div>
        <div className="text-[13px] font-medium text-white mb-0.5">Resume-PreethikaR.pdf</div>
        <div className="text-[11px] text-[var(--muted)]">Downloading… </div>
      </div>
    </div>
  );
}
