import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Box-Muller standard normal ──────────────── */
function randn() {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/* ── GBM simulation ──────────────────────────── */
function runGBM(s0, mu, sigma, days, nPaths) {
  const dt = 1 / 252
  return Array.from({ length: nPaths }, () => {
    const path = [s0]
    for (let t = 1; t <= days; t++) {
      const prev = path[t - 1]
      path.push(prev * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * randn()))
    }
    return path
  })
}

/* ── Slider input ────────────────────────────── */
function Param({ label, value, min, max, step, onChange, fmt }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
        <span className="font-mono text-xs font-bold" style={{ color: '#00ff9f' }}>{fmt ? fmt(value) : value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00ff9f ${((value-min)/(max-min))*100}%, rgba(255,255,255,0.1) 0%)`,
          outline: 'none',
        }}
      />
    </div>
  )
}

/* ── SVG Chart ───────────────────────────────── */
const VW = 800, VH = 280
const PAD = { t: 16, r: 16, b: 36, l: 52 }
const CW = VW - PAD.l - PAD.r
const CH = VH - PAD.t - PAD.b

function Chart({ paths, clipX, mean }) {
  if (!paths.length) return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ height: 280 }}>
      <text x={VW/2} y={VH/2} textAnchor="middle" fontFamily="monospace" fontSize="12"
        fill="rgba(255,255,255,0.2)">
        Configure parameters and click Run Simulation
      </text>
    </svg>
  )

  const days  = paths[0].length - 1
  const allV  = paths.flat()
  const minV  = Math.min(...allV)
  const maxV  = Math.max(...allV)
  const rangeV = maxV - minV || 1

  const toX = t => PAD.l + (t / days) * CW
  const toY = v => PAD.t + CH - ((v - minV) / rangeV) * CH

  const toLine = pts => pts.map((v, t) => `${t === 0 ? 'M' : 'L'}${toX(t).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')

  // Y grid
  const yTicks = Array.from({ length: 5 }, (_, i) => minV + (rangeV / 4) * i)
  // X grid
  const xTicks = Array.from({ length: 6 }, (_, i) => Math.round(days / 5 * i))

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ height: 280 }}>
      <defs>
        <clipPath id="chartClip">
          <rect x={PAD.l} y={0} width={clipX} height={VH} />
        </clipPath>
      </defs>

      {/* Y grid + labels */}
      {yTicks.map((v, i) => (
        <g key={i}>
          <line x1={PAD.l} x2={PAD.l + CW} y1={toY(v)} y2={toY(v)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 5" />
          <text x={PAD.l - 6} y={toY(v) + 4} textAnchor="end"
            fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.2)">
            ${v.toFixed(0)}
          </text>
        </g>
      ))}

      {/* X grid + labels */}
      {xTicks.map((t, i) => (
        <g key={i}>
          <line x1={toX(t)} x2={toX(t)} y1={PAD.t} y2={PAD.t + CH}
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 5" />
          <text x={toX(t)} y={PAD.t + CH + 16} textAnchor="middle"
            fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.2)">
            {t}d
          </text>
        </g>
      ))}

      {/* Axes */}
      <line x1={PAD.l} x2={PAD.l + CW} y1={PAD.t + CH} y2={PAD.t + CH} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={PAD.t + CH} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      {/* Individual paths */}
      <g clipPath="url(#chartClip)">
        {paths.map((pts, i) => (
          <path key={i} d={toLine(pts)} fill="none"
            stroke={pts[pts.length-1] >= pts[0] ? 'rgba(96,165,250,0.18)' : 'rgba(239,68,68,0.14)'}
            strokeWidth="0.8" />
        ))}

        {/* Mean path */}
        {mean.length > 0 && (
          <path d={toLine(mean)} fill="none"
            stroke="#00ff9f" strokeWidth="2.2"
            style={{ filter: 'drop-shadow(0 0 4px #00ff9f)' }}
          />
        )}
      </g>

      {/* Start dot */}
      {paths.length > 0 && (
        <circle cx={toX(0)} cy={toY(paths[0][0])} r="3" fill="#00ff9f"
          style={{ filter: 'drop-shadow(0 0 4px #00ff9f)' }} />
      )}

      {/* End dot on mean */}
      {mean.length > 0 && clipX >= CW * 0.98 && (
        <circle cx={toX(days)} cy={toY(mean[days])} r="4" fill="#00ff9f"
          style={{ filter: 'drop-shadow(0 0 6px #00ff9f)' }} />
      )}
    </svg>
  )
}

