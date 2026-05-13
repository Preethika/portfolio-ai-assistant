// components/sections/Footer.tsx
const LINKS = [
  { label: 'GitHub',   href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email',    href: 'mailto:you@email.com' },
];

export default function Footer() {
  return (
    <footer className="px-12 py-7 border-t-half border-[var(--border)] flex justify-between items-center flex-wrap gap-3 max-md:px-6">
      <div className="font-mono text-[12px] text-white/15 tracking-[2px]">// YOURNAME.DEV</div>
      <div className="flex gap-6">
        {LINKS.map(l => (
          <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
            className="text-[13px] text-white/20 hover:text-[var(--muted)] transition-colors cursor-pointer">
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
