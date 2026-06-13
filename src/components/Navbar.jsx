import { useState, useEffect } from 'react'

export default function Navbar() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
      style={{ background: solid ? 'rgba(0,0,0,0.95)' : 'transparent', backdropFilter: solid ? 'blur(8px)' : 'none', transition: 'background 0.3s' }}
    >
      {/* Name */}
      <span className="font-sans text-white font-semibold text-base tracking-tight">
        Kavit Mandalaywala
      </span>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#experience" className="text-white/80 hover:text-white text-sm font-sans transition-colors">Experience</a>
        <a href="#projects" className="text-white/80 hover:text-white text-sm font-sans transition-colors">Projects</a>
        <a href="#skills" className="text-white/80 hover:text-white text-sm font-sans transition-colors">Skills</a>
        <a href="mailto:kjm7361@psu.edu" className="text-white/80 hover:text-white text-sm font-sans transition-colors">Contact</a>
        <a href="https://linkedin.com/in/kavit-mandalaywala" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-sm font-sans transition-colors">LinkedIn</a>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-sans px-4 py-1.5 rounded-full transition-colors"
        >
          Download My Resume
        </a>
        <a
          href="mailto:kjm7361@psu.edu"
          className="inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white text-sm font-sans px-4 py-1.5 rounded-full transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
