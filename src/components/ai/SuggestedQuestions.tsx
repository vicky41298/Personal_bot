import { motion } from 'framer-motion'

interface SuggestedQuestionsProps {
  questions: string[]
  onSelect: (q: string) => void
  disabled?: boolean
}

export function SuggestedQuestions({
  questions,
  onSelect,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q, i) => (
        <motion.button
          key={q}
          type="button"
          disabled={disabled}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(q)}
          className="rounded-full border border-border bg-transparent px-3.5 py-1.5 text-[13px] text-text-muted transition hover:border-border-strong hover:text-text disabled:opacity-50"
        >
          {q}
        </motion.button>
      ))}
    </div>
  )
}
