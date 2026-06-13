import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ── semester config ─────────────────────────── */
const SEMS  = ['F24', 'S25', 'F25', 'S26', 'F26']
const SEM_C = { F24:'#6366f1', S25:'#8b5cf6', F25:'#3b82f6', S26:'#00ff9f', F26:'#38bdf8' }
const SEM_L = { F24:"Fall '24", S25:"Spr '25", F25:"Fall '25", S26:"Spr '26", F26:"Fall '26" }

/* ── core course data ────────────────────────── */
const SECTIONS = [
  {
    key: 'CS', label: 'COMPUTER SCIENCE', color: '#60a5fa',
    courses: [
      { code:'CMPSC 131', name:'Programming & Computation I',   sem:'F24' },
      { code:'CMPSC 132', name:'Programming & Computation II',  sem:'S25' },
      { code:'CMPSC 221', name:'OOP with Web-Based Apps',       sem:'F25' },
      { code:'CMPSC 360', name:'Discrete Mathematics for CS',   sem:'F25' },
      { code:'DS 120',    name:'Data Science Scripting',        sem:'F25' },
      { code:'CMPEN 270', name:'Digital Design',                sem:'S26' },
      { code:'CMPSC 311', name:'Systems Programming',           sem:'S26' },
      { code:'CMPEN 331', name:'Computer Organization & Design',sem:'F26' },
      { code:'CMPSC 461', name:'Programming Language Concepts', sem:'F26' },
      { code:'CMPSC 465', name:'Data Structures & Algorithms',  sem:'F26' },
    ],
  },
  {
    key: 'MATH', label: 'MATHEMATICS', color: '#a78bfa',
    courses: [
      { code:'MATH 140',  name:'Calculus I',                    sem:'F24' },
      { code:'MATH 141',  name:'Calculus II',                   sem:'S25' },
      { code:'MATH 220',  name:'Matrices',                      sem:'S25' },
      { code:'MATH 230',  name:'Multivariable Calculus',        sem:'F25' },
      { code:'MATH 312',  name:'Real Analysis',                 sem:'F25' },
      { code:'STAT 414',  name:'Intro to Probability Theory',   sem:'S26' },
      { code:'MATH 455',  name:'Numerical Analysis I',          sem:'S26' },
      { code:'MATH 250',  name:'Ordinary Differential Equations',sem:'F26'},
      { code:'MATH 415',  name:'Mathematical Statistics',       sem:'F26' },
    ],
  },
  {
    key: 'ECON', label: 'ECONOMICS', color: '#34d399',
    courses: [
      { code:'ECON 102',  name:'Microeconomic Analysis',        sem:'F24' },
      { code:'ECON 104',  name:'Macroeconomic Analysis',        sem:'S26' },
      { code:'ECON 302',  name:'Intermediate Microeconomics',   sem:'S26' },
      { code:'ECON 304',  name:'Intermediate Macroeconomics',   sem:'F26' },
    ],
  },
]

const TOTAL = SECTIONS.reduce((s, sec) => s + sec.courses.length, 0)