/* ── Histogram ───────────────────────────────── */
function Histogram({ finals, color }) {
  if (!finals.length) return null
  const BINS = 20
  const min = Math.min(...finals), max = Math.max(...finals)
  const bw = (max - min) / BINS
  const counts = Array(BINS).fill(0)
  finals.forEach(v => {
    const b = Math.min(Math.floor((v - min) / bw), BINS - 1)
    counts[b]++
  })
  const maxC = Math.max(...counts)
  const W = 400, H = 80

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }}>
      {counts.map((c, i) => {
        const bH = (c / maxC) * (H - 20)
        const x = (i / BINS) * (W - 20) + 10
        const bW = ((W - 20) / BINS) - 2
        const isAbove = (min + bw * (i + 0.5)) >= finals[0] / finals[0] * min
        return (
          <motion.rect
            key={i}
            x={x} y={H - 20 - bH} width={bW} height={bH}
            fill={color} opacity={0.5} rx="1"
            initial={{ height: 0, y: H - 20 }}
            animate={{ height: bH, y: H - 20 - bH }}
            transition={{ duration: 0.6, delay: i * 0.02, ease: 'easeOut' }}
          />
        )
      })}
      <line x1={10} x2={W - 10} y1={H - 20} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x={10} y={H - 6} fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.2)">${min.toFixed(0)}</text>
      <text x={W - 10} y={H - 6} textAnchor="end" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.2)">${max.toFixed(0)}</text>
    </svg>
  )
}

