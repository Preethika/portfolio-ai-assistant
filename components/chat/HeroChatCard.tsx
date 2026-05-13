// components/chat/HeroChatCard.tsx
'use client';

import { useRef } from 'react';
import BotIcon from '@/components/ui/BotIcon';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from './useChat';

const QUICK_QS = [
  'What tech stack do you use?',
  'What roles are you open to?',
  'Most impactful project?',
  'How quickly can you join?',
];

export default function HeroChatCard() {
  const { messages, input, setInput, isLoading, sendMessage, sendOnEnter, bottomRef } =
    useChat("Hi — I'm trained on this portfolio. Ask me about tech stack, projects, or availability.");

  return (
    <div className="bg-[var(--surface)] border-half border-[var(--border2)] rounded-[14px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b-half border-[var(--border)]">
        <div className="w-10 h-10 rounded-[9px] bg-[rgba(244, 194, 77,0.18)] border-half border-[rgba(244, 194, 77,0.35)] flex items-center justify-center flex-shrink-0">
          <BotIcon size={18} />
        </div>
        <div>
          <div className="text-[15px] font-medium text-white">AI Assistant</div>
          <div className="text-[11px] text-green font-mono mt-0.5">● Online · Ask me anything</div>
        </div>
      </div>

      {/* Messages */}
      <div className="px-5 py-4 flex flex-col gap-2.5 max-h-[210px] overflow-y-auto">
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1;
          const isTyping = isLast && msg.role === 'assistant' && msg.content === '' && isLoading;
          return <ChatMessage key={i} msg={msg} isTyping={isTyping} />;
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div className="px-5 pb-3 pt-3 border-t-half border-[var(--border)]">
        <p className="font-mono text-[10px] text-[var(--muted)] tracking-[1.5px] mb-2 uppercase">Frequently asked</p>
        {QUICK_QS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="w-full flex justify-between items-center py-[6px] border-b-half border-[var(--border)] last:border-none text-[12.5px] text-accent2 underline underline-offset-[3px] decoration-[rgba(168,154,247,0.3)] hover:opacity-75 transition-opacity text-left"
          >
            <span>{q}</span>
            <span className="text-[9px] text-[var(--muted)] ml-2 flex-shrink-0">↗</span>
          </button>
        ))}
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input)}
        onKeyDown={sendOnEnter}
        disabled={isLoading}
        compact
      />
    </div>
  );
}
