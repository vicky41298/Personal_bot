import type { Profile } from '@/types'
import { FadeIn } from '@/components/FadeIn'

interface AboutProps {
  profile: Profile
}

export function About({ profile }: AboutProps) {
  const { about } = profile

  return (
    <section id="about" className="section">
      <div className="container-site">
        <FadeIn>
          <p className="caption mb-4">{about.heading}</p>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="panel grid gap-12 p-10 md:grid-cols-2 md:gap-20 md:p-14">
            <p className="text-[18px] leading-relaxed text-text-muted md:text-[20px]">
              {about.summary}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[32px] font-semibold tracking-tight text-text md:text-[40px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[13px] text-text-subtle">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
