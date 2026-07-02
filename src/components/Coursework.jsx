import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CARDS = [
  {
    title: 'Mathematics',
    topics: ['Probability', 'Statistics', 'Numerical Methods', 'Optimization'],
    icon: '∑',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.18)',
    border: 'rgba(167,139,250,0.25)',
    gradient: 'linear-gradient(135deg, rgba(76,29,149,0.25) 0%, rgba(109,40,217,0.08) 100%)',
  },
  {
    title: 'Computer Science',
    topics: ['Data Structures', 'Systems', 'Algorithms', 'Software Design'],
    icon: '</>',
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.18)',
    border: 'rgba(96,165,250,0.25)',
    gradient: 'linear-gradient(135deg, rgba(30,58,138,0.25) 0%, rgba(37,99,235,0.08) 100%)',
  },
  {
    title: 'Markets',
    topics: ['Trading Strategies', 'Risk', 'Derivatives', 'Market Structure'],
    icon: '◈',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.18)',
    border: 'rgba(52,211,153,0.25)',
    gradient: 'linear-gradient(135deg, rgba(6,78,59,0.25) 0%, rgba(5,150,105,0.08) 100%)',
  },
  {
    title: 'Research',
    topics: ['Backtesting', 'Simulation', 'Signal Testing', 'Execution Analytics'],
    icon: '⌬',
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.18)',
    border: 'rgba(251,191,36,0.25)',
    gradient: 'linear-gradient(135deg, rgba(120,53,15,0.25) 0%, rgba(180,83,9,0.08) 100%)',
  },
  {
    title: 'Economics',
    topics: ['Microeconomics', 'Macroeconomics', 'Market Analysis', 'Price Theory'],
    icon: '$',
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.18)',
    border: 'rgba(249,115,22,0.25)',
    gradient: 'linear-gradient(135deg, rgba(124,45,18,0.25) 0%, rgba(194,65,12,0.08) 100%)',
  },
]

function AcademicCard({ card, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
      className="group relative rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: card.gradient,
        border: `1px solid ${card.border}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4)`,
        backdropFilter: 'blur(12px)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 16px 48px ${card.glow}, 0 0 0 1px ${card.accent}40`,
        transition: { duration: 0.2 },
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-lg font-bold flex-shrink-0"
        style={{
          background: `${card.glow}`,
          border: `1px solid ${card.border}`,
          color: card.accent,
          boxShadow: `0 0 16px ${card.glow}`,
        }}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.2,
        }}
      >
        {card.title}
      </h3>

      {/* Topics */}
      <div className="flex flex-wrap gap-2">
        {card.topics.map(t => (
          <span
            key={t}
            className="font-mono text-xs px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${card.accent}30`,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, ${card.accent}60, transparent)`,
          transition: 'opacity 0.3s ease',
        }}
      />
    </motion.div>
  )
}

export default function Coursework() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(109,40,217,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 300, background: 'radial-gradient(ellipse, rgba(5,150,105,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(167,139,250,0.55)' }}>
            ✦ &nbsp; Penn State University &nbsp; ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 0 60px rgba(167,139,250,0.2)',
            }}
          >
            Academic Edge
          </h2>
          <p
            className="mt-4 font-sans text-sm max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}
          >
            The foundation behind my quantitative research, systems work, and market-focused projects.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CARDS.map((card, i) => (
            <AcademicCard key={card.title} card={card} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center font-mono text-xs"
          style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}
        >
          B.S. Computer Science + Mathematics · Class of 2028
        </motion.p>

      </div>
    </section>
  )
}
