// components/chat/AISectionChat.tsx
'use client';

import BotIcon from '@/components/ui/BotIcon';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from './useChat';

const FAQS = [
  'What tech stack do you work with?',
  'Tell me about your most impactful project.',
  'What kind of roles are you open to?',
  'How quickly can you join a new team?',
  'Do you have experience leading teams?',
  'Can you share references?',
];

export default function AISectionChat() {
  const { messages, input, setInput, isLoading, sendMessage, sendOnEnter, bottomRef } =
    useChat("Hi — I'm trained on this portfolio. Click a question on the left or ask me anything.");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-start">

      {/* FAQ list — clicking sends directly to chat, no page navigation */}
      <div>
        <p className="font-mono text-[11px] text-[var(--muted)] tracking-[1.5px] uppercase mb-5">Frequently asked</p>
        {FAQS.map((q) => (
          <button
            key={q}
            onClick={e => { e.preventDefault(); sendMessage(q); }}
            className="w-full flex justify-between items-center py-[14px] border-b-half border-[var(--border)] first:border-t-half first:border-t-[var(--border)] text-[16px] text-accent2 font-light underline underline-offset-[4px] decoration-[rgba(231, 234, 68, 0.28)] hover:opacity-75 transition-opacity text-left"
          >
            <span>{q}</span>
            <span className="text-[12px] text-[var(--muted)] ml-3 flex-shrink-0">↗</span>
          </button>
        ))}
      </div>

      {/* Chat panel */}
      <div className="bg-[var(--surface)] border-half border-[var(--border2)] rounded-[14px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-[18px] py-3.5 border-b-half border-[var(--border)]">
          <div className="w-8 h-8 rounded-[9px] bg-[rgba(244, 194, 77,0.18)] border-half border-[rgba(244, 194, 77,0.35)] flex items-center justify-center flex-shrink-0">
            <BotIcon size={14} />
          </div>
          <div>
            <div className="text-[14px] font-medium text-white">AI Assistant</div>
            <div className="text-[11px] text-green font-mono mt-0.5">● Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-[18px] flex flex-col gap-2.5 min-h-[200px] max-h-[280px] overflow-y-auto">
          {messages.map((msg, i) => {
            const isLast = i === messages.length - 1;
            const isTyping = isLast && msg.role === 'assistant' && msg.content === '' && isLoading;
            return <ChatMessage key={i} msg={msg} isTyping={isTyping} />;
          })}
          <div ref={bottomRef} />
        </div>

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => sendMessage(input)}
          onKeyDown={sendOnEnter}
          disabled={isLoading}
          placeholder="Type your question…"
        />
      </div>
    </div>
  );
}
