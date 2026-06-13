import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const QUOTE = "The people who are crazy enough to think they can change the world are the ones who do."
const words = QUOTE.split(' ')

export default function QuoteJobs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: '70vh', background: '#030303' }}
    >
      {/* Subtle radial glow behind text */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-mono text-xs tracking-[0.3em] uppercase mb-10"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Steve Jobs · Stanford, 2005
        </motion.p>

        {/* Word-by-word reveal */}
        <blockquote
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={inView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 24, filter: 'blur(10px)' }
              }
              transition={{ duration: 0.55, delay: i * 0.055, ease: 'easeOut' }}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </motion.span>
          ))}
        </blockquote>

        {/* Attribution line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: words.length * 0.055 + 0.1, ease: 'easeOut' }}
          style={{ originX: 0 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)' }} />
          <span
            className="font-sans text-xs tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Steve Jobs
          </span>
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.2)' }} />
        </motion.div>
      </div>
    </section>
  )
}
