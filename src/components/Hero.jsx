import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

export default function Hero({ onCTAClick, accent = '#00E5FF', text = '#EAEAEA' }) {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient veil to improve contrast, don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_60%,#0b0b0b_100%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight text-white md:text-6xl"
        >
          Your Name
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-lg text-white/80 md:text-2xl"
        >
          <TypeCycle words={["Game Developer", "Music Producer", "Critic"]} accent={accent} />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8"
        >
          <button
            onClick={onCTAClick}
            className="group relative overflow-hidden rounded-full border border-white/20 px-6 py-3 text-sm font-semibold tracking-wide text-white transition"
          >
            <span className="relative z-10">View My Work</span>
            <span
              className="absolute inset-0 -z-[1] translate-y-[101%] transform bg-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0"
              style={{ ['--accent']: accent }}
            />
          </button>
        </motion.div>
      </div>

      {/* Featured Category Shortcuts */}
      <div className="relative z-10 -mb-16 mt-10 flex w-full justify-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { key: 'games', title: 'Online Games', desc: 'Playable experiments', color: 'from-cyan-400/30 to-cyan-500/10' },
              { key: 'music', title: 'Produced Music', desc: 'Beats and scores', color: 'from-cyan-400/30 to-cyan-500/10' },
              { key: 'reviews-books', title: 'Book Reviews', desc: 'Sharp, concise reads', color: 'from-cyan-400/30 to-cyan-500/10' },
              { key: 'reviews-movies', title: 'Movie Reviews', desc: 'Cinematic thoughts', color: 'from-cyan-400/30 to-cyan-500/10' },
            ].map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i }}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0E0E0E]/70 backdrop-blur hover:shadow-xl hover:shadow-[rgba(0,229,255,0.08)] transition-transform hover:scale-[1.03]"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${c.color}`} />
                <div className="p-4">
                  <div className="text-sm font-semibold text-white">{c.title}</div>
                  <div className="text-xs text-white/60">{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TypeCycle({ words = [], accent = '#00E5FF' }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>Game Developer</span>
      <span className="text-white/40">|</span>
      <Typist words={words} accent={accent} />
    </span>
  );
}

function Typist({ words, accent }) {
  const text = useTypewriter(words);
  return (
    <span className="font-bold" style={{ color: accent }}>
      {text}
    </span>
  );
}

function useTypewriter(words, speed = 90, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const current = words[index % words.length] || '';
    if (!reverse && subIndex === current.length) {
      const t = setTimeout(() => setReverse(true), pause);
      return () => clearTimeout(t);
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSubIndex((s) => s + (reverse ? -1 : 1)), reverse ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, words, speed, pause]);

  return (words[index % words.length] || '').substring(0, subIndex);
}
