// components/chat/ChatMessage.tsx
import BotIcon from '@/components/ui/BotIcon';
import TypingDots from '@/components/ui/TypingDots';
import { Message } from './useChat';

interface ChatMessageProps {
  msg: Message;
  isTyping?: boolean; // show dots instead of content
}

export default function ChatMessage({ msg, isTyping }: ChatMessageProps) {
  const isUser = msg.role === 'user';

  return (
    <div className={`flex gap-1.5 items-end ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      {isUser ? (
        <div className="w-[18px] h-[18px] rounded-[5px] flex-shrink-0 bg-white/[0.07]" />
      ) : (
        <div className="w-[18px] h-[18px] rounded-[5px] flex-shrink-0 flex items-center justify-center bg-[rgba(244, 194, 77,0.2)]">
          <BotIcon size={10} />
        </div>
      )}

      {/* Bubble */}
      {isTyping ? (
        <TypingDots />
      ) : (
        <div className={`
          text-[12.5px] leading-[1.6] px-[11px] py-[8px] rounded-[9px] max-w-[87%] border-half
          ${isUser
            ? 'bg-[rgba(124,110,245,0.17)] border-[rgba(124,110,245,0.3)] text-accent2'
            : 'bg-[var(--surface2)] border-[var(--border)] text-[var(--sub)]'}
        `}>
          {msg.content}
        </div>
      )}
    </div>
  );
}
