import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Hero({ accent = '#C0A062' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <section className={`relative w-full overflow-hidden ${onHome ? 'h-[92vh] min-h-[640px]' : 'h-0'} transition-all`}>
      {onHome && (
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      {onHome && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_60%,#0b0b0b_100%)]" />}

      {onHome && (
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-white md:text-6xl font-manrope"
          >
            Avery Cole
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-lg text-white/80 md:text-2xl font-inter tracking-wide"
          >
            <span className="inline-flex items-center gap-2">
              <span>Game Developer</span>
              <span className="text-white/40">|</span>
              <span className="font-extrabold font-manrope" style={{ color: accent }}>Music Producer</span>
              <span className="text-white/40">|</span>
              <span className="font-extrabold font-manrope" style={{ color: accent }}>Critic</span>
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8"
          >
            <button
              onClick={() => navigate('/games')}
              className="group relative overflow-hidden rounded-full border border-white/25 px-6 py-3 text-sm font-semibold tracking-wide text-white transition"
            >
              <span className="relative z-10">View My Work</span>
              <span
                className="absolute inset-0 -z-[1] translate-y-[101%] transform bg-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0"
                style={{ ['--accent']: accent }}
              />
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
