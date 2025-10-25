import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ReviewsPage({ accent = '#C0A062' }) {
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
    <div>
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
    </div>
  );
}
