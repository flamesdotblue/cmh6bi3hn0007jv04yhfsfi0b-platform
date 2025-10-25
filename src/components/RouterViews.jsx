import { Routes, Route, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Play, Star } from 'lucide-react';

export default function RouterViews({ accent = '#C0A062', onPlayTrack, currentTrack, isPlaying }) {
  return (
    <Routes>
      <Route path="/" element={<HomeFeatured accent={accent} />} />
      <Route path="/games" element={<GamesPage accent={accent} />} />
      <Route path="/music" element={<MusicPage accent={accent} onPlayTrack={onPlayTrack} currentTrack={currentTrack} isPlaying={isPlaying} />} />
      <Route path="/reviews" element={<ReviewsPage accent={accent} />} />
      <Route path="/reviews/:slug" element={<ReviewArticle accent={accent} />} />
    </Routes>
  );
}

function Section({ children, padTop = true }) {
  return (
    <section className={`relative z-10 mx-auto w-full max-w-6xl px-4 ${padTop ? 'pt-24' : 'pt-0'} pb-32`}>
      {children}
    </section>
  );
}

function HomeFeatured({ accent }) {
  const navigate = useNavigate();
  return (
    <Section padTop={false}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          { k: 'games', t: 'Online Games', d: 'Playable experiments, prototypes, polished loops.' },
          { k: 'music', t: 'Produced Music', d: 'Beats, soundtracks, sonic textures.' },
          { k: 'reviews?type=book', t: 'Book Reviews', d: 'Thoughtful notes and highlights.' },
          { k: 'reviews?type=movie', t: 'Movie Reviews', d: 'Cinematic takes: what moved me on screen.' },
        ].map((it, i) => (
          <button
            key={i}
            onClick={() => navigate(`/${it.k}`)}
            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition hover:scale-[1.02] hover:shadow-xl hover:shadow-[rgba(192,160,98,0.18)]"
          >
            <div
              className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-900/10"
              style={{ boxShadow: `0 0 0 1px ${accent}20 inset, 0 0 24px ${accent}22` }}
            />
            <div>
              <div className="text-lg font-extrabold tracking-tight text-white font-manrope">{it.t}</div>
              <p className="mt-1 text-sm text-white/70">{it.d}</p>
              <span className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition group-hover:border-transparent">
                Explore
              </span>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}

function GamesPage({ accent }) {
  const games = useMemo(
    () => [
      { id: 'neon-runner', title: 'Neon Runner', desc: 'Slide, drift, and dash through a cyber cityscape.', video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
      { id: 'orbital-shift', title: 'Orbital Shift', desc: 'Gravity-bending micro puzzler about momentum.', video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
      { id: 'echo-blades', title: 'Echo Blades', desc: 'Rhythm combat set in a void temple.', video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    ],
    []
  );

  return (
    <Section>
      <h2 className="mb-2 text-2xl font-extrabold text-white font-manrope tracking-tight">Games</h2>
      <p className="mb-6 text-sm text-white/70 font-inter">Playable in-browser experiments and polished loops.</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => (
          <div key={g.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-lg transition hover:scale-[1.03] hover:shadow-[0_20px_50px_-20px_rgba(192,160,98,0.25)]">
            <div className="relative aspect-video overflow-hidden">
              <video
                src={g.video}
                className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
                muted loop playsInline autoPlay
                onMouseEnter={(e) => (e.currentTarget.playbackRate = 1.2)}
                onMouseLeave={(e) => (e.currentTarget.playbackRate = 1.0)}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-[var(--accent)] hover:text-black"
                  style={{ ['--accent']: accent }}
                  onClick={(e) => { e.stopPropagation(); alert('Open project detail with playable embed.'); }}
                >
                  Play Now
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm font-bold text-white font-manrope tracking-wide">{g.title}</div>
              <div className="mt-1 text-xs text-white/70 font-inter">{g.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MusicPage({ accent, onPlayTrack, currentTrack, isPlaying }) {
  const tracks = useMemo(
    () => [
      { id: 'midnight-drive', title: 'Midnight Drive', artist: 'Avery Cole', artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop', src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Creative_Commons/Kevin_MacLeod_-_Impact_Moderato.mp3' },
      { id: 'cosmic-dust', title: 'Cosmic Dust', artist: 'Avery Cole', artwork: 'https://images.unsplash.com/photo-1513863321142-9d2d7f4a9a2a?q=80&w=400&auto=format&fit=crop', src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Classical_Sampler/Kevin_MacLeod_-_The_Curtain_Rises.mp3' },
      { id: 'glass-ocean', title: 'Glass Ocean', artist: 'Avery Cole', artwork: 'https://images.unsplash.com/photo-1464375117522-1311d3d4b381?q=80&w=400&auto=format&fit=crop', src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Impact_-_Final_Count.mp3' },
    ],
    []
  );

  return (
    <Section>
      <h2 className="mb-2 text-2xl font-extrabold text-white font-manrope tracking-tight">Music</h2>
      <p className="mb-6 text-sm text-white/70 font-inter">Click a track to play. The player persists as you explore.</p>
      <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        {tracks.map((t) => {
          const active = currentTrack?.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onPlayTrack(t)}
              className={`grid grid-cols-[56px_1fr_80px] items-center gap-3 p-3 text-left transition hover:bg-white/[0.03] ${active ? 'bg-[var(--accent)]/5 ring-1 ring-[var(--accent)]/30' : ''}`}
              style={{ ['--accent']: accent }}
            >
              <div className={`relative h-14 w-14 overflow-hidden rounded-md ${active ? 'shadow-[0_0_24px_rgba(192,160,98,0.35)]' : ''}`}>
                <img src={t.artwork} alt="art" className={`h-full w-full object-cover ${active && isPlaying ? 'animate-pulse' : ''}`} />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white font-manrope">{t.title}</div>
                <div className="truncate text-xs text-white/60 font-inter">{t.artist}</div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-white/10">
                  <div className={`h-full w-1/3 bg-[var(--accent)] transition-all duration-500 ${active && isPlaying ? 'w-2/3' : 'w-1/4'}`} />
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
    </Section>
  );
}

function ReviewsPage({ accent }) {
  const [search] = useSearchParams();
  const initial = search.get('type') || 'all';
  const [filter, setFilter] = useState(initial);
  const navigate = useNavigate();

  const items = useMemo(
    () => [
      { id: 'the-midnight-library', type: 'book', title: 'The Midnight Library', rating: 4, img: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop', excerpt: 'A tender meditation on regret, possibility, and the lives between choices.' },
      { id: 'blade-runner-2049', type: 'movie', title: 'Blade Runner 2049', rating: 5, img: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1200&auto=format&fit=crop', excerpt: 'A neon hymn to memory and identity, meticulously crafted and haunting.' },
      { id: 'project-hail-mary', type: 'book', title: 'Project Hail Mary', rating: 5, img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop', excerpt: 'Hard sci‑fi with heart: glorious problem‑solving and unexpected friendship.' },
      { id: 'arrival', type: 'movie', title: 'Arrival', rating: 5, img: 'https://images.unsplash.com/photo-1499189410883-05fa85288e96?q=80&w=1200&auto=format&fit=crop', excerpt: 'Time, language, and love woven into an elegant contact narrative.' },
    ],
    []
  );

  const filtered = items.filter((i) => filter === 'all' || i.type === filter);

  return (
    <Section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-white font-manrope tracking-tight">Reviews</h2>
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
            onClick={() => navigate(`/reviews/${r.id}`)}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:shadow-xl hover:shadow-[rgba(192,160,98,0.18)] cursor-pointer"
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
              <h3 className="text-lg font-bold text-white font-manrope tracking-wide">{r.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-[var(--accent)]" style={{ ['--accent']: accent }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={`${i < r.rating ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-white/20'}`} />
                ))}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-white/70 font-inter">{r.excerpt}</p>
              <div className="mt-4">
                <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--accent)] hover:text-black" style={{ ['--accent']: accent }}>
                  Read Full Review
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ReviewArticle({ accent }) {
  const { slug } = useParams();

  const reviews = useMemo(
    () => ({
      'the-midnight-library': {
        title: 'The Midnight Library',
        hero: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop',
        body: [
          'Between life and death sits a library where every book contains a life you could have lived. That premise is irresistible — and in practice, it becomes a compassionate lens to examine regret and agency.',
          'What resonated most is how the book reframes perfection: not as a target, but as an emergent property of meaning stitched through imperfect choices. The alternate lives are glossy, yes, but their seams show. And the seams are the point.',
          'It’s a tender, approachable meditation that may not surprise in plot, but lands poignantly in sentiment. It makes the quiet case that presence is its own kind of courage.'
        ],
        quote: 'Regret is a ghost made of our imagined futures — and the only way to haunt it back is to fully inhabit the present.'
      },
      'blade-runner-2049': {
        title: 'Blade Runner 2049',
        hero: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1600&auto=format&fit=crop',
        body: [
          'A neon elegy about memory, identity, and the tenderness of being almost-real. Every frame is designed, every silence heavy with purpose.',
          'The power of the film is not in its answers but in its posture — the way it looks at the human project and asks if care can be manufactured, and if so, whether that makes it any less true.',
          'Villeneuve and Deakins deliver a mood that lingers, a city that hums, and a question worth asking twice.'
        ],
        quote: 'We are what we choose to protect.'
      },
      'project-hail-mary': {
        title: 'Project Hail Mary',
        hero: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
        body: [
          'A love letter to problem-solving. It’s hard science tied to an unexpectedly warm buddy story that honors curiosity as survival.',
          'The pacing is rocket-smooth: setups become payoffs with satisfying inevitability, and the humor never undercuts the stakes.'
        ],
        quote: 'Ingenuity is empathy turned outward — a way to keep another alive.'
      },
      'arrival': {
        title: 'Arrival',
        hero: 'https://images.unsplash.com/photo-1499189410883-05fa85288e96?q=80&w=1600&auto=format&fit=crop',
        body: [
          'A contact movie that trades spectacle for intimacy. Language is treated as a technology for reorganizing time and, by extension, grief.',
          'It’s generous and precise, haunting without cruelty — a film that asks what we would choose if we knew the ending and loved it anyway.'
        ],
        quote: 'Knowing the whole story doesn’t cheapen love; it deepens the decision to live it.'
      },
    }),
    []
  );

  const item = reviews[slug];

  if (!item) {
    return (
      <Section>
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-white/70">Review not found.</p>
          <a href="/reviews" className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent)] hover:text-black" style={{ ['--accent']: accent }}>Back to Reviews</a>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <article className="mx-auto w-full max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="relative h-64 w-full overflow-hidden">
            <img src={item.hero} alt={item.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-extrabold text-white font-manrope tracking-tight">{item.title}</h1>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/85 font-inter">
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {item.quote && (
              <blockquote className="my-8 border-l-2 border-[var(--accent)]/60 pl-4 text-white/90" style={{ ['--accent']: accent }}>
                <span className="font-manrope text-base italic">“{item.quote}”</span>
              </blockquote>
            )}
            <a href="/reviews" className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent)] hover:text-black" style={{ ['--accent']: accent }}>Back to Reviews</a>
          </div>
        </div>
      </article>
    </Section>
  );
}
