import { useEffect, useState } from 'react';

export default function HeaderNav({ solid, currentPage, onNavigate, accent = '#00E5FF' }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPage]);

  const Link = ({ to, children }) => (
    <button
      onClick={() => onNavigate(to)}
      className={`relative px-3 py-2 text-sm font-semibold tracking-wide transition ${
        currentPage === to ? 'text-white' : 'text-white/70 hover:text-white'
      }`}
    >
      <span className="relative">
        {children}
        {currentPage === to && (
          <span className="absolute -bottom-1 left-0 right-0 h-[2px]" style={{ background: accent }} />
        )}
      </span>
    </button>
  );

  return (
    <header
      className={`fixed top-0 z-30 w-full transition-colors ${
        solid ? 'bg-[#121212] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]' : 'bg[rgba(18,18,18,0.7)]'
      } backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-white/5`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <button onClick={() => onNavigate('home')} className="group flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md bg-gradient-to-br from-cyan-400/30 to-cyan-600/10 ring-1 ring-white/10"
            style={{ boxShadow: `0 0 0 1px ${accent}20 inset, 0 0 24px ${accent}22` }}
          />
          <span className="font-extrabold tracking-wide text-white">Your Name</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <Link to="home">Home</Link>
          <Link to="games">Games</Link>
          <Link to="music">Music</Link>
          <Link to="reviews">Reviews</Link>
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen((p) => !p)} aria-label="Toggle menu">
          <div className="h-6 w-6 text-white">☰</div>
        </button>
      </div>
      {isOpen && (
        <div className="mx-auto block max-w-6xl px-4 pb-4 md:hidden">
          <div className="flex flex-col rounded-xl border border-white/10 bg-black/30 p-2">
            <Link to="home">Home</Link>
            <Link to="games">Games</Link>
            <Link to="music">Music</Link>
            <Link to="reviews">Reviews</Link>
          </div>
        </div>
      )}
    </header>
  );
}
