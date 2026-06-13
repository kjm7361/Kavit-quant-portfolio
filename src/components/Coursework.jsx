import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const CATS = {
  MATH:  { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', label: 'Mathematics'       },
  CS:    { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  label: 'Computer Science'  },
  ECON:  { color: '#34d399', bg: 'rgba(52,211,153,0.12)', label: 'Economics'          },
  PHYS:  { color: '#fb923c', bg: 'rgba(251,146,60,0.12)', label: 'Physics'            },
  OTHER: { color: '#64748b', bg: 'rgba(100,116,139,0.1)', label: 'General'            },
}

const semesters = [
  {
    term: 'Fall 2024', status: 'completed',
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
    term: 'Spring 2025', status: 'completed',
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
    term: 'Fall 2025', status: 'completed',
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
    term: 'Spring 2026', status: 'active',
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
    term: 'Fall 2026', status: 'upcoming',
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
  pct: +(allCourses.filter(c => c.cat === key).length / total * 100).toFixed(1),
})).filter(a => a.count > 0).sort((a, b) => b.count - a.count)

const STATUS = {
  completed: { dot: '#4b5563', label: 'Completed' },
  active:    { dot: '#00ff9f', label: 'Active',    glow: '0 0 8px #00ff9f' },
  upcoming:  { dot: '#60a5fa', label: 'Upcoming'  },
}

function SemesterBlock({ sem, index, inView }) {
  const [open, setOpen] = useState(sem.status === 'active')
  const st = STATUS[sem.status]

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Semester header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors text-left"
        style={{ background: open ? 'rgba(255,255,255,0.03)' : 'transparent' }}
      >
        <div style={{
          width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
          background: st.dot,
          boxShadow: st.glow || 'none',
        }} />
        <span className="font-mono text-xs font-semibold" style={{
          color: sem.status === 'active' ? '#00ff9f'
               : sem.status === 'upcoming' ? '#60a5fa'
               : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.08em',
        }}>
          {sem.term.toUpperCase()}
        </span>
        <span className="font-mono text-[10px] ml-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {sem.courses.length} courses
        </span>
        <span className="font-mono text-[10px] ml-auto px-2 py-0.5 rounded" style={{
          background: sem.status === 'active'   ? 'rgba(0,255,159,0.1)'
                    : sem.status === 'upcoming' ? 'rgba(96,165,250,0.1)'
                    : 'rgba(255,255,255,0.04)',
          color: sem.status === 'active'   ? '#00ff9f'
               : sem.status === 'upcoming' ? '#60a5fa'
               : 'rgba(255,255,255,0.25)',
        }}>
          {st.label}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Course rows */}
      {open && (
        <div className="ml-4 mt-1 mb-2 border-l" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {sem.courses.map((c, i) => {
            const cat = CATS[c.cat]
            return (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex items-center gap-3 pl-4 py-1.5"
              >
                <span className="font-mono text-[10px] w-20 flex-shrink-0" style={{ color: cat.color, fontWeight: 600 }}>
                  {c.code}
                </span>
                <span className="font-mono text-[10px] flex-1 truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {c.name}
                </span>
                <span
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  {cat.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      )}

      <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '4px 0' }} />
    </motion.div>
  )
}

export default function Coursework() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #02070f 0%, #030a14 60%, #020608 100%)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(96,165,250,0.06) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: 'rgba(96,165,250,0.5)' }}>
            ✦ &nbsp; Curriculum Exposure &nbsp; ✦
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 0 60px rgba(96,165,250,0.2)',
          }}>
            Academic Portfolio<br />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.55em', fontWeight: 400, letterSpacing: '0.02em' }}>
              Pennsylvania State University · B.S. CS + Mathematics · Class of 2028
            </span>
          </h2>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { k: 'Total Positions', v: `${total}` },
              { k: 'Semesters',       v: `${semesters.length}` },
              { k: 'Quant Core',      v: `${(allocation.filter(a=>['MATH','CS','ECON'].includes(a.key)).reduce((s,a)=>s+a.count,0)/total*100).toFixed(0)}%` },
              { k: 'Active Term',     v: 'Spring 2026' },
            ].map(({ k, v }) => (
              <div key={k}>
                <div className="font-mono text-base font-bold" style={{ color: '#60a5fa' }}>{v}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>{k}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT: Semester ledger */}
          <div className="flex-1 rounded-2xl overflow-hidden" style={{
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
              <span className="ml-2 font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                academic_ledger.csv — {total} rows
              </span>
            </div>

            {/* Column headers */}
            <div className="flex items-center gap-3 px-3 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              <span className="font-mono text-[9px] uppercase tracking-widest w-7" style={{ color: 'rgba(255,255,255,0.2)' }} />
              <span className="font-mono text-[9px] uppercase tracking-widest w-20" style={{ color: 'rgba(255,255,255,0.2)' }}>Code</span>
              <span className="font-mono text-[9px] uppercase tracking-widest flex-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Course Name</span>
              <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Subject</span>
            </div>

            <div className="p-3">
              {semesters.map((sem, i) => (
                <SemesterBlock key={sem.term} sem={sem} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* RIGHT: Allocation panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:w-72 flex-shrink-0 flex flex-col gap-5"
          >
            {/* Allocation card */}
            <div className="rounded-2xl overflow-hidden" style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Subject Allocation
                </span>
              </div>
              <div className="p-5 space-y-4">
                {allocation.map((a, i) => (
                  <div key={a.key}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-mono text-[10px]" style={{ color: a.color }}>{a.label}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {a.count} · {a.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${a.pct}%` } : { width: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: `linear-gradient(to right, ${a.color}, ${a.color}aa)`,
                          borderRadius: 9999,
                          boxShadow: `0 0 8px ${a.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quant core highlight */}
            <div className="rounded-2xl p-5" style={{
              background: 'rgba(0,255,159,0.03)',
              border: '1px solid rgba(0,255,159,0.1)',
            }}>
              <p className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: 'rgba(0,255,159,0.5)' }}>
                Quant Core
              </p>
              {[
                { label: 'Real Analysis',           code: 'MATH 312' },
                { label: 'Probability Theory',       code: 'STAT 414' },
                { label: 'Numerical Analysis',       code: 'MATH 455' },
                { label: 'Multivariable Calculus',   code: 'MATH 230' },
                { label: 'Data Structures',          code: 'CMPSC 465' },
                { label: 'Mathematical Statistics',  code: 'MATH 415' },
              ].map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{ delay: 0.6 + i * 0.07, duration: 0.35 }}
                  className="flex justify-between py-1.5 border-b"
                  style={{ borderColor: 'rgba(0,255,159,0.06)' }}
                >
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{c.label}</span>
                  <span className="font-mono text-[10px] font-bold" style={{ color: '#00ff9f' }}>{c.code}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
