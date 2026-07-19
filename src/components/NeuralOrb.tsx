import { motion, useReducedMotion } from 'framer-motion'

/** OpenAI-style orbital neural visualization — slow, calm motion. */
export function NeuralOrb() {
  const reduce = useReducedMotion()

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(122,162,255,0.35),rgba(139,124,246,0.12)_45%,transparent_70%)]" />
      <div className="absolute inset-[28%] rounded-full border border-white/[0.06] bg-white/[0.02]" />

      <svg viewBox="0 0 400 400" className="relative h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7aa2ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8b7cf6" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="core" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        <motion.g
          className="orb-origin"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="148"
            ry="72"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="1"
            opacity="0.7"
          />
        </motion.g>

        <motion.g
          className="orb-origin"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="118"
            ry="160"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            transform="rotate(40 200 200)"
          />
        </motion.g>

        <motion.g
          className="orb-origin"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="168"
            ry="98"
            fill="none"
            stroke="rgba(139,124,246,0.28)"
            strokeWidth="1"
            transform="rotate(-25 200 200)"
          />
        </motion.g>

        {/* Nodes */}
        {[
          [200, 52],
          [320, 140],
          [300, 280],
          [120, 300],
          [80, 150],
          [200, 200],
          [250, 100],
          [150, 240],
        ].map(([x, y], i) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={i === 5 ? 7 : 3.5}
            fill={i === 5 ? 'url(#core)' : 'rgba(196,210,255,0.85)'}
            animate={
              reduce
                ? undefined
                : {
                    opacity: [0.45, 1, 0.45],
                  }
            }
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        ))}

        {/* Soft links */}
        <g stroke="rgba(122,162,255,0.18)" strokeWidth="1">
          <line x1="200" y1="52" x2="200" y2="200" />
          <line x1="320" y1="140" x2="200" y2="200" />
          <line x1="300" y1="280" x2="200" y2="200" />
          <line x1="120" y1="300" x2="200" y2="200" />
          <line x1="80" y1="150" x2="200" y2="200" />
          <line x1="250" y1="100" x2="200" y2="200" />
          <line x1="150" y1="240" x2="200" y2="200" />
        </g>
      </svg>
    </div>
  )
}
