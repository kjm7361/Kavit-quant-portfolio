import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    title: 'Quant Research Terminal',
    subtitle: 'Full-stack 21-page trading platform',
    desc: 'End-to-end quantitative research platform built with Streamlit. Includes multi-strategy backtesting, live market microstructure simulation, options pricing (Black-Scholes + Heston), Monte Carlo risk engine, pairs trading, portfolio optimization, and market regime detection.',
    tags: ['Python', 'Streamlit', 'Plotly', 'Yahoo Finance', 'Pandas', 'NumPy'],
    icon: '📈',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 35%, #047857 60%, #059669 100%)',
    glow: 'rgba(5,150,105,0.4)',
    accent: '#34d399',
    github: 'https://github.com/kjm7361',
    featured: true,
    stat: { label: 'Sharpe Ratio', value: '1.84' },
  },
  {
    title: 'Statistical Arbitrage Engine',
    subtitle: 'Pairs trading with Kalman filter',
    desc: 'Cointegration-based pairs trading system with Kalman filter for dynamic hedge ratio estimation. Implemented Engle-Granger and Johansen tests for pair selection, with live spread monitoring.',
    tags: ['Python', 'statsmodels', 'Kalman Filter', 'Backtesting'],
    icon: '⚖',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #6d28d9 100%)',
    glow: 'rgba(109,40,217,0.45)',
    accent: '#a78bfa',
    github: 'https://github.com/kjm7361',
    stat: { label: 'Pairs Tested', value: '500+' },
  },
  {
    title: 'Options Greeks Dashboard',
    subtitle: 'Real-time Black-Scholes & Heston',
    desc: 'Real-time options analytics tool computing Black-Scholes and Heston model Greeks. Features implied volatility surface visualization, P&L scenario heat maps, and volatility smile fitting.',
    tags: ['Python', 'FastAPI', 'NumPy', 'SciPy', 'React'],
    icon: 'Δ',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)',
    glow: 'rgba(37,99,235,0.45)',
    accent: '#93c5fd',
    github: 'https://github.com/kjm7361',
    stat: { label: 'Latency', value: '< 120ms' },
  },
  {
    title: 'Market Regime Classifier',
    subtitle: 'HMM-based regime detection',
    desc: 'Hidden Markov Model-based regime detection system classifying market states (bull, bear, risk-off) from macro signals including VIX term structure, yield curve slope, and realized volatility.',
    tags: ['Python', 'hmmlearn', 'scikit-learn', 'yfinance'],
    icon: '📊',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #b45309 100%)',
    glow: 'rgba(180,83,9,0.45)',
    accent: '#fbbf24',
    github: 'https://github.com/kjm7361',
    stat: { label: 'Accuracy', value: '78%' },
  },
]

/* ── modal ───────────────────────────────────── */
function Modal({ p, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{ scale: 0.88,    opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', boxShadow: `0 40px 80px ${p.glow}` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className="relative h-40 flex flex-col items-center justify-center p-6" style={{ background: p.gradient }}>
          <div className="text-4xl mb-2 drop-shadow-lg">{p.icon}</div>
          <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>
            {p.title}
          </h3>
          <p className="text-white/60 text-sm mt-1">{p.subtitle}</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white text-xl transition-colors">✕</button>
        </div>

        <div className="p-6">
          {/* Stat */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: `${p.glow}`, border: `1px solid ${p.accent}40` }}>
            <span style={{ color: p.accent }} className="font-mono text-sm font-bold">{p.stat.value}</span>
            <span className="text-white/40 text-xs">{p.stat.label}</span>
          </div>

          <p className="text-white/65 text-sm font-sans leading-relaxed mb-5">{p.desc}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {p.tags.map(t => (
              <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full text-white/50"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {t}
              </span>
            ))}
          </div>

          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium text-black transition-all hover:scale-105"
            style={{ background: p.accent }}>
            View on GitHub →
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── project card ────────────────────────────── */
function Card({ p, index, onClick, featured }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative text-left rounded-3xl overflow-hidden w-full group"
      style={{
        minHeight: featured ? 340 : 280,
        background: p.gradient,
        boxShadow: hovered
          ? `0 30px 60px ${p.glow}, 0 0 0 1px ${p.accent}30`
          : `0 8px 30px ${p.glow}50`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Gloss overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 60%)',
      }} />

      {/* Hover shimmer */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)' }}
      />

      {/* Animated accent ring on icon */}
      <div className="absolute top-6 right-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: `1px solid rgba(255,255,255,0.25)`,
            boxShadow: hovered ? `0 0 20px ${p.accent}60` : 'none',
            transition: 'box-shadow 0.3s',
          }}
        >
          {p.icon}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Stat badge */}
        <div className="mb-3">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{ background: 'rgba(0,0,0,0.3)', color: p.accent, border: `1px solid ${p.accent}40` }}
          >
            {p.stat.value} {p.stat.label}
          </span>
        </div>

        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: featured ? '1.6rem' : '1.25rem',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}
        >
          {p.title}
        </h3>
        <p className="mt-1.5 text-white/60 text-sm font-sans">{p.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map(t => (
            <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full text-white/70"
              style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Arrow hint */}
        <motion.div
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
          className="mt-4 text-white/60 text-sm font-sans"
        >
          View details →
        </motion.div>
      </div>
    </motion.button>
  )
}

/* ── section ─────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      <section id="projects" className="relative overflow-hidden" style={{ background: '#050505' }}>
        {/* Scenic header */}
        <div
          ref={ref}
          className="relative px-8 pt-24 pb-16 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #0a0015 0%, #0d0025 40%, #050505 100%)',
          }}
        >
          {/* Stars */}
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="absolute rounded-full pointer-events-none" style={{
              width: 1, height: 1, background: '#fff',
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }} />
          ))}

          {/* Nebula glows behind title */}
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', top: '20%', left: '20%', width: 500, height: 300, background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div style={{ position: 'absolute', top: '30%', right: '15%', width: 400, height: 250, background: 'radial-gradient(ellipse, rgba(5,150,105,0.10) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto"
          >
            <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(160,120,255,0.6)' }}>
              ✦ &nbsp; Selected Work &nbsp; ✦
            </p>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textShadow: '0 0 80px rgba(139,92,246,0.3)',
              }}
            >
              My<br />Projects
            </h2>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="px-6 pb-20 max-w-5xl mx-auto">
          {/* Featured card — full width */}
          <div className="mb-5">
            <Card p={projects[0]} index={0} onClick={() => setActive(projects[0])} featured />
          </div>
          {/* 3-column row */}
          <div className="grid md:grid-cols-3 gap-5">
            {projects.slice(1).map((p, i) => (
              <Card key={p.title} p={p} index={i + 1} onClick={() => setActive(p)} />
            ))}
          </div>

          {/* GitHub link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <a
              href="https://github.com/kjm7361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/30 hover:text-white/70 transition-colors tracking-wider"
            >
              → More on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {active && <Modal p={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}
