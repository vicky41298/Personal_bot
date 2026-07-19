import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/** Ambient field: one blue glow, one purple glow, soft stars, subtle particles. */
export function AmbientBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []
    let stars: { x: number; y: number; r: number; a: number }[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight) * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${Math.max(window.innerHeight, document.documentElement.scrollHeight)}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const w = window.innerWidth
      const h = Math.max(window.innerHeight, document.documentElement.scrollHeight)

      const count = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 42000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.9,
        a: 0.1 + Math.random() * 0.22,
      }))

      particles = Array.from({ length: 16 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        r: 0.4 + Math.random() * 0.9,
        a: 0.08 + Math.random() * 0.12,
      }))
    }

    const draw = () => {
      const w = window.innerWidth
      const h = Math.max(window.innerHeight, document.documentElement.scrollHeight)
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.a})`
        ctx.fill()
      }

      if (!reduce) {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(122,162,255,${p.a})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute -top-32 left-1/2 h-[480px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,141,239,0.16),transparent_70%)] blur-2xl" />
      <div className="absolute top-[42%] -right-24 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,124,246,0.1),transparent_70%)] blur-2xl" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" aria-hidden />
      <div className="noise absolute inset-0 opacity-25 mix-blend-overlay" aria-hidden />
    </div>
  )
}
