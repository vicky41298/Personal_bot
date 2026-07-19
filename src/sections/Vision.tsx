import type { Profile } from '@/types'
import { FadeIn } from '@/components/FadeIn'

interface VisionProps {
  profile: Profile
}

export function Vision({ profile }: VisionProps) {
  const { vision } = profile

  return (
    <section id="vision" className="section">
      <div className="container-site">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="caption mb-6">{vision.heading}</p>
          <p className="text-[22px] leading-relaxed tracking-tight text-text md:text-[28px] md:leading-snug">
            {vision.content}
          </p>
          <p className="mt-8 text-[16px] text-text-muted md:text-[18px]">
            {vision.emphasis}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
