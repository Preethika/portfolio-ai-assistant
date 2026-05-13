// components/sections/AIAssistantSection.tsx
import SectionHeader from '@/components/ui/SectionHeader';
import AISectionChat from '@/components/chat/AISectionChat';

export default function AIAssistantSection() {
  return (
    <section id="ai-assistant" className="px-12 py-20 border-t-half border-[var(--border)] max-md:px-6 max-md:py-14">
      <SectionHeader
        eyebrow="AI ASSISTANT"
        title="Ask me anything."
        subtitle="Powered by Gemini + pgvector RAG. Click a question or type your own."
      />
      <AISectionChat />
    </section>
  );
}
