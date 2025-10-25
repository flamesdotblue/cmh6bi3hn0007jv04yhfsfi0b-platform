import { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

import HeaderNav from './components/HeaderNav';
import Hero from './components/Hero';
import RouterViews from './components/RouterViews';
import Footer from './components/Footer';

function AppShell() {
  const accent = '#C0A062'; // Muted Gold
  const location = useLocation();

  const [navSolid, setNavSolid] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const trigger = window.innerHeight * 0.7;
      const onHome = location.pathname === '/';
      const solid = window.scrollY > trigger || !onHome;
      setNavSolid(solid);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const playTrack = (track) => {
    if (!track) return;
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentTrack(track);
      setTimeout(() => setIsPlaying(true), 0);
    }
  };

  const pageVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.35 } },
      exit: { opacity: 0, transition: { duration: 0.25 } },
    }),
    []
  );

  return (
    <div className="min-h-screen w-full bg-[#121212] text-[#EAEAEA] font-inter selection:bg-yellow-500/20 selection:text-[#EAEAEA]">
      <HeaderNav accent={accent} solid={navSolid} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Hero accent={accent} />
            <RouterViews accent={accent} onPlayTrack={playTrack} currentTrack={currentTrack} isPlaying={isPlaying} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer accent={accent} />

      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto w-full max-w-6xl px-4 pb-4">
          <div className="rounded-2xl border border-white/5 bg-[#141414]/90 backdrop-blur supports-[backdrop-filter]:bg-[#141414]/70 shadow-lg overflow-hidden">
            <div className="flex items-center gap-3 p-3">
              <button
                aria-label={isPlaying ? 'Pause' : 'Play'}
                onClick={() => { if (!currentTrack) return; setIsPlaying((p) => !p); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white hover:scale-105 hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
                style={{ ['--accent']: accent }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/5">
                  {currentTrack?.artwork ? (
                    <img src={currentTrack.artwork} alt="artwork" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-yellow-500/20 to-yellow-400/5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{currentTrack?.title || 'No track selected'}</div>
                  <div className="truncate text-xs text-white/60">{currentTrack?.artist || 'Select a track to play'}</div>
                </div>
              </div>
              <audio ref={audioRef} src={currentTrack?.src || ''} preload="none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
