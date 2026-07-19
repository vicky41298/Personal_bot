import { Bot, Building2, Layers, Network, Sparkles, Zap, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Profile } from '@/types'
import { FadeIn } from '@/components/FadeIn'

const icons: Record<string, LucideIcon> = {
  bot: Bot,
  building: Building2,
  layers: Layers,
  network: Network,
  zap: Zap,
  sparkles: Sparkles,
}

interface ExcitesProps {
  profile: Profile
}

export function Excites({ profile }: ExcitesProps) {
  const { excites } = profile

  return (
    <section id="focus" className="section">
      <div className="container-site">
        <FadeIn className="mb-14 max-w-xl">
          <p className="caption mb-4">{excites.heading}</p>
          <p className="text-[18px] text-text-muted md:text-[20px]">{excites.subheading}</p>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {excites.topics.map((topic, i) => {
            const Icon = icons[topic.icon] ?? Sparkles
            return (
              <FadeIn key={topic.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="panel h-full p-8"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-text-subtle"
                    aria-hidden
                  />
                  <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-text">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
                    {topic.description}
                  </p>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
