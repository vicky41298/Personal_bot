import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import profileData from '@/data/profile.json'
import type { Profile } from '@/types'
import { AmbientBackground } from '@/components/AmbientBackground'
import { ChatInterface } from '@/components/ai/ChatInterface'
import { useChat } from '@/hooks/useChat'

const profile = profileData as Profile

export function HomePage() {
  const { ai } = profile
  const { messages, isTyping, send } = useChat()
  const hasAssistantReply = messages.some(
    (m) => m.role === 'assistant' && m.content.length > 0,
  )

  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-text">
      <AmbientBackground />

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12 md:px-8 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center md:mb-12"
        >
          <h1 className="text-[clamp(2.5rem,6vw,3.75rem)] font-semibold tracking-[-0.04em] text-text">
            {ai.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-xl whitespace-pre-line text-[17px] leading-relaxed text-text-muted md:text-[19px]">
            {ai.subtitle}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="panel-soft flex min-h-[min(62vh,560px)] flex-1 flex-col p-5 md:p-7"
        >
          <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-[15px] font-medium text-text">Vignesh AI</p>
              <p className="text-[13px] text-text-subtle">
                {isTyping ? 'Typing…' : 'Online'}
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" aria-hidden />
          </div>

          <ChatInterface
            messages={messages}
            isTyping={isTyping}
            suggestedQuestions={ai.suggestedQuestions}
            placeholder={ai.placeholder}
            onSend={send}
            suggestionsPlacement="bottom"
          />
        </motion.div>

        {hasAssistantReply && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 border-t border-border pt-8 text-center"
          >
            <p className="text-[14px] text-text-subtle">{ai.exploreLabel}</p>
            <Link
              to="/profile"
              className="mt-3 inline-flex text-[16px] font-medium text-accent-bright transition hover:text-accent"
            >
              {ai.exploreCta}
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}
