// components/ui/DownloadIcon.tsx
interface DownloadIconProps { size?: number; color?: string }

export default function DownloadIcon({ size = 18, color = 'var(--green)' }: DownloadIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 3v13M7 11l5 5 5-5" />
      <path d="M5 19h14" />
    </svg>
  );
}
