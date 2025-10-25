import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Portfolio({ currentPage, setCurrentPage, accent = '#00E5FF', mode, onPlayTrack, currentTrack, isPlaying }) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const render = () => {
    if (currentPage === 'games' || (mode === 'home' && !currentPage)) {
      return <Games accent={accent} />;
    }
    if (currentPage === 'music') {
      return (
        <Music accent={accent} onPlayTrack={onPlayTrack} currentTrack={currentTrack} isPlaying={isPlaying} />
      );
    }
    if (currentPage === 'reviews') {
      return <Reviews accent={accent} />;
    }
    if (currentPage === 'home') {
      return <Featured accent={accent} onSelect={(k) => setCurrentPage(k)} />;
    }
    return null;
  };

  return (
    <section id="portfolio" className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-40 pt-20">
      <AnimatePresence mode="wait">
        <motion.div key={currentPage} variants={sectionVariants} initial="hidden" animate="show" exit="hidden">
          {render()}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Featured({ accent, onSelect }) {
  const items = [
    { key: 'games', title: 'Online Games', desc: 'Playable experiments, prototypes, and polished loops.' },
    { key: 'music', title: 'Produced Music', desc: 'Beats, soundtracks, and sonic textures.' },
    { key: 'reviews', title: 'Book Reviews', desc: 'Thoughtful notes and highlights on recent reads.' },
    { key: 'reviews', title: 'Movie Reviews', desc: 'Critiques and praise on what moved me on screen.' },
  ];
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((it, i) => (
        <button
          key={i}
          onClick={() => onSelect(it.key)}
          className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[rgba(0,229,255,0.08)]"
        >
          <div
            className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-cyan-400/30 to-cyan-600/10"
            style={{ boxShadow: `0 0 0 1px ${accent}20 inset, 0 0 24px ${accent}22` }}
          />
          <div>
            <div className="text-lg font-bold text-white">{it.title}</div>
            <p className="mt-1 text-sm text-white/70">{it.desc}</p>
            <span className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition group-hover:border-transparent" style={{ boxShadow: `inset 0 0 0 0 ${accent}`, backgroundImage: 'linear-gradient(to right, transparent, transparent)' }}>
              Explore
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

function Games({ accent }) {
  const games = useMemo(
    () => [
      {
        id: 'g1',
        title: 'Neon Runner',
        desc: 'Dodge, drift, and dash through a cyber city.',
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
      {
        id: 'g2',
        title: 'Orbital Shift',
        desc: 'Gravity-bending puzzle micro game.',
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
      {
        id: 'g3',
        title: 'Echo Blades',
        desc: 'Rhythm combat in a void temple.',
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
    ],
    []
  );

  return (
    <div>
      <h2 className="mb-6 text-2xl font-extrabold text-white">Games</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => (
          <GameCard key={g.id} game={g} accent={accent} />)
        )}
      </div>
    </div>
  );
}

function GameCard({ game, accent }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg transition hover:scale-[1.03] hover:shadow-[0_20px_50px_-20px_rgba(0,229,255,0.2)]">
      <div className="relative aspect-video overflow-hidden">
        <video
          src={game.video}
          className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
          muted
          loop
          playsInline
          onMouseEnter={(e) => (e.currentTarget.playbackRate = 1.2)}
          onMouseLeave={(e) => (e.currentTarget.playbackRate = 1.0)}
          autoPlay
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-[var(--accent)] hover:text-black"
            style={{ ['--accent']: accent }}
            onClick={(e) => {
              e.stopPropagation();
              alert('Open project detail with playable embed.');
            }}
          >
            Play Now
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-bold text-white">{game.title}</div>
        <div className="mt-1 text-xs text-white/70">{game.desc}</div>
      </div>
    </div>
  );
}

function Music({ accent, onPlayTrack, currentTrack, isPlaying }) {
  const tracks = useMemo(
    () => [
      {
        id: 't1',
        title: 'Midnight Drive',
        artist: 'Your Producer Name',
        artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop',
        src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Creative_Commons/Kevin_MacLeod_-_Impact_Moderato.mp3',
      },
      {
        id: 't2',
        title: 'Cosmic Dust',
        artist: 'Your Producer Name',
        artwork: 'https://images.unsplash.com/photo-1513863321142-9d2d7f4a9a2a?q=80&w=400&auto=format&fit=crop',
        src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Classical_Sampler/Kevin_MacLeod_-_The_Curtain_Rises.mp3',
      },
      {
        id: 't3',
        title: 'Glass Ocean',
        artist: 'Your Producer Name',
        artwork: 'https://images.unsplash.com/photo-1464375117522-1311d3d4b381?q=80&w=400&auto=format&fit=crop',
        src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Impact_-_Final_Count.mp3',
      },
    ],
    []
  );

  return (
    <div className="pb-20">
      <h2 className="mb-2 text-2xl font-extrabold text-white">Music</h2>
      <p className="mb-6 text-sm text-white/70">Click a track to play. The player persists as you explore.</p>
      <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        {tracks.map((t) => {
          const active = currentTrack?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onPlayTrack(t)}
              className={`grid grid-cols-[56px_1fr_80px] items-center gap-3 p-3 text-left transition hover:bg-white/[0.03] ${
                active ? 'bg-[var(--accent)]/5 ring-1 ring-[var(--accent)]/30' : ''
              }`}
              style={{ ['--accent']: accent }}
            >
              <div className={`relative h-14 w-14 overflow-hidden rounded-md ${active ? 'shadow-[0_0_24px_rgba(0,229,255,0.35)]' : ''}`}>
                <img src={t.artwork} alt="art" className={`h-full w-full object-cover ${active && isPlaying ? 'animate-pulse' : ''}`} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{t.title}</div>
                <div className="truncate text-xs text-white/60">{t.artist}</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-white/10">
                  <div className={`h-full bg-[var(--accent)] transition-all duration-500 ${active && isPlaying ? 'w-2/3' : 'w-1/4'}`} style={{ width: active && isPlaying ? '66%' : '25%' }} />
                </div>
              </div>
              <div className="flex items-center justify-end pr-2">
                <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${active ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-white/20 text-white/60'}`} style={{ ['--accent']: accent }}>
                  <Play size={14} />
                  {active && isPlaying ? 'Playing' : 'Play'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Reviews({ accent }) {
  const [filter, setFilter] = useState('all');
  const items = useMemo(
    () => [
      { id: 'r1', type: 'book', title: 'The Midnight Library', rating: 4, img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop', excerpt: 'A tender meditation on regret and the many lives we might have lived.' },
      { id: 'r2', type: 'movie', title: 'Blade Runner 2049', rating: 5, img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=800&auto=format&fit=crop', excerpt: 'A slow-burn neon dream about memory, identity, and what makes us human.' },
      { id: 'r3', type: 'book', title: 'Project Hail Mary', rating: 5, img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', excerpt: 'Hard sci-fi with heart—glorious problem-solving set pieces.' },
      { id: 'r4', type: 'movie', title: 'Arrival', rating: 5, img: 'https://images.unsplash.com/photo-1499189410883-05fa85288e96?q=80&w=800&auto=format&fit=crop', excerpt: 'Time, language, and love folded into a haunting contact narrative.' },
    ],
    []
  );

  const filtered = items.filter((i) => filter === 'all' || i.type === filter);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white">Reviews</h2>
        <div className="flex items-center gap-2">
          {[
            { k: 'all', label: 'All' },
            { k: 'book', label: 'Book Reviews' },
            { k: 'movie', label: 'Movie Reviews' },
          ].map((b) => (
            <button
              key={b.k}
              onClick={() => setFilter(b.k)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                filter === b.k ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-white/20 text-white/70 hover:text-white'
              }`}
              style={{ ['--accent']: accent }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((r) => (
          <article
            key={r.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:shadow-xl hover:shadow-[rgba(0,229,255,0.08)]"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={r.img}
                alt={r.title}
                className="h-full w-full scale-100 transform object-cover transition duration-[4000ms] group-hover:scale-110 group-hover:object-[60%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white">{r.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-[var(--accent)]" style={{ ['--accent']: accent }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={`${i < r.rating ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">{r.excerpt}</p>
              <div className="mt-4">
                <button
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent)] hover:text-black"
                  style={{ ['--accent']: accent }}
                  onClick={() => alert('Navigate to full review page')}
                >
                  Read Full Review
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
