import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function WaveLayer({ color, opacity, speed, yOffset, delay }) {
  const path = "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 C1150,80 1350,0 1500,40 C1650,80 1850,0 2000,40 L2000,120 L0,120 Z"
  return (
    <div
      className="absolute left-0 right-0"
      style={{ bottom: yOffset, height: 120, overflow: 'hidden' }}
    >
      <svg
        viewBox="0 0 2000 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        style={{ animation: `${speed > 0 ? 'wave1' : 'wave2'} ${Math.abs(speed)}s linear infinite` }}
      >
        <path d={path} fill={color} opacity={opacity} />
      </svg>
    </div>
  )
}

export default function SceneOcean() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #020c1b 0%, #041830 20%, #062040 40%, #082850 55%, #0a3060 70%, #0a2a50 85%, #061520 100%)',
      }}
    >
      {/* Stars in sky portion */}
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: 1, height: 1, background: '#fff',
          top: `${Math.random() * 35}%`, left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.4 + 0.1,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
        }} />
      ))}

      {/* Moon */}
      <div className="absolute" style={{
        width: 60, height: 60, borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 40%, #fffde7, #ffd54f)',
        top: '12%', right: '15%',
        boxShadow: '0 0 40px 10px rgba(255,220,80,0.25)',
      }} />

      {/* Moon reflection on water */}
      <div className="absolute" style={{
        width: 4, bottom: '30%', left: '50%', top: '30%',
        background: 'linear-gradient(to bottom, transparent, rgba(255,220,80,0.5) 50%, transparent)',
        filter: 'blur(3px)',
      }} />

      {/* Ocean depth glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 80%, rgba(0,100,200,0.2) 0%, transparent 60%)',
      }} />

      {/* Wave layers */}
      <WaveLayer color="#041830" opacity={0.6} speed={18} yOffset="14%" />
      <WaveLayer color="#062040" opacity={0.7} speed={-14} yOffset="9%" />
      <WaveLayer color="#082850" opacity={0.8} speed={20} yOffset="4%" />
      <WaveLayer color="#0a2a50" opacity={0.9} speed={-16} yOffset="1%" />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '14%', background: '#061520' }} />

      {/* Center text */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 text-center px-8 pb-20"
      >
        <p className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: 'rgba(100,180,255,0.6)' }}>
          ✦ &nbsp; In pursuit of alpha &nbsp; ✦
        </p>
        <blockquote
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
            fontStyle: 'italic',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.3,
            textShadow: '0 0 60px rgba(0,120,255,0.4)',
            maxWidth: 800,
          }}
        >
          "The edge is not in the data.<br />
          It's in how you think about it."
        </blockquote>
        <p className="mt-5 font-sans text-xs tracking-widest text-white/30 uppercase">— Kavit Mandalaywala</p>
      </motion.div>
    </section>
  )
}
