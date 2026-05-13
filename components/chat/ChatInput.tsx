// components/chat/ChatInput.tsx
'use client';

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  compact?: boolean;
}

export default function ChatInput({
  value, onChange, onSend, onKeyDown, disabled, placeholder = 'Type your question…', compact,
}: ChatInputProps) {
  const padCls  = compact ? 'px-3.5 py-2.5' : 'px-4 py-3';
  const btnSize = compact ? 'w-7 h-7 text-[11px]' : 'w-7 h-7 text-[12px]';

  return (
    <div className={`flex gap-2 items-center ${padCls} border-t-half border-[var(--border)]`}>
      <input
        className={`flex-1 bg-transparent border-none outline-none text-[var(--sub)] placeholder:text-[var(--muted)] ${compact ? 'text-[12px]' : 'text-[13px]'}`}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className={`${btnSize} bg-accent rounded-[6px] flex items-center justify-center text-white flex-shrink-0 transition-opacity ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
      >
        →
      </button>
    </div>
  );
}
