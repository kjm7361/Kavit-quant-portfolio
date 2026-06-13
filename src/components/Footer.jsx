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

        <div className="flex items-center gap-6">
          <a href="mailto:kjm7361@psu.edu" className="text-white/50 hover:text-white text-sm font-sans transition-colors">
            kjm7361@psu.edu
          </a>
          <a href="https://github.com/kjm7361" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm font-sans transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/kavit-mandalaywala" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm font-sans transition-colors">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs font-sans">© 2025 Kavit Jay Mandalaywala · Built with React + Vite + Tailwind CSS</p>
      </div>
    </footer>
  )
}
