// components/ui/TypingDots.tsx
export default function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] px-3 py-2 rounded-[9px] bg-[var(--surface2)] border border-half border-[var(--border)] max-w-[87%]">
      <span className="w-1 h-1 rounded-full bg-[var(--muted)] animate-bounce-dot   inline-block" />
      <span className="w-1 h-1 rounded-full bg-[var(--muted)] animate-bounce-dot-2 inline-block" />
      <span className="w-1 h-1 rounded-full bg-[var(--muted)] animate-bounce-dot-3 inline-block" />
    </div>
  );
}
