// components/fab/FloatingChatPanel.tsx
'use client';

import BotIcon from '@/components/ui/BotIcon';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/components/chat/useChat';

const QUICK_QS = [
  'What tech stack do you use?',
  'What roles are you open to?',
  'How quickly can you join?',
];

interface FloatingChatPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function FloatingChatPanel({ open, onClose }: FloatingChatPanelProps) {
  const { messages, input, setInput, isLoading, sendMessage, sendOnEnter, bottomRef } =
    useChat("Hi — still here! Ask me anything about experience, stack, or availability.");

  return (
    <div className={`
      fixed right-[82px] top-1/2 -translate-y-1/2 w-[300px]
      bg-[var(--surface)] border-half border-[rgba(244, 194, 77,0.3)] rounded-[16px]
      z-[9998] shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden
      transition-all duration-300
      max-sm:right-16 max-sm:w-[260px]
      ${open ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b-half border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-[9px] bg-[rgba(244, 194, 77,0.2)] border-half border-[rgba(244, 194, 77,0.35)] flex items-center justify-center flex-shrink-0">
            <BotIcon size={14} />
          </div>
          <div>
            <div className="text-[13px] font-medium text-white">AI Assistant</div>
            <div className="text-[10px] text-green font-mono mt-px">● Online</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-[6px] bg-white/5 flex items-center justify-center text-[12px] text-[var(--muted)] hover:bg-white/10 transition-colors"
        >✕</button>
      </div>

      {/* Messages */}
      <div className="px-3.5 py-3.5 flex flex-col gap-2.5 min-h-[160px] max-h-[220px] overflow-y-auto">
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1;
          const isTyping = isLast && msg.role === 'assistant' && msg.content === '' && isLoading;
          return <ChatMessage key={i} msg={msg} isTyping={isTyping} />;
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div className="px-3.5 pb-2.5 pt-2.5 border-t-half border-[var(--border)]">
        <p className="font-mono text-[9px] text-[var(--muted)] tracking-[1.5px] uppercase mb-1.5">Quick questions</p>
        {QUICK_QS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="w-full flex justify-between py-[5px] border-b-half border-[var(--border)] last:border-none text-[11px] text-accent2 underline underline-offset-[3px] decoration-[rgba(168,154,247,0.3)] hover:opacity-75 transition-opacity text-left"
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
