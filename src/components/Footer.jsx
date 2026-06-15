function GithubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div
            className="text-white font-semibold text-xl mb-1"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Kavit Jay Mandalaywala
          </div>
          <div className="text-white/40 text-sm font-sans">Penn State CS + Mathematics '28 · State College, PA</div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-1 text-right">
            <a href="mailto:mandalaywalakaveet@gmail.com" className="text-white/50 hover:text-white text-sm font-sans transition-colors">
              mandalaywalakaveet@gmail.com
            </a>
            <a href="tel:+18149969325" className="text-white/50 hover:text-white text-sm font-sans transition-colors">
              +1 814-996-9325
            </a>
          </div>
          <a
            href="https://github.com/kjm7361"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: '#8894a8' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#8894a8'}
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://linkedin.com/in/kavit-mandalaywala"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: '#8894a8' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#8894a8'}
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs font-sans">© 2025 Kavit Jay Mandalaywala · Built with React + Vite + Tailwind CSS</p>
      </div>
    </footer>
  )
}
