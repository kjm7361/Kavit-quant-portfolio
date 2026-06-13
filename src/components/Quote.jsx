import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Quote() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: '100vh' }}
    >
      {/* Rocky background — bottom portion of the image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/rocky.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
          filter: 'contrast(1.15) saturate(0.8)',
        }}
      />

      {/* Heavy color-grade overlay — gold/amber tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(30,10,0,0.75) 40%, rgba(0,0,0,0.92) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(180,100,0,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10 w-full px-8 md:px-20 py-24">
        {/* ROCKY IV stamp */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="font-sans text-xs tracking-[0.35em] uppercase"
            style={{ color: 'rgba(218,165,32,0.7)' }}
          >
            🥊 Rocky IV · 1985
          </span>
        </motion.div>

        {/* Giant quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <blockquote
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textShadow: '0 0 80px rgba(218,165,32,0.25)',
            }}
          >
            No<br />Easy<br />
            <span style={{ color: 'rgba(218,165,32,0.95)' }}>Way Out.</span>
          </blockquote>
        </motion.div>

        {/* Attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 font-sans text-sm tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          — Sylvester Stallone as Rocky Balboa
        </motion.p>

        {/* Decorative vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="absolute right-16 top-24 bottom-24 origin-top"
          style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(218,165,32,0.5), transparent)' }}
        />
      </div>
    </section>
  )
}
