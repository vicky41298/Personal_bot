import { motion } from 'framer-motion'
import type { Profile } from '@/types'
import { FadeIn } from '@/components/FadeIn'

interface ProjectsProps {
  profile: Profile
}

export function Projects({ profile }: ProjectsProps) {
  const { projects } = profile

  return (
    <section id="projects" className="section">
      <div className="container-site">
        <FadeIn className="mb-14 max-w-xl">
          <p className="caption mb-4">{projects.heading}</p>
          <p className="text-[18px] text-text-muted md:text-[20px]">
            {projects.subheading}
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.items.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="panel h-full p-8"
              >
                <h3 className="text-[22px] font-semibold tracking-tight text-text">
                  {project.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted md:text-[16px]">
                  {project.description}
                </p>
                {project.points && (
                  <ul className="mt-4 space-y-2 text-[13.5px] leading-relaxed text-text-subtle list-disc pl-4">
                    {project.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-[12px] text-text-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
