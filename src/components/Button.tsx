import { motion } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  children,
  className,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-[10px] px-6 text-[15px] font-medium tracking-tight transition-colors duration-200 disabled:opacity-50',
        variant === 'primary' &&
          'bg-accent text-white hover:bg-accent-bright',
        variant === 'secondary' &&
          'border border-border bg-transparent text-text hover:border-border-strong hover:bg-surface',
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
