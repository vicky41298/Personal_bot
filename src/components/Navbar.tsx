import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Profile } from '@/types'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn, scrollToId } from '@/lib/utils'

interface NavbarProps {
  profile: Profile
}

export function Navbar({ profile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const ids = ['about', 'work', 'projects', 'focus', 'vision']
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="container-site px-6 md:px-10 lg:px-16">
        <div
          className={cn(
            'flex items-center justify-between gap-3 rounded-full border border-border px-4 py-2 transition-all duration-300 md:px-5',
            scrolled
              ? 'bg-bg/70 shadow-[var(--shadow-nav)] backdrop-blur-xl'
              : 'bg-bg/40 backdrop-blur-md',
          )}
        >
          <button
            type="button"
            onClick={() => scrollToId('hero')}
            className="text-[15px] font-semibold tracking-tight text-text"
          >
            {profile.name}
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {profile.nav.map((item) => {
              if (item.route || item.primary) {
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="ml-2 rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-accent-bright hover:-translate-y-px"
                  >
                    {item.label}
                  </Link>
                )
              }

              const id = item.href.replace('#', '')
              const isActive = active === id

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToId(id)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-[13px] transition-colors',
                    isActive ? 'text-text' : 'text-text-muted hover:text-text',
                  )}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <Link
            to="/"
            className="rounded-full bg-accent px-3.5 py-1.5 text-[13px] font-medium text-white transition hover:bg-accent-bright lg:hidden"
          >
            Open AI Chat
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
