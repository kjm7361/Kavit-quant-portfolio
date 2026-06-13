import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '5+', label: 'Projects', sub: 'On GitHub' },
  { value: '8+', label: 'Trading Strategies', sub: 'Built & backtested' },
  { value: '500+', label: 'Equity Pairs', sub: 'Analyzed' },
  { value: '1.84', label: 'Sharpe Ratio', sub: 'Best strategy' },
]

export default function SceneAurora() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#020818' }}
    >
      {/* Stars */}
      {Array.from({ length: 80 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() < 0.2 ? 2 : 1,
            height: Math.random() < 0.2 ? 2 : 1,
            background: '#fff',
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            opacity: Math.random() * 0.5 + 0.15,
          }}
        />
      ))}

      {/* Aurora curtains */}
      <div className="absolute inset-0 overflow-hidden" style={{ top: '-20%' }}>
        {/* Green band */}
        <div
          className="absolute"
          style={{
            width: '140%', height: '55%',
            left: '-20%', top: '10%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,255,120,0.12) 40%, rgba(0,180,100,0.2) 60%, transparent 100%)',
            borderRadius: '50%',
            animation: 'aurora1 9s ease-in-out infinite alternate',
            filter: 'blur(40px)',
          }}
        />
        {/* Cyan/teal band */}
        <div
          className="absolute"
          style={{
            width: '130%', height: '50%',
            left: '-15%', top: '15%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,200,255,0.1) 35%, rgba(0,140,200,0.18) 65%, transparent 100%)',
            borderRadius: '40%',
            animation: 'aurora2 12s ease-in-out infinite alternate',
            filter: 'blur(35px)',
          }}
        />
        {/* Purple/violet band */}
        <div
          className="absolute"
          style={{
            width: '120%', height: '40%',
            left: '-10%', top: '5%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(140,0,255,0.1) 40%, rgba(100,0,200,0.15) 70%, transparent 100%)',
            borderRadius: '60%',
            animation: 'aurora3 7s ease-in-out infinite alternate',
            filter: 'blur(45px)',
          }}
        />
        {/* Warm magenta accent */}
        <div
          className="absolute"
          style={{
            width: '80%', height: '30%',
            right: '-10%', top: '20%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,0,150,0.08), transparent)',
            borderRadius: '50%',
            animation: 'aurora1 11s ease-in-out infinite alternate-reverse',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Snowy ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '18%',
          background: 'linear-gradient(to top, #0a1628 0%, rgba(10,22,40,0.8) 60%, transparent 100%)',
          clipPath: 'polygon(0 100%, 0 40%, 8% 55%, 15% 35%, 25% 50%, 35% 30%, 48% 50%, 60% 28%, 72% 48%, 82% 32%, 92% 50%, 100% 38%, 100% 100%)',
        }}
      />
      {/* Ground base */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '10%', background: '#0a1628' }} />

      {/* Content */}
      <div ref={ref} className="relative z-10 w-full px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(0,255,160,0.6)' }}>
            ✦ &nbsp; By the Numbers &nbsp; ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 0 60px rgba(0,255,160,0.3)',
            }}
          >
            The Work in Metrics
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 900,
                  color: '#00ff9f',
                  textShadow: '0 0 40px rgba(0,255,159,0.5)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-white/70 text-sm font-sans font-medium">{s.label}</div>
              <div className="mt-0.5 text-white/30 text-xs font-sans">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
