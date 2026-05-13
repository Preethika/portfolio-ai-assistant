// components/sections/HeroSection.tsx
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden px-12 py-20 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-10 items-center max-md:px-6 max-md:py-14"
    >
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
      {/* Glow */}
      <div className="absolute top-[-80px] right-[320px] w-[480px] h-[360px] bg-[radial-gradient(ellipse,rgba(124,110,245,0.07)_0%,transparent_68%)] pointer-events-none" />

      <HeroLeft />
      <HeroRight />
    </section>
  );
}
