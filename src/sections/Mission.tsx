import { motion } from 'framer-motion'
import type { Profile } from '@/types'
import { FadeIn } from '@/components/FadeIn'
import { cn } from '@/lib/utils'

interface MissionProps {
  profile: Profile
}

export function Mission({ profile }: MissionProps) {
  const { mission } = profile

  return (
    <section id="work" className="section">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <p className="caption mb-4">{mission.heading}</p>
          <h2 className="whitespace-pre-line text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text">
            {mission.title}
          </h2>
          <p className="mt-6 max-w-md text-[18px] leading-relaxed text-text-muted md:text-[20px]">
            {mission.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="panel p-8 md:p-10">
            <ol className="space-y-0">
              {mission.pipeline.map((step, i) => (
                <li key={step.id} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-[13px] text-text-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2.5 text-[18px] font-medium tracking-tight text-text md:text-[20px]">
                      <span>{step.label}</span>
                      {step.status && (
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border uppercase tracking-wider",
                          step.status.toLowerCase().includes('completed')
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse"
                        )}>
                          {step.status}
                        </span>
                      )}
                    </span>
                  </div>

                  {i < mission.pipeline.length - 1 && (
                    <div className="ml-5 flex h-10 items-center">
                      <motion.div
                        className="h-full w-px origin-top bg-gradient-to-b from-accent/50 to-violet/40"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: 0.15 + i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
