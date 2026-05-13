// components/ui/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <>
      <p className="font-mono text-[11px] text-accent2 tracking-[2px] uppercase mb-3">{eyebrow}</p>
      <h2 className="text-[34px] font-light text-white tracking-[-1px] mb-2 leading-tight">{title}</h2>
      <p className="text-[16px] text-[var(--muted)] font-light leading-[1.7] mb-12">{subtitle}</p>
    </>
  );
}
