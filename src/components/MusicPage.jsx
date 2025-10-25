import { useMemo } from 'react';
import { Play } from 'lucide-react';

export default function MusicPage({ accent = '#C0A062', onPlayTrack, currentTrack, isPlaying }) {
  const tracks = useMemo(
    () => [
      {
        id: 'midnight-drive',
        title: 'Midnight Drive',
        artist: 'Avery Cole',
        artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop',
        src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Creative_Commons/Kevin_MacLeod_-_Impact_Moderato.mp3',
      },
      {
        id: 'cosmic-dust',
        title: 'Cosmic Dust',
        artist: 'Avery Cole',
        artwork: 'https://images.unsplash.com/photo-1513863321142-9d2d7f4a9a2a?q=80&w=400&auto=format&fit=crop',
        src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Classical_Sampler/Kevin_MacLeod_-_The_Curtain_Rises.mp3',
      },
      {
        id: 'glass-ocean',
        title: 'Glass Ocean',
        artist: 'Avery Cole',
        artwork: 'https://images.unsplash.com/photo-1464375117522-1311d3d4b381?q=80&w=400&auto=format&fit=crop',
        src: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Impact_-_Final_Count.mp3',
      },
    ],
    []
  );

  return (
    <div className="pb-20">
      <h2 className="mb-2 text-2xl font-extrabold text-white font-manrope tracking-tight">Music</h2>
      <p className="mb-6 text-sm text-white/70 font-inter">Click a track to play. The player persists as you explore.</p>
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
    </div>
  );
}
