import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import type { ChatMessage as ChatMessageType } from '@/types'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: ChatMessageType
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const isBlock = Boolean(className?.includes('language-')) || String(children).includes('\n')
    if (isBlock) {
      return (
        <pre className="my-3 overflow-x-auto rounded-[10px] border border-border bg-bg/60 p-3 text-[13px] leading-relaxed text-text">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      )
    }
    return (
      <code
        className="rounded-md bg-surface px-1.5 py-0.5 text-[13px] text-accent-bright"
        {...props}
      >
        {children}
      </code>
    )
  },
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const markdown = message.content || (message.isStreaming ? ' ' : '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[90%] rounded-[12px] px-4 py-3 text-[15px] leading-relaxed',
          isUser
            ? 'bg-accent text-white'
            : 'border border-border bg-surface text-text-muted',
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdown}
            </ReactMarkdown>
            {message.isStreaming && (
              <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-accent-bright align-middle" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
