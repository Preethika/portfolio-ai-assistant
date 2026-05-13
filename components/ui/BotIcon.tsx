// components/ui/BotIcon.tsx
interface BotIconProps {
  size?: number;
  className?: string;
}

export default function BotIcon({ size = 14, className = '' }: BotIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent2)"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
      <circle cx="9"  cy="11" r="1"   fill="var(--accent2)" stroke="none" />
      <circle cx="15" cy="11" r="1"   fill="var(--accent2)" stroke="none" />
    </svg>
  );
}
