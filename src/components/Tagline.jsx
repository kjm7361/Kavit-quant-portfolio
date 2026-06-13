import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ── tiny equity SVG for macbook screen ─────── */
function MiniChart() {
  const pts = [0,8,5,14,10,7,15,18,20,12,25,22,30,17,35,28,40,24,45,33,50,29,55,38,60,35,65,44,70,40,75,50,80,46,90,56,100,52]
  let path = ''
  for (let i = 0; i < pts.length; i += 2) path += `${i === 0 ? 'M' : 'L'}${pts[i]},${60 - pts[i+1]} `
  const fill = path + `L100,60 L0,60 Z`
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#00ff9f" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00ff9f" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#mg)" />
      <path d={path}  fill="none" stroke="#00ff9f" strokeWidth="1.2" />
    </svg>
  )
}

/* ── blinking cursor ─────────────────────────── */
function Cursor() {
  const [on, setOn] = useState(true)
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 530); return () => clearInterval(t) }, [])
  return <span style={{ color: '#00ff9f', opacity: on ? 1 : 0 }}>█</span>
}

/* ── typewriter lines ────────────────────────── */
const LINES = [
  { t: '$ python3 backtest.py --strategy momentum', c: '#9ca3af' },
  { t: 'Loading universe: 500 stocks ............', c: '#4b5563' },
  { t: '✓  Sharpe Ratio   1.84', c: '#00ff9f' },
  { t: '✓  CAGR           +28.4%', c: '#00ff9f' },
  { t: '✓  Max Drawdown   -6.2%', c: '#f87171' },
  { t: '✓  Win Rate        58.3%', c: '#60a5fa' },
  { t: '$ _', c: '#9ca3af' },
]

/* ── macbook component ───────────────────────── */
function MacBook() {
  return (
    <div className="relative mx-auto select-none" style={{ maxWidth: 680 }}>
      {/* ── lid / screen ─ */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: '#1c2030',
          border: '3px solid #2e3350',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
          aspectRatio: '16/10',
        }}
      >
        {/* camera notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
          style={{ width: 72, height: 18, background: '#1c2030', borderRadius: '0 0 10px 10px' }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2a3050' }} />
        </div>

        {/* screen glass */}
        <div className="absolute inset-0 rounded-xl" style={{ padding: 10 }}>
          <div className="w-full h-full rounded-lg overflow-hidden flex flex-col" style={{ background: '#060a14' }}>

            {/* macOS title bar */}
            <div
              className="flex items-center gap-1.5 px-3 flex-shrink-0"
              style={{ height: 28, background: '#0d1220', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                quant-terminal — python3
              </span>
            </div>

            {/* content area */}
            <div className="flex flex-1 min-h-0 gap-0">
              {/* left: chart */}
              <div className="flex flex-col p-2" style={{ width: '55%', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 7, fontFamily: 'monospace', marginBottom: 4, letterSpacing: '0.08em' }}>
                  EQUITY CURVE · MOMENTUM
                </div>
                <div className="flex-1">
                  <MiniChart />
                </div>
                {/* stats row */}
                <div className="flex gap-3 mt-1">
                  {[['SPY','589.23','+0.82%','#00ff9f'],['QQQ','502.14','+1.14%','#00ff9f'],['VIX','14.82','-3.21%','#f87171']].map(([s,p,d,c]) => (
                    <div key={s} style={{ fontFamily: 'monospace', fontSize: 7 }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>{s} </span>
                      <span style={{ color: '#fff' }}>{p} </span>
                      <span style={{ color: c }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* right: terminal */}
              <div className="flex-1 p-2 flex flex-col gap-0.5 overflow-hidden">
                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 7, fontFamily: 'monospace', marginBottom: 4, letterSpacing: '0.08em' }}>
                  TERMINAL OUTPUT
                </div>
                {LINES.map((l, i) => (
                  <div key={i} style={{ fontFamily: 'monospace', fontSize: 8, color: l.c, lineHeight: 1.6, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {i === LINES.length - 1 ? <>$ <Cursor /></> : l.t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── base / hinge ─ */}
      <div
        style={{
          height: 14,
          background: 'linear-gradient(to bottom, #1a1d2e, #141626)',
          borderRadius: '0 0 6px 6px',
          margin: '0 10px',
          borderTop: '2px solid #252840',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
        }}
      />
      {/* foot */}
      <div
        style={{
          height: 4,
          background: '#101220',
          borderRadius: '0 0 16px 16px',
          margin: '0 30px',
        }}
      />
    </div>
  )
}

/* ── section ─────────────────────────────────── */
export default function Tagline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section className="bg-white py-24 px-6 text-center overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -70 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.6rem, 6.5vw, 6.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            background: 'linear-gradient(180deg, #312e81 0%, #6d28d9 40%, #a855f7 70%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          CS &amp; Mathematics<br />
          Student at<br />
          Pennsylvania State University
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        className="mt-16"
      >
        <MacBook />
      </motion.div>
    </section>
  )
}