/* ── Main component ──────────────────────────── */
export default function MonteCarloLab() {
  const sectionRef = useRef(null)
  const inView     = useInView(sectionRef, { once: false, margin: '-80px' })

  const [s0,     setS0]     = useState(100)
  const [mu,     setMu]     = useState(0.08)
  const [sigma,  setSigma]  = useState(0.20)
  const [days,   setDays]   = useState(252)
  const [nPaths, setNPaths] = useState(40)

  const [paths,  setPaths]  = useState([])
  const [mean,   setMean]   = useState([])
  const [finals, setFinals] = useState([])
  const [clipX,  setClipX]  = useState(0)
  const [running, setRunning] = useState(false)
  const rafRef = useRef(null)

  const runSim = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setRunning(true)
    setClipX(0)

    const computed = runGBM(s0, mu, sigma, days, nPaths)
    const meanPath = Array.from({ length: days + 1 }, (_, t) => {
      const sum = computed.reduce((s, p) => s + p[t], 0)
      return sum / nPaths
    })
    const endPrices = computed.map(p => p[days])

    setPaths(computed)
    setMean(meanPath)
    setFinals(endPrices)

    // Animate clip from 0 → CW
    const duration = 2200
    const start = Date.now()
    const animate = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      setClipX(eased * CW)
      if (t < 1) rafRef.current = requestAnimationFrame(animate)
      else setRunning(false)
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [s0, mu, sigma, days, nPaths])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  // Stats
  const meanEnd = finals.length ? finals.reduce((a,b)=>a+b,0)/finals.length : 0
  const stdEnd  = finals.length ? Math.sqrt(finals.reduce((s,v)=>s+(v-meanEnd)**2,0)/finals.length) : 0
  const pPos    = finals.length ? (finals.filter(v=>v>=s0).length/finals.length*100).toFixed(1) : '—'

  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: '#020509' }}>
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:'radial-gradient(rgba(0,255,159,0.05) 1px,transparent 1px)',
        backgroundSize:'28px 28px',
      }} />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background:'radial-gradient(ellipse at 50% 30%, rgba(0,255,159,0.07) 0%, transparent 60%)',
      }} />

      <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, x:-50 }}
          animate={inView ? { opacity:1, x:0 } : { opacity:0, x:-50 }}
          transition={{ duration:0.7 }}
          className="mb-10"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color:'rgba(0,255,159,0.5)' }}>
            ✦ &nbsp; Quantitative Research &nbsp; ✦
          </p>
          <h2 style={{
            fontFamily:'"Playfair Display",Georgia,serif',
            fontSize:'clamp(2rem,5vw,3.5rem)',
            fontWeight:700, color:'#fff', lineHeight:1.1,
            textShadow:'0 0 60px rgba(0,255,159,0.25)',
          }}>
            Monte Carlo Simulation Lab
          </h2>
          <p className="font-mono text-xs mt-2" style={{ color:'rgba(255,255,255,0.25)' }}>
            Geometric Brownian Motion · S(t+Δt) = S(t) · exp((μ − σ²/2)Δt + σ√Δt · Z)
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={inView ? { opacity:1, y:0 } : { opacity:0, y:40 }}
          transition={{ duration:0.7, delay:0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 40px 80px rgba(0,0,0,0.6)' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3"
            style={{ background:'#0a0e18', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <div style={{width:9,height:9,borderRadius:'50%',background:'#ff5f56'}}/>
            <div style={{width:9,height:9,borderRadius:'50%',background:'#ffbd2e'}}/>
            <div style={{width:9,height:9,borderRadius:'50%',background:'#27c93f'}}/>
            <span className="ml-3 font-mono text-[10px]" style={{ color:'rgba(255,255,255,0.2)' }}>
              gbm_simulator.py
            </span>
            {running && (
              <span className="ml-auto font-mono text-[10px] flex items-center gap-1.5" style={{ color:'#00ff9f' }}>
                <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }}>●</motion.span>
                RUNNING
              </span>
            )}
          </div>

          {/* Params panel */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-6 py-5 border-b"
            style={{ background:'#05090f', borderColor:'rgba(255,255,255,0.05)' }}>
            <Param label="Start Price S₀" value={s0} min={10} max={500} step={5} onChange={setS0} fmt={v=>`$${v}`} />
            <Param label="Drift μ (annual)" value={mu} min={-0.5} max={1} step={0.01} onChange={setMu} fmt={v=>`${(v*100).toFixed(0)}%`} />
            <Param label="Volatility σ" value={sigma} min={0.01} max={1} step={0.01} onChange={setSigma} fmt={v=>`${(v*100).toFixed(0)}%`} />
            <Param label="Horizon (days)" value={days} min={21} max={504} step={21} onChange={setDays} fmt={v=>`${v}d`} />
            <Param label="Paths N" value={nPaths} min={5} max={100} step={5} onChange={setNPaths} fmt={v=>`${v}`} />
          </div>

          {/* Chart */}
          <div className="px-4 pt-4" style={{ background:'#020610' }}>
            <Chart paths={paths} clipX={clipX} mean={mean} />
          </div>

          {/* Stats + histogram */}
          <div className="grid md:grid-cols-2 gap-0 border-t" style={{ background:'#020610', borderColor:'rgba(255,255,255,0.05)' }}>
            {/* Stats */}
            <div className="px-6 py-5 border-r" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
              <p className="font-mono text-[9px] uppercase tracking-widest mb-4" style={{ color:'rgba(255,255,255,0.2)' }}>
                Simulation Output
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { k:'Mean Final Price', v: finals.length ? `$${meanEnd.toFixed(2)}` : '—', c:'#00ff9f' },
                  { k:'Std Deviation',    v: finals.length ? `$${stdEnd.toFixed(2)}`  : '—', c:'#60a5fa' },
                  { k:'P(S_T ≥ S₀)',     v: finals.length ? `${pPos}%`               : '—', c:'#a78bfa' },
                  { k:'Expected Return',  v: finals.length ? `${((meanEnd/s0-1)*100).toFixed(1)}%` : '—', c:'#34d399' },
                ].map(({ k, v, c }) => (
                  <div key={k}>
                    <div className="font-mono text-lg font-black" style={{ color:c }}>{v}</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color:'rgba(255,255,255,0.2)' }}>{k}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Histogram */}
            <div className="px-6 py-5">
              <p className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color:'rgba(255,255,255,0.2)' }}>
                Distribution of Final Prices
              </p>
              {finals.length
                ? <Histogram finals={finals} color="#00ff9f" />
                : <div className="font-mono text-[10px]" style={{ color:'rgba(255,255,255,0.1)' }}>Run simulation to see distribution</div>
              }
            </div>
          </div>

          {/* Run button */}
          <div className="px-6 py-4 flex items-center justify-between border-t" style={{ background:'#050a12', borderColor:'rgba(255,255,255,0.05)' }}>
            <span className="font-mono text-[10px]" style={{ color:'rgba(255,255,255,0.15)' }}>
              {paths.length ? `${nPaths} paths · ${days} steps · computed client-side` : 'Ready'}
            </span>
            <button
              onClick={runSim}
              disabled={running}
              className="font-mono text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
              style={{
                background: running ? 'rgba(0,255,159,0.1)' : 'linear-gradient(135deg, #00ff9f, #00d4ff)',
                color: running ? '#00ff9f' : '#000',
                border: running ? '1px solid rgba(0,255,159,0.3)' : 'none',
                boxShadow: running ? 'none' : '0 0 30px rgba(0,255,159,0.4)',
                cursor: running ? 'not-allowed' : 'pointer',
                transform: running ? 'none' : undefined,
              }}
              onMouseEnter={e => { if (!running) e.currentTarget.style.transform='scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='none' }}
            >
              {running ? '⟳ Simulating…' : '▶ Run Simulation'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider thumb style */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #00ff9f;
          box-shadow: 0 0 6px #00ff9f;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #00ff9f;
          box-shadow: 0 0 6px #00ff9f;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
