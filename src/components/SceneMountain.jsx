import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SceneMountain() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Sky gradient — warm dawn */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0a0015 0%, #1a0535 12%, #3d0f6e 28%, #7b2d8b 42%, #c0514f 58%, #e8854a 72%, #f7b733 85%, #fce38a 100%)',
        }}
      />

      {/* Sun */}
      <div
        className="absolute"
        style={{
          width: 100, height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff9e0 0%, #ffd966 50%, #ffb347 100%)',
          bottom: '32%', left: '50%', transform: 'translateX(-50%)',
          animation: 'sunPulse 3s ease-in-out infinite',
          zIndex: 2,
        }}
      />

      {/* Atmosphere glow behind sun */}
      <div
        className="absolute"
        style={{
          width: 400, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,200,80,0.35) 0%, transparent 70%)',
          bottom: '28%', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      />

      {/* Mountain layers — back to front */}
      {/* Layer 4 — farthest, lightest */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '40%',
          background: 'rgba(120,60,140,0.6)',
          clipPath: 'polygon(0 100%, 0 55%, 5% 45%, 12% 30%, 20% 42%, 28% 20%, 35% 38%, 42% 15%, 50% 35%, 58% 18%, 65% 32%, 72% 22%, 80% 38%, 88% 25%, 95% 40%, 100% 35%, 100% 100%)',
          zIndex: 3,
        }}
      />
      {/* Layer 3 */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '36%',
          background: 'rgba(80,30,100,0.8)',
          clipPath: 'polygon(0 100%, 0 60%, 8% 38%, 15% 55%, 22% 25%, 30% 48%, 38% 20%, 46% 42%, 55% 28%, 62% 45%, 70% 18%, 78% 40%, 85% 28%, 92% 42%, 100% 32%, 100% 100%)',
          zIndex: 4,
        }}
      />
      {/* Layer 2 */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '32%',
          background: 'rgba(30,10,50,0.92)',
          clipPath: 'polygon(0 100%, 0 52%, 10% 28%, 18% 50%, 26% 15%, 34% 45%, 43% 22%, 52% 48%, 60% 20%, 68% 44%, 76% 30%, 84% 50%, 92% 25%, 100% 42%, 100% 100%)',
          zIndex: 5,
        }}
      />
      {/* Layer 1 — foreground, darkest */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '22%',
          background: '#08010f',
          clipPath: 'polygon(0 100%, 0 65%, 12% 35%, 20% 60%, 32% 20%, 44% 55%, 55% 30%, 66% 55%, 78% 25%, 88% 50%, 100% 38%, 100% 100%)',
          zIndex: 6,
        }}
      />

      {/* Stars (top of sky) */}
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            background: '#fff',
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.6 + 0.2,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Text content */}
      <div className="relative z-10 text-center px-8 pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: 'rgba(255,220,150,0.7)' }}
        >
          ✦ &nbsp; Where Mathematics Meets Markets &nbsp; ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.9 }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            textShadow: '0 2px 40px rgba(0,0,0,0.6)',
          }}
        >
          Building systems that<br />see what others don't.
        </motion.h2>
      </div>
    </section>
  )
}
