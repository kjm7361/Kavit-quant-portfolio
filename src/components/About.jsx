import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

const facts = [
  ['Degree', 'B.S. Computer Science + B.S. Mathematics'],
  ['School', 'Pennsylvania State University'],
  ['GPA', '3.72 / 4.0'],
  ['Location', 'State College, PA'],
  ['Graduation', 'May 2028'],
  ['Focus', 'Quantitative Finance & Algorithmic Trading'],
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <Reveal>
        <p className="font-mono text-accent text-xs tracking-widest uppercase mb-2">// about</p>
        <h2 className="text-3xl font-bold text-txt mb-12">About Me</h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16">
        <Reveal delay={0.1}>
          <div className="space-y-5 text-muted text-sm leading-relaxed">
            <p>
              I'm a Computer Science and Mathematics dual-degree student at Penn State, passionate about the intersection of rigorous quantitative methods and real-world financial systems.
            </p>
            <p>
              My work spans statistical arbitrage, risk modeling, and full-stack quant platform development — I've built multi-strategy backtesting engines, options pricing tools, and live market microstructure simulations from scratch.
            </p>
            <p>
              Outside of markets, I'm interested in stochastic calculus, high-performance computing, and building tools that make research faster and more reproducible.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/kjm7361"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:underline"
              >
                → View GitHub Profile
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-card border border-border rounded-xl p-6 font-mono text-xs space-y-3">
            {facts.map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <span className="text-muted w-24 shrink-0">{k}</span>
                <span className="text-dim mr-2">·</span>
                <span className="text-txt">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
