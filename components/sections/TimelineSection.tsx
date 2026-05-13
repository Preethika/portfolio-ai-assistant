// components/sections/TimelineSection.tsx
import SectionHeader from '@/components/ui/SectionHeader';

const ENTRIES = [
  {
    year: '2020 – Now', active: true,
    role: 'Software Developer III', company: 'Walmart Global Tech India · Remote',
    note: 'Leading frontend development for mobile and web-based enterprise analytics platforms using React, React Native, JavaScript, and TypeScript, with integrated AI-based data analytics capabilities for intelligent insights and enhanced user experiences.',
    badge: 'Current',
  },
  {
    year: '2019 – 2020', active: false,
    role: 'Frontend Engineer', company: 'Gogo Inc.',
    note: 'Developed a unified UI platform for multi-airline IFE systems using a single reusable layout.',
  },
  {
    year: '2013 – 2019', active: false,
    role: 'Senior Systems Engineer', company: 'IBM India Pvt. Ltd.',
    note: 'Delivered automation and analytics platforms reducing manual validation effort by 40%. Mentored 2 junior engineers.',
  }
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="px-12 py-20 border-t-half border-[var(--border)] max-md:px-6 max-md:py-14">
      <SectionHeader eyebrow="CAREER" title="The journey." subtitle="Six years of building things that scale." />

      <div className="grid grid-cols-[140px_1fr] gap-0 max-md:grid-cols-[120px_1fr] max-sm:grid-cols-1">
        {/* Year column */}
        <div className="flex flex-col max-sm:flex-row max-sm:overflow-x-auto max-sm:border-b-half max-sm:border-[var(--border)]">
          {ENTRIES.map(e => (
            <div key={e.year}
              className={`font-mono text-[12px] py-[22px] border-b-half border-[var(--border)] cursor-pointer tracking-[0.5px] transition-colors max-sm:px-3.5 max-sm:py-2.5 max-sm:border-b-0 max-sm:border-r-half max-sm:whitespace-nowrap max-sm:text-[11px] ${e.active ? 'text-accent2' : 'text-[var(--muted)]'}`}>
              {e.year}
            </div>
          ))}
        </div>

        {/* Entries */}
        <div className="border-l-half border-[var(--border2)] pl-10 max-sm:pl-5 max-sm:mt-4">
          {ENTRIES.map(e => (
            <div key={e.year}
              className={`py-[22px] border-b-half border-[var(--border)] relative last:border-none
                before:content-[''] before:absolute before:left-[-44px] before:top-[30px] before:w-2 before:h-2 before:rounded-full
                max-sm:before:left-[-21px]
                ${e.active ? 'before:bg-accent' : 'before:bg-[var(--muted)]'}`}>
              <div className="text-[17px] font-normal text-white mb-0.5">{e.role}</div>
              <div className="text-[16px] text-[var(--sub)] font-light mb-2">{e.company}</div>
              <div className="text-[14px] text-[var(--muted)] leading-[1.7] font-light">{e.note}</div>
              {e.badge && (
                <span className="inline-block text-[11px] text-green border-half border-[rgba(94, 234, 143, 0.3)] px-2 py-[2px] rounded-[4px] mt-1.5">
                  {e.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
