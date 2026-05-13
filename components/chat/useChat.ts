// components/chat/useChat.ts
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useChat(initialMessage: string) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll if the element exists and its parent container can scroll
    if (bottomRef.current?.parentElement) {
      bottomRef.current.parentElement.scrollTop = bottomRef.current.parentElement.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    const history: Message[] = [...messages, userMsg];

    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error('Stream failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value, { stream: true }).split('\n').filter(Boolean);
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              full += JSON.parse(line.slice(2));
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: full };
                return updated;
              });
            } catch { /* skip malformed chunk */ }
          }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "That's best discussed in a call — feel free to use the contact form.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [messages, isLoading]);

  const sendOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return { messages, input, setInput, isLoading, sendMessage, sendOnEnter, bottomRef };
}
