// components/sections/ContactSection.tsx
import ContactForm from '@/components/ContactForm';

const PERKS = [
  'Open to Senior / Staff / Lead roles',
  'Comfortable with assignments/technical interviews',
  'Responds within 24 hours',
  'AI answers initial screening instantly',
];

const TRUST = [
  { icon: '📄', label: 'Resume on request' },
  { icon: '🔗', label: 'LinkedIn verified' },
  { icon: '📞', label: 'References available' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="px-12 py-20 border-t-half border-[var(--border)] max-md:px-6 max-md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 border-half border-[rgba(94,234,212,0.3)] px-3.5 py-1.5 rounded-[40px] mb-7">
            <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
            <span className="text-[12px] text-green font-mono tracking-[1px]">Actively exploring roles</span>
          </div>

          <h2 className="text-[36px] font-light text-white tracking-[-1.2px] leading-[1.15] mb-4">
            Let&apos;s schedule a<br /><em className="not-italic text-accent2">conversation.</em>
          </h2>

          <p className="text-[16px] text-[var(--muted)] leading-[1.8] font-light mb-7">
            I&apos;m open to Senior, Staff, and Lead Engineering roles at companies building meaningful products. If my background fits what your team needs, I&apos;d welcome an introductory call.
          </p>

          <div className="flex flex-col gap-3 mb-7">
            {PERKS.map(p => (
              <div key={p} className="flex items-center gap-3 text-[14px] text-[var(--sub)] font-light">
                <div className="w-4 h-px bg-green flex-shrink-0" />
                {p}
              </div>
            ))}
          </div>

          <div className="flex gap-5 pt-5 border-t-half border-[var(--border)] flex-wrap">
            {TRUST.map(t => (
              <div key={t.label} className="flex items-center gap-1.5 text-[13px] text-white/25">
                <span>{t.icon}</span> {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right: live form */}
        <ContactForm />
      </div>
    </section>
  );
}
