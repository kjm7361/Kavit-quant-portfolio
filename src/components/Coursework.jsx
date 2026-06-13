import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const CATS = {
  MATH:  { color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)', label: 'Math'  },
  CS:    { color: '#60a5fa', bg: 'rgba(96,165,250,0.15)',  border: 'rgba(96,165,250,0.35)',  label: 'CS'    },
  ECON:  { color: '#34d399', bg: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.35)',  label: 'Econ'  },
  PHYS:  { color: '#fb923c', bg: 'rgba(251,146,60,0.15)', border: 'rgba(251,146,60,0.35)',  label: 'Phys'  },
  OTHER: { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.25)', label: 'Gen'   },
}

const semesters = [
  {
    term: 'Fall 2024', status: 'completed', accent: '#6366f1',
    courses: [
      { code: 'ASTRO 1',   name: 'Astronomical Universe',          cat: 'OTHER' },
      { code: 'CMPSC 131', name: 'Programming & Computation I',    cat: 'CS'    },
      { code: 'ECON 102',  name: 'Microeconomic Analysis',         cat: 'ECON'  },
      { code: 'ENGR 100',  name: 'Intro to Engineering',           cat: 'OTHER' },
      { code: 'IST 130',   name: 'Tech and Pop Culture',           cat: 'OTHER' },
      { code: 'MATH 140',  name: 'Calculus I',                     cat: 'MATH'  },
    ],
  },
  {
    term: 'Spring 2025', status: 'completed', accent: '#8b5cf6',
    courses: [
      { code: 'CMPSC 132', name: 'Programming & Computation II',   cat: 'CS'    },
      { code: 'ESL 15',    name: 'Academic Writing 2',             cat: 'OTHER' },
      { code: 'LDT 100',   name: 'World Tech',                     cat: 'OTHER' },
      { code: 'LDT 110N',  name: 'Making Art & Learning Tech',     cat: 'OTHER' },
      { code: 'MATH 141',  name: 'Calculus II',                    cat: 'MATH'  },
      { code: 'MATH 220',  name: 'Matrices',                       cat: 'MATH'  },
    ],
  },
  {
    term: 'Fall 2025', status: 'completed', accent: '#3b82f6',
    courses: [
      { code: 'CAS 100A',  name: 'Effective Speech',               cat: 'OTHER' },
      { code: 'CI 200',    name: 'Peer Tutoring',                  cat: 'OTHER' },
      { code: 'CMPSC 221', name: 'OOP with Web',                   cat: 'CS'    },
      { code: 'CMPSC 360', name: 'Discrete Mathematics',           cat: 'CS'    },
      { code: 'DS 120',    name: 'Data Science Scripting',         cat: 'CS'    },
      { code: 'ENGR 287',  name: 'Engineering Career Prep',        cat: 'OTHER' },
      { code: 'MATH 230',  name: 'Multivariable Calculus',         cat: 'MATH'  },
      { code: 'MATH 312',  name: 'Real Analysis',                  cat: 'MATH'  },
      { code: 'PHYS 211',  name: 'Mechanics',                      cat: 'PHYS'  },
      { code: 'PHYS 212',  name: 'Electricity & Magnetism',        cat: 'PHYS'  },
    ],
  },
  {
    term: 'Spring 2026', status: 'active', accent: '#00ff9f',
    courses: [
      { code: 'CMPEN 270', name: 'Digital Design',                 cat: 'CS'    },
      { code: 'CMPSC 311', name: 'Systems Programming',            cat: 'CS'    },
      { code: 'ECON 104',  name: 'Macroeconomic Analysis',         cat: 'ECON'  },
      { code: 'ECON 302',  name: 'Intermediate Microeconomics',    cat: 'ECON'  },
      { code: 'MATH 455',  name: 'Numerical Analysis I',           cat: 'MATH'  },
      { code: 'STAT 414',  name: 'Intro to Probability Theory',    cat: 'MATH'  },
    ],
  },
  {
    term: 'Fall 2026', status: 'upcoming', accent: '#38bdf8',
    courses: [
      { code: 'CMPEN 331', name: 'Computer Organization & Design', cat: 'CS'    },
      { code: 'CMPSC 461', name: 'Programming Language Concepts',  cat: 'CS'    },
      { code: 'CMPSC 465', name: 'Data Structures & Algorithms',   cat: 'CS'    },
      { code: 'ECON 304',  name: 'Intermediate Macroeconomics',    cat: 'ECON'  },
      { code: 'MATH 250',  name: 'Ordinary Differential Equations',cat: 'MATH'  },
      { code: 'MATH 415',  name: 'Mathematical Statistics',        cat: 'MATH'  },
    ],
  },
]

