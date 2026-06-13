import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, CartesianGrid, Tooltip,
} from 'recharts'

/* ── data generators ─────────────────────────── */
function genEquity(n = 80) {
  let v = 100
  return Array.from({ length: n }, (_, i) => {
    v *= 1 + (Math.random() - 0.44) * 0.022
    return { i, v: +v.toFixed(2) }
  })
}

function genCandles(n = 36) {
  let price = 420
  return Array.from({ length: n }, (_, i) => {
    const open  = price
    const move  = (Math.random() - 0.46) * 6
    const close = +(open + move).toFixed(2)
    const high  = +(Math.max(open, close) + Math.random() * 3).toFixed(2)
    const low   = +(Math.min(open, close) - Math.random() * 3).toFixed(2)
    price = close
    return { i, open, close, high, low, up: close >= open }
  })
}

/* ── ticker strip ────────────────────────────── */
const TICKERS = [
  { s: 'SPY',    p: '589.23', d: '+0.82%', up: true  },
  { s: 'QQQ',    p: '502.14', d: '+1.14%', up: true  },
  { s: 'NVDA',   p: '131.50', d: '+2.33%', up: true  },
  { s: 'AAPL',   p: '219.86', d: '-0.41%', up: false },
  { s: 'BTC',    p: '104,200',d: '+1.89%', up: true  },
  { s: 'GLD',    p: '241.50', d: '+0.23%', up: true  },
  { s: 'VIX',    p: '14.82',  d: '-3.21%', up: false },
  { s: 'MSFT',   p: '430.12', d: '+0.67%', up: true  },
  { s: 'IWM',    p: '222.34', d: '-0.18%', up: false },
]

function TickerStrip() {
  const items = [...TICKERS, ...TICKERS, ...TICKERS]
  return (
    <div
      className="w-full h-9 overflow-hidden flex items-center border-b"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center animate-[ticker_28s_linear_infinite] whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="font-mono text-xs mx-5 flex items-center gap-1.5 flex-shrink-0">
            <span className="text-white/70 font-semibold">{t.s}</span>
            <span className="text-white/40">{t.p}</span>
            <span style={{ color: t.up ? '#00ff9f' : '#ef4444' }}>{t.d}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── custom candlestick SVG ──────────────────── */
function CandleChart({ data }) {
  const W = 100, H = 100
  const prices = data.flatMap(d => [d.high, d.low])
  const minP = Math.min(...prices), maxP = Math.max(...prices)
  const scaleY = v => H - ((v - minP) / (maxP - minP)) * H
  const bw = (W / data.length) * 0.55
  const gap = W / data.length

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
      {/* Grid */}
      {[0.25, 0.5, 0.75].map(f => (
        <line key={f} x1="0" x2={W} y1={H * f} y2={H * f}
          stroke="rgba(255,255,255,0.05)" strokeWidth="0.4" />
      ))}
      {data.map((d, i) => {
        const x   = i * gap + gap / 2
        const y1  = scaleY(d.high)
        const y2  = scaleY(d.low)
        const top = scaleY(Math.max(d.open, d.close))
        const bot = scaleY(Math.min(d.open, d.close))
        const fill = d.up ? '#00ff9f' : '#ef4444'
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y1} y2={y2} stroke={fill} strokeWidth="0.5" opacity="0.7" />
            <rect x={x - bw / 2} y={top} width={bw} height={Math.max(bot - top, 0.4)}
              fill={fill} opacity="0.85" />
          </g>
        )
      })}
    </svg>
  )
}

/* ── main component ──────────────────────────── */
export default function Hero() {
  const equity  = useRef(genEquity()).current
  const candles = useRef(genCandles()).current

  return (
    <section id="hero" className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

      {/* CSS keyframe for ticker */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0) }
          to   { transform: translateX(-33.333%) }
        }
      `}</style>

      {/* ── top ticker ───────────────────────── */}
      <TickerStrip />

      {/* ── mid: charts + name ───────────────── */}
      <div className="flex-1 flex items-center min-h-0">

        {/* Left: equity curve */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full flex flex-col justify-center px-4 md:px-8"
          style={{ width: '38%' }}
        >
          <div className="text-white/25 font-mono text-[9px] tracking-widest uppercase mb-1 ml-1">
            Equity Curve · Momentum Strategy
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equity} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <defs>
                  <linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#00ff9f" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00ff9f" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" />
                <Tooltip
                  contentStyle={{ background: '#111', border: '1px solid #222', fontFamily: 'monospace', fontSize: 10 }}
                  itemStyle={{ color: '#00ff9f' }}
                  formatter={v => [`$${v.toFixed(0)}`, 'NAV']}
                />
                <Area
                  type="monotone" dataKey="v"
                  stroke="#00ff9f" strokeWidth={1.6}
                  fill="url(#gGrad)" dot={false} isAnimationActive
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 ml-1">
            {[['CAGR', '+28.4%', '#00ff9f'], ['Sharpe', '1.84', '#fff'], ['Max DD', '−6.2%', '#ef4444']].map(([k, v, c]) => (
              <div key={k}>
                <div className="font-mono text-[10px]" style={{ color: c }}>{v}</div>
                <div className="font-mono text-[9px] text-white/30">{k}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center: name */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          >
            <div
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textShadow: '0 0 80px rgba(0,255,159,0.4)',
              }}
            >
              Kavit Jay
            </div>
            <div
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.1rem, 2.8vw, 3rem)',
                fontWeight: 700,
                color: '#00ff9f',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                textShadow: '0 0 40px rgba(0,255,159,0.5)',
              }}
            >
              Mandalaywala
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-5 flex flex-col items-center gap-2"
          >
            <div
              className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{ height: 32 }}
            />
            <p className="font-mono text-[10px] text-white/35 tracking-widest uppercase">
              CS · Mathematics · Penn State '28
            </p>
            <div className="flex gap-3 mt-3">
              <a
                href="https://github.com/kjm7361"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] px-3 py-1.5 border rounded-full text-white/50 hover:text-white hover:border-white/50 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                GitHub
              </a>
              <a
                href="mailto:kjm7361@psu.edu"
                className="font-mono text-[10px] px-3 py-1.5 border rounded-full text-white/50 hover:text-white hover:border-white/50 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: candlestick chart */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full flex flex-col justify-center px-4 md:px-8"
          style={{ width: '38%' }}
        >
          <div className="text-white/25 font-mono text-[9px] tracking-widest uppercase mb-1 text-right mr-1">
            NVDA · Candlestick · 1D
          </div>
          <div style={{ height: 220 }}>
            <CandleChart data={candles} />
          </div>
          <div className="mt-2 flex gap-4 justify-end mr-1">
            {[['Win Rate', '58.3%', '#00ff9f'], ['Beta', '1.12', '#fff'], ['Alpha', '+9.4%', '#60a5fa']].map(([k, v, c]) => (
              <div key={k} className="text-right">
                <div className="font-mono text-[10px]" style={{ color: c }}>{v}</div>
                <div className="font-mono text-[9px] text-white/30">{k}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── bottom bar ───────────────────────── */}
      <div
        className="h-9 border-t flex items-center justify-center gap-8 flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        {[
          ['GPA', '3.72 / 4.0'],
          ['Strategies', '8 Live'],
          ['Backtests', '500+'],
          ['Languages', 'Python · C++ · R · SQL'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 font-mono text-[10px]">
            <span className="text-white/25 uppercase tracking-wider">{k}</span>
            <span className="text-white/55">{v}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
