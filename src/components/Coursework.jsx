import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const SEM_COLOR = {
  F24: '#6366f1', S25: '#8b5cf6',
  F25: '#3b82f6', S26: '#00ff9f', F26: '#38bdf8',
}
const SEM_LABEL = {
  F24: 'Fall \'24', S25: 'Spr \'25',
  F25: 'Fall \'25', S26: 'Spr \'26', F26: 'Fall \'26',
}

const PANELS = [
  {
    key: 'CS', label: 'Computer Science', icon: '⟨/⟩',
    color: '#60a5fa', glow: 'rgba(96,165,250,0.18)',
    border: 'rgba(96,165,250,0.25)', dim: 'rgba(96,165,250,0.07)',
    from: -80,
    courses: [
      { code: 'CMPSC 131', name: 'Programming & Computation I',   sem: 'F24' },
      { code: 'CMPSC 132', name: 'Programming & Computation II',  sem: 'S25' },
      { code: 'CMPSC 221', name: 'OOP with Web',                  sem: 'F25' },
      { code: 'CMPSC 360', name: 'Discrete Mathematics',          sem: 'F25' },
      { code: 'DS 120',    name: 'Data Science Scripting',        sem: 'F25' },
      { code: 'CMPEN 270', name: 'Digital Design',                sem: 'S26' },
      { code: 'CMPSC 311', name: 'Systems Programming',           sem: 'S26' },
      { code: 'CMPEN 331', name: 'Computer Organization',         sem: 'F26' },
      { code: 'CMPSC 461', name: 'Programming Language Concepts', sem: 'F26' },
      { code: 'CMPSC 465', name: 'Data Structures & Algorithms',  sem: 'F26' },
    ],
  },
  {
    key: 'MATH', label: 'Mathematics', icon: '∑',
    color: '#a78bfa', glow: 'rgba(167,139,250,0.18)',
    border: 'rgba(167,139,250,0.25)', dim: 'rgba(167,139,250,0.07)',
    from: 0,
    courses: [
      { code: 'MATH 140', name: 'Calculus I',                     sem: 'F24' },
      { code: 'MATH 141', name: 'Calculus II',                    sem: 'S25' },
      { code: 'MATH 220', name: 'Matrices',                       sem: 'S25' },
      { code: 'MATH 230', name: 'Multivariable Calculus',         sem: 'F25' },
      { code: 'MATH 312', name: 'Real Analysis',                  sem: 'F25' },
      { code: 'MATH 455', name: 'Numerical Analysis I',           sem: 'S26' },
      { code: 'STAT 414', name: 'Probability Theory',             sem: 'S26' },
      { code: 'MATH 250', name: 'Ordinary Diff. Equations',       sem: 'F26' },
      { code: 'MATH 415', name: 'Mathematical Statistics',        sem: 'F26' },
    ],
  },
  {
    key: 'ECON', label: 'Economics', icon: '◈',
    color: '#34d399', glow: 'rgba(52,211,153,0.18)',
    border: 'rgba(52,211,153,0.25)', dim: 'rgba(52,211,153,0.07)',
    from: 80,
    courses: [
      { code: 'ECON 102', name: 'Microeconomic Analysis',         sem: 'F24' },
      { code: 'ECON 104', name: 'Macroeconomic Analysis',         sem: 'S26' },
      { code: 'ECON 302', name: 'Intermediate Microeconomics',    sem: 'S26' },
      { code: 'ECON 304', name: 'Intermediate Macroeconomics',    sem: 'F26' },
    ],
  },
]

function CourseRow({ course, index, inView, panelColor }) {
  const [hovered, setHovered] = useState(false)
  const sc = SEM_COLOR[course.sem]
  const isActive = course.sem === 'S26'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.06, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-default"
      style={{
        background: hovered ? `rgba(255,255,255,0.04)` : 'transparent',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
        transition: 'all 0.2s',
        boxShadow: hovered ? `0 0 20px ${panelColor}20` : 'none',
      }}
    >
      {/* Semester dot */}
      <div style={{
        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
        background: sc,
        boxShadow: isActive ? `0 0 8px ${sc}` : 'none',
      }} />

      {/* Code + name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-bold" style={{ color: panelColor }}>
            {course.code}
          </span>
          <span className="font-mono text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {course.name}
          </span>
        </div>
      </div>

      {/* Semester tag */}
      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
        style={{
          background: `${sc}18`,
          color: sc,
          border: `1px solid ${sc}40`,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.2s',
        }}>
        {SEM_LABEL[course.sem]}
      </span>
    </motion.div>
  )
}

