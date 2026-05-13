// app/page.tsx — thin orchestrator, each section is its own component
import Navbar             from '@/components/sections/Navbar';
import HeroSection        from '@/components/sections/HeroSection';
import ProjectsSection    from '@/components/sections/ProjectsSection';
import TimelineSection    from '@/components/sections/TimelineSection';
import AIAssistantSection from '@/components/sections/AIAssistantSection';
import ContactSection     from '@/components/sections/ContactSection';
import Footer             from '@/components/sections/Footer';
import FloatingChatFab    from '@/components/fab/FloatingChatFab';

export default function Home() {
  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <TimelineSection />
      <AIAssistantSection />
      <ContactSection />
      <Footer />
      <FloatingChatFab />
    </div>
  );
}
