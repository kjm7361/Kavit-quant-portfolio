import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Bio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdfcfb 0%, #f9f3ea 30%, #f5ece0 60%, #f0e6d6 100%)',
      }}
    >
      {/* Subtle radial light */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 60% 40%, rgba(255,160,80,0.08) 0%, transparent 60%)',
      }} />

      {/* Decorative serif marks */}
      <div className="absolute top-12 left-8 text-6xl font-display text-black/5 select-none" style={{ fontFamily: '"Playfair Display", serif', lineHeight: 1 }}>"</div>
      <div className="absolute bottom-12 right-8 text-6xl font-display text-black/5 select-none" style={{ fontFamily: '"Playfair Display", serif', lineHeight: 1 }}>"</div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            lineHeight: 1.75,
            color: '#2a1a0a',
          }}
        >
          I am a quant finance researcher passionate about building{' '}
          <strong>fast, rigorous, and production-grade</strong>{' '}
          analytical systems. Highly driven Computer Science and Mathematics
          student at Penn State with hands-on experience across algorithmic
          trading, statistical arbitrage, options pricing, and full-stack
          platform development. Want to excel in solving complex problems at
          the intersection of mathematics and markets.
        </p>
      </motion.div>
    </section>
  )
}