function Panel({ panel, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, x: panel.from * 0.3 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 60, x: panel.from * 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col rounded-3xl overflow-hidden relative"
      style={{
        background: `linear-gradient(160deg, ${panel.dim} 0%, rgba(0,0,0,0) 60%)`,
        border: `1px solid ${hovered ? panel.border : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 60px ${panel.glow}, 0 20px 40px rgba(0,0,0,0.3)` : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Glow top-right corner */}
      <div className="absolute top-0 right-0 pointer-events-none" style={{
        width: 200, height: 200,
        background: `radial-gradient(circle at top right, ${panel.glow} 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.4s',
      }} />

      {/* Large background number */}
      <div className="absolute bottom-4 right-5 select-none pointer-events-none" style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '8rem',
        fontWeight: 900,
        color: panel.color,
        opacity: 0.04,
        lineHeight: 1,
      }}>
        {panel.courses.length}
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b relative z-10" style={{ borderColor: `${panel.color}18` }}>
        <div className="flex items-center gap-3 mb-1">
          <motion.span
            animate={{ textShadow: hovered ? `0 0 20px ${panel.color}` : '0 0 0px transparent' }}
            transition={{ duration: 0.3 }}
            className="text-2xl select-none"
            style={{ color: panel.color }}
          >
            {panel.icon}
          </motion.span>
          <div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#fff',
            }}>
              {panel.label}
            </div>
            <div className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {panel.courses.length} core courses
            </div>
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="mt-3 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 1, delay: 0.4 + index * 0.15, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(to right, ${panel.color}, ${panel.color}44)`, boxShadow: `0 0 8px ${panel.color}` }}
          />
        </div>
      </div>

      {/* Course list */}
      <div className="flex-1 py-2 relative z-10">
        {panel.courses.map((c, i) => (
          <CourseRow key={c.code} course={c} index={i} inView={inView} panelColor={panel.color} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Coursework() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#03070f' }}>
      {/* Aurora glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', top:'5%',   left:'0%',   width:500, height:300, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(96,165,250,0.1) 0%,transparent 70%)',   filter:'blur(70px)', animation:'aurora2 14s ease-in-out infinite alternate' }} />
        <div style={{ position:'absolute', top:'20%',  left:'30%',  width:600, height:300, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(167,139,250,0.1) 0%,transparent 70%)', filter:'blur(70px)', animation:'aurora1 11s ease-in-out infinite alternate' }} />
        <div style={{ position:'absolute', top:'10%',  right:'0%',  width:400, height:300, borderRadius:'50%', background:'radial-gradient(ellipse,rgba(52,211,153,0.08) 0%,transparent 70%)', filter:'blur(70px)', animation:'aurora3 9s ease-in-out infinite alternate' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(167,139,250,0.6)' }}>
            ✦ &nbsp; Core Curriculum &nbsp; ✦
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 700, color: '#fff', lineHeight: 1.1,
            textShadow: '0 0 80px rgba(167,139,250,0.3)',
          }}>
            Academic Foundation
          </h2>
          <p className="font-mono text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Pennsylvania State University · B.S. Computer Science + Mathematics · Class of 2028
          </p>

          {/* Semester legend */}
          <div className="flex flex-wrap gap-3 mt-6">
            {Object.entries(SEM_LABEL).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div style={{ width:7, height:7, borderRadius:'50%', background: SEM_COLOR[key], boxShadow: key==='S26'?`0 0 8px ${SEM_COLOR[key]}`:'none' }} />
                <span className="font-mono text-[10px]" style={{ color: key==='S26'?SEM_COLOR[key]:'rgba(255,255,255,0.3)' }}>{label}</span>
              </div>
            ))}
            <span className="font-mono text-[10px]" style={{ color:'rgba(255,255,255,0.15)' }}>— hover a course to highlight</span>
          </div>
        </motion.div>

        {/* Three panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PANELS.map((panel, i) => (
            <Panel key={panel.key} panel={panel} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
