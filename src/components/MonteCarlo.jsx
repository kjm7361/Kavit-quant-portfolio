import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'

const STEPS = 120
const N     = 48
const W     = 520
const H     = 240

function rndWalk(steps, drift = 0.00045, vol = 0.014) {
  let v = 100
  return Array.from({ length: steps }, () => {
    v = +(v * (1 + drift + vol * (Math.random() * 2 - 1))).toFixed(3)
    return v
  })
}

function pct(arr2d, p) {
  return Array.from({ length: STEPS }, (_, i) => {
    const col = [...arr2d.map(r => r[i])].sort((a, b) => a - b)
    return col[Math.floor(col.length * p)]
  })
}

export default function MonteCarlo() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  const paths = useMemo(() => Array.from({ length: N }, () => rndWalk(STEPS)), [])

  const allV  = paths.flat()
  const minV  = Math.min(...allV) * 0.97
  const maxV  = Math.max(...allV) * 1.03

  const toX = i => (i / (STEPS - 1)) * W
  const toY = v => H - ((v - minV) / (maxV - minV)) * H
  const toD = pts => pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')

  const median = pct(paths, 0.5)
  const p10    = pct(paths, 0.10)
  const p90    = pct(paths, 0.90)

  const band = [
    ...p90.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`),
    ...[...p10].reverse().map((v, i) => `L${toX(STEPS - 1 - i).toFixed(1)},${toY(v).toFixed(1)}`),
    'Z',
  ].join(' ')

  const finals   = paths.map(p => p[STEPS - 1])
  const avgFinal = finals.reduce((a, b) => a + b) / N
  const pPos     = (finals.filter(v => v > 100).length / N * 100).toFixed(0)
  const expRet   = ((avgFinal / 100 - 1) * 100).toFixed(1)
  const ci95lo   = ((pct(paths, 0.025)[STEPS - 1] / 100 - 1) * 100).toFixed(1)
  const ci95hi   = ((pct(paths, 0.975)[STEPS - 1] / 100 - 1) * 100).toFixed(1)

  return (
    <section
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #030710 0%, #04090f 60%, #020608 100%)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(0,255,159,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Glow behind chart */}
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 350, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,255,159,0.06) 0%, transparent 70%)',
        top: '50%', left: '35%', transform: 'translate(-50%,-50%)',
        filter: 'blur(20px)',
      }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: 'rgba(0,255,159,0.5)' }}>
            ✦ &nbsp; Quantitative Research &nbsp; ✦
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 0 60px rgba(0,255,159,0.25)',
          }}>
            Monte Carlo<br />Simulation Engine
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="rounded-2xl overflow-hidden" style={{
              background: 'rgba(0,255,159,0.02)',
              border: '1px solid rgba(0,255,159,0.1)',
              padding: '1.5rem',
            }}>
              <div className="font-mono text-[10px] text-white/25 tracking-widest uppercase mb-3">
                {N} simulated equity paths · 252 trading days · μ = 0.045% / day
              </div>

              <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                style={{ width: '100%', height: 260, display: 'block' }}
              >
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map(f => (
                  <line key={f}
                    x1={0} x2={W} y1={H * f} y2={H * f}
                    stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
                  />
                ))}
                {[0.25, 0.5, 0.75].map(f => (
                  <line key={f}
                    x1={W * f} x2={W * f} y1={0} y2={H}
                    stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
                  />
                ))}

                {/* Baseline */}
                <line x1={0} x2={W} y1={toY(100)} y2={toY(100)}
                  stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" strokeDasharray="4 4" />

                {/* CI band */}
                <motion.path
                  d={band}
                  fill="rgba(0,255,159,0.05)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />

                {/* Individual paths */}
                {paths.map((pts, idx) => (
                  <motion.path
                    key={idx}
                    d={toD(pts)}
                    fill="none"
                    stroke={finals[idx] > 100 ? 'rgba(0,200,120,0.18)' : 'rgba(239,68,68,0.14)'}
                    strokeWidth="0.7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.6, delay: 0.3 + (idx % 12) * 0.04, ease: 'easeInOut' }}
                  />
                ))}

                {/* Median path — glowing green */}
                <motion.path
                  d={toD(median)}
                  fill="none"
                  stroke="#00ff9f"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 0 4px #00ff9f)' }}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
                />

                {/* End dot on median */}
                <motion.circle
                  cx={toX(STEPS - 1)}
                  cy={toY(median[STEPS - 1])}
                  r="4"
                  fill="#00ff9f"
                  style={{ filter: 'drop-shadow(0 0 6px #00ff9f)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 2.6 }}
                />
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 px-1">
                {['Day 0', 'Day 30', 'Day 60', 'Day 90', 'Day 120'].map(l => (
                  <span key={l} className="font-mono text-[9px] text-white/20">{l}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats terminal */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="rounded-2xl overflow-hidden" style={{
              background: '#060d18',
              border: '1px solid rgba(0,255,159,0.12)',
            }}>
              {/* Terminal titlebar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: 'rgba(0,255,159,0.08)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
                <span className="ml-2 font-mono text-[10px] text-white/25">sim_output.py</span>
              </div>

              <div className="p-5 font-mono text-xs space-y-4">
                {[
                  { key: 'Simulations',    val: '10,000',         color: '#fff' },
                  { key: 'Horizon',        val: '252 days',        color: '#fff' },
                  { key: 'E[Return]',      val: `+${expRet}%`,    color: '#00ff9f' },
                  { key: 'P(positive)',    val: `${pPos}%`,        color: '#00ff9f' },
                  { key: '95% CI',         val: `[${ci95lo}%, ${ci95hi}%]`, color: '#60a5fa' },
                  { key: 'μ (daily)',      val: '0.045%',          color: '#a78bfa' },
                  { key: 'σ (daily)',      val: '1.40%',           color: '#f87171' },
                ].map(({ key, val, color }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                    className="flex justify-between items-center"
                  >
                    <span style={{ color: 'rgba(255,255,255,0.35)' }}>{key}</span>
                    <span style={{ color }} className="font-bold">{val}</span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.4 }}
                  className="pt-3 border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <span style={{ color: '#00ff9f' }}>▶</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}> simulation complete</span>
                  <span className="inline-block w-1.5 h-3 ml-1 align-middle"
                    style={{ background: '#00ff9f', animation: 'pulse 1s ease-in-out infinite' }} />
                </motion.div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-col gap-2 px-1">
              {[
                { color: '#00ff9f', label: 'Median path', bold: true },
                { color: 'rgba(0,200,120,0.5)', label: 'Positive outcomes' },
                { color: 'rgba(239,68,68,0.4)',  label: 'Negative outcomes' },
              ].map(({ color, label, bold }) => (
                <div key={label} className="flex items-center gap-2">
                  <div style={{ width: 24, height: 2, background: color, borderRadius: 1 }} />
                  <span className="font-mono text-[10px]"
                    style={{ color: bold ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
