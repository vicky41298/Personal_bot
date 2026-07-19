import { ArrowUp, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { ChatMessage as ChatMessageType } from '@/types'
import { ChatMessage } from '@/components/ai/ChatMessage'
import { SuggestedQuestions } from '@/components/ai/SuggestedQuestions'

interface ChatInterfaceProps {
  messages: ChatMessageType[]
  isTyping: boolean
  suggestedQuestions: string[]
  placeholder: string
  onSend: (text: string) => void | Promise<void>
  suggestionsPlacement?: 'top' | 'bottom'
}

export function ChatInterface({
  messages,
  isTyping,
  suggestedQuestions,
  placeholder,
  onSend,
  suggestionsPlacement = 'bottom',
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return
    setInput('')
    await onSend(trimmed)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void handleSend(input)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend(input)
    }
  }

  const showSuggestions = messages.filter((m) => m.role === 'user').length === 0

  const suggestions = showSuggestions ? (
    <div className={suggestionsPlacement === 'bottom' ? 'mt-4' : 'mb-4'}>
      <SuggestedQuestions
        questions={suggestedQuestions}
        onSelect={(q) => void handleSend(q)}
        disabled={isTyping}
      />
    </div>
  ) : null

  return (
    <div className="flex h-full min-h-0 flex-col">
      {suggestionsPlacement === 'top' && suggestions}

      <div
        ref={listRef}
        className="chat-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-1 py-2"
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isTyping && messages[messages.length - 1]?.content === '' && (
          <div className="flex items-center gap-2 px-1 text-[13px] text-text-subtle">
            <Loader2 size={14} className="animate-spin text-accent-bright" />
            Thinking
            <span className="inline-flex gap-0.5">
              <span className="h-1 w-1 animate-pulse rounded-full bg-text-subtle" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-text-subtle [animation-delay:150ms]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-text-subtle [animation-delay:300ms]" />
            </span>
          </div>
        )}
      </div>

      {suggestionsPlacement === 'bottom' && suggestions}

      <form onSubmit={onSubmit} className="mt-5">
        <div className="flex items-end gap-2 rounded-[12px] border border-border bg-bg-elevated/80 p-2 backdrop-blur-sm transition focus-within:border-border-strong">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={isTyping}
            className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent px-3 py-3 text-[15px] text-text placeholder:text-text-subtle focus:outline-none disabled:opacity-60"
            aria-label="Message"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-accent text-white transition hover:-translate-y-px hover:bg-accent-bright disabled:opacity-40 disabled:hover:translate-y-0"
            aria-label="Send message"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  )
}
