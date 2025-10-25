export default function Footer({ accent = '#00E5FF' }) {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#0E0E0E]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-white">About Me</div>
          <p className="mt-2 text-sm text-white/60">Multi-disciplinary creator crafting interactive games, immersive music, and thoughtful criticism.</p>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Links</div>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <a className="text-white/70 hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <a className="text-white/70 hover:text-white" href="https://open.spotify.com/" target="_blank" rel="noreferrer">Spotify</a>
            <a className="text-white/70 hover:text-white" href="https://letterboxd.com/" target="_blank" rel="noreferrer">Letterboxd</a>
            <a className="text-white/70 hover:text-white" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="flex items-end md:items-center md:justify-end">
          <div className="text-xs text-white/50">© {new Date().getFullYear()} Your Name. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
