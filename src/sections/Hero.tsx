import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Profile } from '@/types'
import { Button } from '@/components/Button'
import { NeuralOrb } from '@/components/NeuralOrb'
import { scrollToId } from '@/lib/utils'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const { hero } = profile
  const navigate = useNavigate()

  return (
    <section id="hero" className="section relative min-h-screen pt-28 md:pt-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="caption mb-8"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.75rem,8vw,90px)] font-bold leading-[0.95] tracking-[-0.04em] text-text"
          >
            {profile.fullName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 max-w-md whitespace-pre-line text-[18px] leading-relaxed text-text-muted md:text-[20px]"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="my-8 h-px w-16 bg-border-strong"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.5 }}
          >
            <p className="text-[18px] text-text md:text-[20px]">
              {hero.lines.map((line, idx) => {
                const parts = line.split(hero.highlight)
                if (parts.length > 1) {
                  return (
                    <span key={idx}>
                      {parts[0]}
                      <span className="text-gradient-value">{hero.highlight}</span>
                      {parts[1]}
                      {idx < hero.lines.length - 1 ? ' ' : ''}
                    </span>
                  )
                }
                return (
                  <span key={idx}>
                    {line}
                    {idx < hero.lines.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
              {profile.role}
              <br />
              {profile.specialty}
              <br />
              {profile.company}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button onClick={() => scrollToId('about')}>{hero.ctas.explore}</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              {hero.ctas.askAi}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          <NeuralOrb />
        </motion.div>
      </div>
    </section>
  )
}
