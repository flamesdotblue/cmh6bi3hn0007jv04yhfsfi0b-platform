import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function HeaderNav({ solid, accent = '#C0A062' }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const linkBase = 'relative px-3 py-2 text-sm font-semibold tracking-wide transition';

  return (
    <header
      className={`fixed top-0 z-30 w-full transition-colors ${
        solid ? 'bg-[#121212] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]' : 'bg-[rgba(18,18,18,0.7)]'
      } backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-white/5`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="group flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md bg-gradient-to-br from-yellow-400/20 to-yellow-900/10 ring-1 ring-white/10"
            style={{ boxShadow: `0 0 0 1px ${accent}20 inset, 0 0 24px ${accent}22` }}
          />
          <span className="font-extrabold tracking-wide text-white font-manrope">Avery Cole</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: '/', label: 'Home' },
            { to: '/games', label: 'Games' },
            { to: '/music', label: 'Music' },
            { to: '/reviews', label: 'Reviews' },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${linkBase} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              {({ isActive }) => (
                <span className="relative">
                  {l.label}
                  {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px]" style={{ background: accent }} />}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen((p) => !p)} aria-label="Toggle menu">
          <div className="h-6 w-6 text-white">☰</div>
        </button>
      </div>
      {isOpen && (
        <div className="mx-auto block max-w-6xl px-4 pb-4 md:hidden">
          <div className="flex flex-col rounded-xl border border-white/10 bg-black/30 p-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/games', label: 'Games' },
              { to: '/music', label: 'Music' },
              { to: '/reviews', label: 'Reviews' },
            ].map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `${linkBase} ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
