// components/sections/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-5 border-b-half border-[var(--border)] sticky top-0 z-[100] bg-[rgba(9,9,14,0.92)] backdrop-blur-[12px)] max-md:px-6">
      <div className="text-[20px] text-accent2 tracking-[2px] cursor-pointer">Preethika</div>

      <div className="hidden md:flex gap-8">
        {['Work', 'Stack', 'Timeline', 'Contact'].map(label => (
          <a key={label} href={`#${label.toLowerCase()}`}
            className="text-[14px] text-[var(--muted)] hover:text-[var(--sub)] transition-colors cursor-pointer">
            {label}
          </a>
        ))}
      </div>

      <a href="#contact"
        className="text-[14px] font-medium text-accent2 border-half border-[rgba(124,110,245,0.4)] px-[18px] py-[7px] rounded-[40px] hover:bg-[rgba(124,110,245,0.12)] hover:border-[rgba(124,110,245,0.7)] transition-all cursor-pointer">
        Book a call
      </a>
    </nav>
  );
}
