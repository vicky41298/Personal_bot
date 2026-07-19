import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChatMessage } from '@/types'
import { askAssistant, getGreeting } from '@/services/aiService'

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'greeting',
      role: 'assistant',
      content: getGreeting(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const userMsg: ChatMessage = { id: uid(), role: 'user', content: trimmed }
    const assistantId = uid()

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: 'assistant', content: '', isStreaming: true },
    ])
    setIsTyping(true)

    try {
      await askAssistant(trimmed, {
        signal: controller.signal,
        onToken: (token) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + token, isStreaming: true }
                : m,
            ),
          )
        },
      })

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, isStreaming: false } : m,
        ),
      )
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: 'Something went wrong. Please try again.',
                isStreaming: false,
              }
            : m,
        ),
      )
    } finally {
      setIsTyping(false)
    }
  }, [])

  return { messages, isTyping, send }
}
