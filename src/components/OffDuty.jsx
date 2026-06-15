import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const hobbies = [
  {
    icon: '🕴️',
    label: '007 · Bond',
    desc: 'Shaken, not stirred. Every film, every villain, every one-liner — watched and ranked.',
    detail: 'From Dr. No to No Time to Die. Craig era loyalist, but Connery gets eternal respect.',
    accent: '#d4af37',
    glow: 'rgba(212,175,55,0.35)',
    bg: 'linear-gradient(135deg, #0a0800 0%, #1a1400 50%, #0d0a00 100%)',
    border: 'rgba(212,175,55,0.2)',
  },
  {
    icon: '💥',
    label: 'Hollywood Action',
    desc: 'Fast cars, impossible odds, and physics-defying set pieces. The bigger, the better.',
    detail: 'Mission Impossible, John Wick, Top Gun — if it has a ridiculous stunt, it\'s on the watchlist.',
    accent: '#ef4444',
    glow: 'rgba(239,68,68,0.35)',
    bg: 'linear-gradient(135deg, #0a0000 0%, #1a0000 50%, #0d0000 100%)',
    border: 'rgba(239,68,68,0.2)',
  },
  {
    icon: '♠️',
    label: 'Poker',
    desc: 'Probability, patience, and reading people — the most quantitative game at the table.',
    detail: 'No-limit Texas Hold\'em. Pot odds and expected value are just math with better stakes.',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    bg: 'linear-gradient(135deg, #05001a 0%, #0d0030 50%, #05001a 100%)',
    border: 'rgba(167,139,250,0.2)',
  },
]

function HobbyCard({ h, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative rounded-3xl overflow-hidden cursor-default flex flex-col"
      style={{
        background: h.bg,
        border: `1px solid ${h.border}`,
        boxShadow: `0 8px 40px ${h.glow}`,
        minHeight: 280,
      }}
    >
      {/* Gloss */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />

      {/* Animated glow pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        animate={{ boxShadow: [`0 0 0px ${h.glow}`, `0 0 40px ${h.glow}`, `0 0 0px ${h.glow}`] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: index * 1.1 }}
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Icon */}
        <div className="text-5xl mb-5 drop-shadow-lg">{h.icon}</div>

        {/* Label */}
        <h3
          className="mb-2"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: h.accent,
            lineHeight: 1.1,
          }}
        >
          {h.label}
        </h3>

        {/* Divider */}
        <div className="mb-4" style={{ width: 40, height: 1, background: h.accent, opacity: 0.5 }} />

        {/* Desc */}
        <p className="text-white/60 text-sm font-sans leading-relaxed mb-3">{h.desc}</p>
        <p className="text-white/35 text-xs font-sans leading-relaxed italic mt-auto">{h.detail}</p>
      </div>
    </motion.div>
  )
}

export default function OffDuty() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #050505 0%, #080410 50%, #050505 100%)' }}
    >
      {/* Film grain noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position:'absolute', top:'20%', left:'10%', width:400, height:300, background:'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'20%', right:'10%', width:400, height:300, background:'radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)', filter:'blur(60px)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        {/* Heading */}
        <div ref={ref} className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'rgba(212,175,55,0.6)' }}
          >
            ✦ &nbsp; Off the Clock &nbsp; ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            When I'm<br />
            <span style={{ color: 'rgba(212,175,55,0.95)' }}>Not Working</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-5 text-white/35 text-sm font-sans max-w-md leading-relaxed"
          >
            Quant by day. Bond fan, action junkie, and poker player by night.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {hobbies.map((h, i) => (
            <HobbyCard key={h.label} h={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