const allCourses = semesters.flatMap(s => s.courses)
const total = allCourses.length
const allocation = Object.entries(CATS).map(([key, meta]) => ({
  key, ...meta,
  count: allCourses.filter(c => c.cat === key).length,
  pct:  +(allCourses.filter(c => c.cat === key).length / total * 100).toFixed(1),
})).filter(a => a.count > 0).sort((a, b) => b.count - a.count)

/* ── count-up hook ───────────────────────────── */
function useCountUp(target, inView, decimals = 0, duration = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) { setVal(0); return }
    const start = Date.now()
    let raf
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const e = 1 - Math.pow(1 - t, 3)
      setVal(+(target * e).toFixed(decimals))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, decimals, duration])
  return decimals === 0 ? Math.round(val) : val.toFixed(decimals)
}

/* ── chip with tooltip ───────────────────────── */
function Chip({ course, delay, inView }) {
  const [hovered, setHovered] = useState(false)
  const cat = CATS[course.cat]
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
      transition={{ duration: 0.35, delay, ease: 'backOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.1, y: -3 }}
        className="px-2.5 py-1 rounded-full font-mono text-[10px] cursor-default select-none"
        style={{
          background: cat.bg,
          border: `1px solid ${cat.border}`,
          color: cat.color,
          boxShadow: hovered ? `0 0 12px ${cat.color}50` : 'none',
          transition: 'box-shadow 0.2s',
        }}
      >
        {course.code}
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-50"
            style={{
              background: '#0d1117',
              border: `1px solid ${cat.border}`,
              color: cat.color,
              fontSize: 10,
              fontFamily: 'monospace',
              boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 10px ${cat.color}30`,
            }}
          >
            {course.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── semester row on timeline ────────────────── */
function SemesterRow({ sem, index, inView }) {
  const isActive   = sem.status === 'active'
  const isUpcoming = sem.status === 'upcoming'

  return (
    <motion.div
      className="flex gap-5 mb-10"
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1" style={{ width: 20 }}>
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1], boxShadow: [`0 0 0px ${sem.accent}`, `0 0 18px ${sem.accent}`, `0 0 0px ${sem.accent}`] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 14, height: 14, borderRadius: '50%',
            background: isActive ? sem.accent : isUpcoming ? 'transparent' : sem.accent + '60',
            border: `2px solid ${sem.accent}${isUpcoming ? '60' : 'cc'}`,
            flexShrink: 0,
          }}
        />
        {index < semesters.length - 1 && (
          <div style={{ flex: 1, width: 2, background: `linear-gradient(to bottom, ${sem.accent}40, ${semesters[index+1].accent}20)`, marginTop: 4, minHeight: 40 }} />
        )}
      </div>

      {/* Content card */}
      <div
        className="flex-1 rounded-2xl overflow-hidden mb-2"
        style={{
          background: isActive
            ? `linear-gradient(135deg, rgba(0,255,159,0.05) 0%, rgba(0,0,0,0) 100%)`
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isActive ? 'rgba(0,255,159,0.2)' : 'rgba(255,255,255,0.06)'}`,
        }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${sem.accent}20` }}>
          <div>
            <span
              className="font-mono text-sm font-bold tracking-wide"
              style={{ color: isActive ? sem.accent : isUpcoming ? sem.accent + 'aa' : 'rgba(255,255,255,0.6)' }}
            >
              {sem.term}
            </span>
            <span className="font-mono text-[10px] ml-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {sem.courses.length} courses
            </span>
          </div>
          <span
            className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-full"
            style={{
              background: isActive ? 'rgba(0,255,159,0.1)' : isUpcoming ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.04)',
              color: isActive ? '#00ff9f' : isUpcoming ? '#38bdf8' : 'rgba(255,255,255,0.3)',
              border: `1px solid ${isActive ? 'rgba(0,255,159,0.2)' : isUpcoming ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {isActive ? '● Active' : isUpcoming ? '◌ Upcoming' : '✓ Done'}
          </span>
        </div>

        {/* Course chips */}
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {sem.courses.map((c, i) => (
            <Chip
              key={c.code}
              course={c}
              inView={inView}
              delay={index * 0.1 + i * 0.045}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── main section ────────────────────────────── */
export default function Coursework() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  const countTotal = useCountUp(total, inView)
  const countSem   = useCountUp(semesters.length, inView)
  const countQuant = useCountUp(68, inView)

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: '#03070f' }}
    >
      {/* Aurora glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '10%', left: '5%',  width: 500, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'aurora2 14s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', top: '40%', right: '5%', width: 400, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,255,159,0.07) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'aurora1 10s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '30%', width: 600, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(96,165,250,0.06) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'aurora3 12s ease-in-out infinite alternate' }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
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
            ✦ &nbsp; Curriculum Exposure &nbsp; ✦
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 700, color: '#fff', lineHeight: 1.1,
            textShadow: '0 0 80px rgba(167,139,250,0.3)',
          }}>
            Academic Portfolio
          </h2>
          <p className="font-mono text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Pennsylvania State University · B.S. Computer Science + Mathematics · Class of 2028
          </p>

          {/* Animated stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            {[
              { val: countTotal, suffix: '', label: 'Total Courses' },
              { val: countSem,   suffix: '', label: 'Semesters'     },
              { val: countQuant, suffix: '%', label: 'Quant Core'   },
            ].map(({ val, suffix, label }) => (
              <div key={label}>
                <div className="font-mono text-3xl font-black" style={{
                  background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {val}{suffix}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* LEFT: Timeline */}
          <div className="flex-1 min-w-0">
            {semesters.map((sem, i) => (
              <SemesterRow key={sem.term} sem={sem} index={i} inView={inView} />
            ))}
          </div>

          {/* RIGHT: Allocation + Quant Core */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="lg:w-72 flex-shrink-0 space-y-5 lg:sticky lg:top-28"
          >
            {/* Allocation */}
            <div className="rounded-2xl overflow-hidden" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div className="px-5 pt-5 pb-2">
                <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Subject Allocation
                </p>
                <div className="space-y-3.5">
                  {allocation.map((a, i) => (
                    <div key={a.key}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-mono text-xs font-semibold" style={{ color: a.color }}>{a.label}</span>
                        <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{a.count} · {a.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${a.pct}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                          style={{
                            height: '100%', borderRadius: 9999,
                            background: `linear-gradient(to right, ${a.color}, ${a.color}80)`,
                            boxShadow: `0 0 10px ${a.color}60`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category legend chips */}
              <div className="flex flex-wrap gap-1.5 px-5 py-4 border-t mt-2" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {allocation.map(a => (
                  <span key={a.key} className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                    style={{ background: a.bg, color: a.color, border: `1px solid ${a.border}` }}>
                    {a.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Quant Core */}
            <div className="rounded-2xl p-5" style={{
              background: 'rgba(0,255,159,0.02)',
              border: '1px solid rgba(0,255,159,0.1)',
            }}>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'rgba(0,255,159,0.5)' }}>
                ⬡ Quant Core Courses
              </p>
              {[
                { name: 'Real Analysis',            code: 'MATH 312', cat: 'MATH' },
                { name: 'Probability Theory',        code: 'STAT 414', cat: 'MATH' },
                { name: 'Numerical Analysis I',      code: 'MATH 455', cat: 'MATH' },
                { name: 'Multivariable Calculus',    code: 'MATH 230', cat: 'MATH' },
                { name: 'Data Structures',           code: 'CMPSC 465',cat: 'CS'   },
                { name: 'Mathematical Statistics',   code: 'MATH 415', cat: 'MATH' },
              ].map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                  className="flex justify-between items-center py-2 border-b"
                  style={{ borderColor: 'rgba(0,255,159,0.07)' }}
                >
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.name}</span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: CATS[c.cat].bg, color: CATS[c.cat].color, border: `1px solid ${CATS[c.cat].border}` }}>
                    {c.code}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
