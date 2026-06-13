import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const jobs = [
  {
    company: 'RWadiwala Technologies',
    role: 'Trading Intern',
    period: 'Jun 2026 – Present',
    location: 'Surat, Gujarat',
    initial: 'RWT',
    color: '#059669',
    bullets: [
      'Conducted market research and analyzed equity price movements using quantitative and technical indicators.',
      'Assisted in evaluating trading opportunities through data-driven analysis and risk assessment techniques.',
      'Supported portfolio monitoring and performance tracking to identify trends and improve decision-making.',
    ],
  },
  {
    company: 'Penn State Learning',
    role: 'Math Tutor',
    period: 'Aug 2025 – Present',
    location: 'University Park, PA',
    initial: 'PSL',
    color: '#1d4ed8',
    bullets: [
      'Provided one-on-one and small group tutoring in Calculus, Linear Algebra, and introductory Probability.',
      'Assisted students with homework, exam preparation, and problem-solving strategies.',
      'Explained complex quantitative concepts clearly, strengthening communication and teaching skills.',
    ],
  },
  {
    company: 'Nittany Market Analysis Association (NMAA)',
    role: 'Club Member',
    period: 'Aug 2024 – May 2025',
    location: 'University Park, PA',
    initial: 'NMAA',
    color: '#7c3aed',
    bullets: [
      'Conducted equity and macroeconomic research through team-based stock pitch projects.',
      'Applied quantitative analysis to evaluate company fundamentals, market trends, and investment opportunities.',
      'Presented investment theses to peers and mentors, strengthening financial communication skills.',
    ],
  },
]

/* ── phone status bar icons ──────────────────── */
function SignalIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="white">
      <rect x="0"  y="7" width="3" height="3" rx="0.5" opacity="1"   />
      <rect x="4"  y="5" width="3" height="5" rx="0.5" opacity="1"   />
      <rect x="8"  y="2" width="3" height="8" rx="0.5" opacity="1"   />
      <rect x="12" y="0" width="3" height="10" rx="0.5" opacity="0.3"/>
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="white" strokeWidth="1.4">
      <path d="M1 4.5 C3.5 2 11.5 2 14 4.5" opacity="0.4" />
      <path d="M3 6.5 C4.5 5 10.5 5 12 6.5" opacity="0.7" />
      <path d="M5.5 8.5 C6.5 7.5 8.5 7.5 9.5 8.5" />
      <circle cx="7.5" cy="10.5" r="1" fill="white" stroke="none"/>
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <rect x="0.5" y="0.5" width="18" height="11" rx="3.5" stroke="white" strokeOpacity="0.4" />
      <rect x="2" y="2" width="14" height="8" rx="2" fill="white" />
      <path d="M19.5 4.5 C20.5 4.5 21 5 21 6 C21 7 20.5 7.5 19.5 7.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" />
    </svg>
  )
}

/* ── single job row inside phone ─────────────── */
function PhoneJobRow({ job, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-white/5 transition-colors"
      >
        <div
          className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xs"
          style={{ background: job.color, boxShadow: `0 4px 14px ${job.color}50` }}
        >
          {job.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-semibold text-sm leading-tight">{job.company}</div>
          <div className="text-white/45 text-xs mt-0.5">{job.role}</div>
        </div>
        <motion.svg
          animate={{ rotate: open ? 90 : 0 }}
          width="6" height="12" viewBox="0 0 6 12" fill="none"
          className="flex-shrink-0"
        >
          <path d="M1 1L5 6L1 11" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 ml-15">
              <div className="ml-15 pl-15" style={{ marginLeft: 60 }}>
                <div className="text-white/30 text-[10px] mb-2">{job.period} · {job.location}</div>
                {job.bullets.map((b, i) => (
                  <div key={i} className="flex gap-1.5 mb-1">
                    <span className="text-white/25 text-[10px] mt-0.5 flex-shrink-0">›</span>
                    <span className="text-white/55 text-[10px] leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
    </div>
  )
}

/* ── iPhone 15 Pro frame ─────────────────────── */
function IPhone({ children }) {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

  return (
    <div
      className="relative mx-auto flex-shrink-0"
      style={{
        width: 300,
        height: 640,
        background: '#000',
        borderRadius: 44,
        border: '2px solid #2a2a2a',
        boxShadow: '0 0 0 1px #111, 0 40px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Side buttons (decorative) */}
      <div style={{ position: 'absolute', left: -3, top: 100, width: 3, height: 32, background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: -3, top: 140, width: 3, height: 52, background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: -3, top: 200, width: 3, height: 52, background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', right: -3, top: 150, width: 3, height: 70, background: '#1a1a1a', borderRadius: '0 2px 2px 0' }} />

      {/* Screen content */}
      <div className="absolute inset-0 flex flex-col" style={{ borderRadius: 42, overflow: 'hidden' }}>
        {/* Dynamic Island */}
        <div className="relative flex-shrink-0" style={{ height: 50, background: '#000' }}>
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2"
            style={{ width: 100, height: 30, background: '#000', borderRadius: 20, border: '1px solid #1a1a1a' }}
          />
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-5 flex-shrink-0"
          style={{ height: 20, background: '#000' }}
        >
          <span style={{ color: 'white', fontSize: 11, fontFamily: 'sans-serif', fontWeight: 600 }}>{time}</span>
          <div className="flex items-center gap-1.5">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* App header */}
        <div
          className="px-5 pt-3 pb-2 flex-shrink-0"
          style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Professional Journey
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto" style={{ background: '#000' }}>
          <div className="pt-2">
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1 flex-shrink-0" style={{ background: '#000' }}>
          <div style={{ width: 100, height: 4, background: 'rgba(255,255,255,0.25)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

/* ── section ─────────────────────────────────── */
export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="experience" className="relative py-20 px-6 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #000 0%, #030d1a 40%, #040f20 70%, #000 100%)' }}>
      {/* City glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', bottom: 0, left: '20%', width: 300, height: 200, background: 'radial-gradient(ellipse, rgba(30,80,200,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '15%', width: 250, height: 180, background: 'radial-gradient(ellipse, rgba(0,150,255,0.10) 0%, transparent 70%)', filter: 'blur(25px)' }} />
        <div style={{ position: 'absolute', top: '30%', left: '40%', width: 200, height: 150, background: 'radial-gradient(ellipse, rgba(100,60,200,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-16 relative z-10">

        {/* Left: heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="md:w-72 flex-shrink-0 md:sticky md:top-28"
        >
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            Professional<br />Journey
          </h2>
          <p className="mt-4 text-white/40 text-sm font-sans leading-relaxed">
            Tap each role to expand experience details.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            {jobs.map(j => (
              <div key={j.company} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: j.color }} />
                <span className="text-white/40 text-xs font-sans">{j.period}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: iPhone */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <IPhone>
            {jobs.map((j, i) => (
              <PhoneJobRow key={j.company} job={j} index={i} />
            ))}
          </IPhone>
        </motion.div>

      </div>
    </section>
  )
}
