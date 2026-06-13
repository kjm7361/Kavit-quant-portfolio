import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  { name: 'Python',    color: '#3B82F6', bg: '#1e3a5f', icon: '🐍' },
  { name: 'React',     color: '#61DAFB', bg: '#0a2a3a', icon: '⚛' },
  { name: 'C++',       color: '#00599C', bg: '#001f40', icon: '⚡' },
  { name: 'NumPy',     color: '#4DABF7', bg: '#1a2f4a', icon: '∑' },
  { name: 'Pandas',    color: '#8B5CF6', bg: '#2a1a5a', icon: '🐼' },
  { name: 'SQL',       color: '#F59E0B', bg: '#3a2800', icon: '🗄' },
  { name: 'Docker',    color: '#2496ED', bg: '#0a2040', icon: '🐳' },
  { name: 'AWS',       color: '#FF9900', bg: '#3a2000', icon: '☁' },
  { name: 'FastAPI',   color: '#009688', bg: '#003330', icon: '🚀' },
  { name: 'PyTorch',   color: '#EE4C2C', bg: '#3a1000', icon: '🔥' },
  { name: 'Plotly',    color: '#A78BFA', bg: '#1a2040', icon: '📊' },
  { name: 'JAX',       color: '#00ff9f', bg: '#002a1a', icon: '∂' },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#020818' }}
    >
      {/* Starfield */}
      {Array.from({ length: 120 }, (_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          width: Math.random() < 0.15 ? 2 : 1,
          height: Math.random() < 0.15 ? 2 : 1,
          background: '#fff',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.1,
          animation: `twinkle ${2 + Math.random() * 5}s ease-in-out ${Math.random() * 4}s infinite`,
        }} />
      ))}

      {/* Nebula glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(30px)', animation: 'aurora3 10s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', top: '30%', right: '5%', width: 350, height: 280, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'aurora2 13s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '30%', width: 500, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,200,150,0.10) 0%, transparent 70%)', filter: 'blur(35px)', animation: 'aurora1 8s ease-in-out infinite alternate' }} />
      </div>

      {/* Milky way band */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(105deg, transparent 20%, rgba(180,150,255,0.04) 40%, rgba(100,150,255,0.06) 50%, rgba(180,150,255,0.04) 60%, transparent 80%)',
      }} />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{ color: 'rgba(160,120,255,0.7)' }}
        >
          ✦ &nbsp; Core Specialization &nbsp; ✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '3.5rem',
            textShadow: '0 0 60px rgba(160,120,255,0.4)',
          }}
        >
          Technical Arsenal
        </motion.h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ scale: 1.15, y: -4 }}
              className="flex flex-col items-center gap-3 cursor-default"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg relative"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${s.bg}, rgba(0,0,0,0.8))`,
                  border: `2px solid ${s.color}40`,
                  boxShadow: `0 0 20px ${s.color}20`,
                }}
              >
                {s.icon}
                <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.15), transparent 60%)' }} />
              </div>
              <span className="text-white/60 text-xs font-sans text-center leading-tight">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
