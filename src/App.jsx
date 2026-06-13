import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tagline from './components/Tagline'
import SceneMountain from './components/SceneMountain'
import Bio from './components/Bio'
import SceneAurora from './components/SceneAurora'
import Skills from './components/Skills'
import Experience from './components/Experience'
import SceneOcean from './components/SceneOcean'
import Quote from './components/Quote'
import Projects from './components/Projects'
import Footer from './components/Footer'

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 200, pointerEvents: 'none' }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: 'linear-gradient(to right, #00ff9f, #00d4ff, #a78bfa)',
        boxShadow: '0 0 8px #00ff9f88',
        transition: 'width 0.08s linear',
      }} />
    </div>
  )
}

export default function App() {
  return (
    <div>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Tagline />
      <SceneMountain />
      <Bio />
      <SceneAurora />
      <Skills />
      <Experience />
      <SceneOcean />
      <Quote />
      <Projects />
      <Footer />
    </div>
  )
}
