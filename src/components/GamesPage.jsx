import { useMemo } from 'react';

export default function GamesPage({ accent = '#C0A062' }) {
  const games = useMemo(
    () => [
      {
        id: 'neon-runner',
        title: 'Neon Runner',
        desc: 'Slide, drift, and dash through a cyber cityscape.',
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
      {
        id: 'orbital-shift',
        title: 'Orbital Shift',
        desc: 'Gravity-bending micro puzzler about momentum.',
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
      {
        id: 'echo-blades',
        title: 'Echo Blades',
        desc: 'Rhythm combat set in a void temple.',
        video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      },
    ],
    []
  );

  return (
    <div>
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
    </div>
  );
}