/* ── 5-dot semester timeline ─────────────────── */
function SemTimeline({ sem, inView, delay }) {
  return (
    <div className="flex items-center gap-1">
      {SEMS.map((s, i) => {
        const isThis   = s === sem
        const isActive = s === 'S26'
        const c        = SEM_C[s]
        return (
          <motion.div
            key={s}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: delay + i * 0.04, duration: 0.2, ease: 'backOut' }}
          >
            {isThis ? (
              <motion.div
                animate={isActive ? { boxShadow: [`0 0 0px ${c}`, `0 0 10px ${c}`, `0 0 0px ${c}`] } : {}}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 9, height: 9, borderRadius: '50%', background: c,
                         boxShadow: isActive ? `0 0 8px ${c}` : `0 0 4px ${c}60` }}
              />
            ) : (
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── single course row ───────────────────────── */
function CourseRow({ course, color, rowIndex, inView, sectionDelay }) {
  const delay = sectionDelay + rowIndex * 0.045
  const isActive = course.sem === 'S26'
  const isUpcoming = course.sem === 'F26'

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="group flex items-center gap-3 px-4 py-2 rounded-lg"
      style={{ transition: 'background 0.15s' }}
      onMouseEnter={e  => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
      onMouseLeave={e  => e.currentTarget.style.background = 'transparent'}
    >
      {/* Row index */}
      <span className="font-mono text-[9px] w-4 flex-shrink-0 text-right select-none"
        style={{ color: 'rgba(255,255,255,0.12)' }}>
        {String(rowIndex + 1).padStart(2, '0')}
      </span>

      {/* Course code — like a ticker */}
      <span className="font-mono text-xs font-bold w-24 flex-shrink-0"
        style={{ color, letterSpacing: '0.05em' }}>
        {course.code}
      </span>

      {/* Name */}
      <span className="font-mono text-[11px] flex-1 truncate"
        style={{ color: 'rgba(255,255,255,0.38)' }}>
        {course.name}
      </span>

      {/* 5-dot timeline */}
      <div className="flex-shrink-0">
        <SemTimeline sem={course.sem} inView={inView} delay={delay} />
      </div>

      {/* Semester tag */}
      <span className="font-mono text-[9px] w-14 text-right flex-shrink-0"
        style={{
          color: isActive ? SEM_C['S26'] : isUpcoming ? SEM_C['F26'] : 'rgba(255,255,255,0.2)',
          fontWeight: isActive ? 700 : 400,
        }}>
        {SEM_L[course.sem]}
      </span>
    </motion.div>
  )
}

/* ── section block ───────────────────────────── */
function Section({ sec, sectionIndex, inView }) {
  const sectionDelay = 0.2 + sectionIndex * 0.08

  return (
    <div>
      {/* Section divider header */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.6, delay: sectionDelay, ease: 'easeOut' }}
        style={{ originX: 0 }}
        className="flex items-center gap-3 px-4 py-2 mt-2"
      >
        <div style={{ height: 1, width: 8, background: sec.color, opacity: 0.6 }} />
        <span className="font-mono text-[10px] font-bold tracking-[0.2em]"
          style={{ color: sec.color }}>
          {sec.label}
        </span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${sec.color}40, transparent)` }} />
        <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {sec.courses.length} POS
        </span>
      </motion.div>

      {/* Courses */}
      {sec.courses.map((c, i) => (
        <CourseRow
          key={c.code}
          course={c}
          color={sec.color}
          rowIndex={i}
          inView={inView}
          sectionDelay={sectionDelay + 0.05}
        />
      ))}
    </div>
  )
}

/* ── main component ──────────────────────────── */
export default function Coursework() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: '#010407' }}>

      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)',
      }} />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">

        {/* ── Terminal window ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-5 py-3"
            style={{ background: '#0a0e18', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ width:9,height:9,borderRadius:'50%',background:'#ff5f56' }}/>
            <div style={{ width:9,height:9,borderRadius:'50%',background:'#ffbd2e' }}/>
            <div style={{ width:9,height:9,borderRadius:'50%',background:'#27c93f' }}/>
            <span className="font-mono text-[10px] ml-3" style={{ color:'rgba(255,255,255,0.2)' }}>
              academic_exposure.py — Penn State University
            </span>
            <div className="ml-auto flex items-center gap-1">
              <div style={{ width:6,height:6,borderRadius:'50%',background:'#00ff9f',boxShadow:'0 0 6px #00ff9f',animation:'pulse 1.5s ease-in-out infinite' }} />
              <span className="font-mono text-[9px]" style={{ color:'#00ff9f' }}>LIVE</span>
            </div>
          </div>

          {/* ── Header panel ───────────────────── */}
          <div className="px-5 py-4 border-b" style={{ background:'#050a12', borderColor:'rgba(255,255,255,0.05)' }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <motion.p
                  initial={{ opacity:0 }} animate={inView?{opacity:1}:{opacity:0}}
                  transition={{ duration:0.5 }}
                  className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1"
                  style={{ color:'rgba(255,255,255,0.2)' }}>
                  FACTOR EXPOSURE REPORT
                </motion.p>
                <motion.h2
                  initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{opacity:0,x:-20}}
                  transition={{ duration:0.6, delay:0.05 }}
                  className="font-mono text-lg font-bold"
                  style={{ color:'#fff', letterSpacing:'0.05em' }}>
                  KAVIT J. MANDALAYWALA
                </motion.h2>
                <motion.p
                  initial={{ opacity:0 }} animate={inView?{opacity:1}:{opacity:0}}
                  transition={{ delay:0.1 }}
                  className="font-mono text-[10px] mt-0.5"
                  style={{ color:'rgba(255,255,255,0.25)' }}>
                  B.S. Computer Science + Mathematics · Penn State · Class of 2028
                </motion.p>
              </div>

              {/* Factor summary */}
              <div className="flex gap-6">
                {SECTIONS.map((sec, i) => (
                  <motion.div key={sec.key}
                    initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{opacity:0,y:10}}
                    transition={{ delay:0.1+i*0.07 }}>
                    <div className="font-mono text-xl font-black" style={{ color:sec.color }}>
                      {sec.courses.length}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color:'rgba(255,255,255,0.2)' }}>
                      {sec.key}
                    </div>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity:0, y:10 }} animate={inView?{opacity:1,y:0}:{opacity:0,y:10}} transition={{ delay:0.31 }}>
                  <div className="font-mono text-xl font-black" style={{ color:'rgba(255,255,255,0.5)' }}>{TOTAL}</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color:'rgba(255,255,255,0.2)' }}>TOTAL</div>
                </motion.div>
              </div>
            </div>

            {/* Exposure bars */}
            <div className="flex items-center gap-3 mt-4">
              {SECTIONS.map((sec, i) => (
                <div key={sec.key} className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-[9px]" style={{ color: sec.color }}>{sec.key}</span>
                    <span className="font-mono text-[9px]" style={{ color:'rgba(255,255,255,0.2)' }}>
                      {(sec.courses.length/TOTAL*100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background:'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width:0 }}
                      animate={inView?{width:`${sec.courses.length/TOTAL*100}%`}:{width:0}}
                      transition={{ duration:1, delay:0.3+i*0.1, ease:'easeOut' }}
                      style={{ height:'100%', borderRadius:9999, background:sec.color,
                               boxShadow:`0 0 8px ${sec.color}80` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Semester legend */}
            <div className="flex items-center gap-5 mt-3">
              <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color:'rgba(255,255,255,0.15)' }}>TL</span>
              {SEMS.map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <div style={{ width:6,height:6,borderRadius:'50%', background:SEM_C[s],
                                boxShadow: s==='S26'?`0 0 6px ${SEM_C[s]}`:'none' }} />
                  <span className="font-mono text-[9px]"
                    style={{ color: s==='S26'?SEM_C[s]:s==='F26'?SEM_C[s]:'rgba(255,255,255,0.25)' }}>
                    {SEM_L[s]}{s==='S26'?' ●':''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Column headers ─────────────────── */}
          <div className="flex items-center gap-3 px-4 py-2 border-b"
            style={{ background:'#04090f', borderColor:'rgba(255,255,255,0.04)' }}>
            <span className="font-mono text-[8px] uppercase tracking-widest w-4 text-right" style={{ color:'rgba(255,255,255,0.12)' }}>#</span>
            <span className="font-mono text-[8px] uppercase tracking-widest w-24" style={{ color:'rgba(255,255,255,0.15)' }}>TICKER</span>
            <span className="font-mono text-[8px] uppercase tracking-widest flex-1" style={{ color:'rgba(255,255,255,0.15)' }}>DESCRIPTION</span>
            <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color:'rgba(255,255,255,0.15)' }}>F24 S25 F25 S26 F26</span>
            <span className="font-mono text-[8px] uppercase tracking-widest w-14 text-right" style={{ color:'rgba(255,255,255,0.15)' }}>TERM</span>
          </div>

          {/* ── Course sections ─────────────────── */}
          <div style={{ background:'#020610' }}>
            {SECTIONS.map((sec, i) => (
              <Section key={sec.key} sec={sec} sectionIndex={i} inView={inView} />
            ))}

            {/* Footer row */}
            <motion.div
              initial={{ opacity:0 }} animate={inView?{opacity:1}:{opacity:0}}
              transition={{ delay:1.2 }}
              className="flex items-center gap-3 px-4 py-3 mt-1 border-t"
              style={{ borderColor:'rgba(255,255,255,0.05)' }}>
              <span className="font-mono text-[9px]" style={{ color:'rgba(255,255,255,0.15)' }}>
                END OF REPORT · {TOTAL} POSITIONS · ACTIVE TERM: SPR 2026 ·
              </span>
              <motion.span
                animate={{ opacity:[1,0,1] }} transition={{ duration:1, repeat:Infinity }}
                className="font-mono text-[9px]" style={{ color:'#00ff9f' }}>
                █
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
