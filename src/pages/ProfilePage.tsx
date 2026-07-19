import profileData from '@/data/profile.json'
import type { Profile } from '@/types'
import { AmbientBackground } from '@/components/AmbientBackground'
import { Navbar } from '@/components/Navbar'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Excites } from '@/sections/Excites'
import { Hero } from '@/sections/Hero'
import { Mission } from '@/sections/Mission'
import { Projects } from '@/sections/Projects'
import { Vision } from '@/sections/Vision'

const profile = profileData as Profile

export function ProfilePage() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <AmbientBackground />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Mission profile={profile} />
        <Projects profile={profile} />
        <Excites profile={profile} />
        <Vision profile={profile} />
      </main>
      <Contact profile={profile} />
    </div>
  )
}
