import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ReviewArticle({ accent = '#C0A062' }) {
  const { slug } = useParams();

  const reviews = useMemo(
    () => ({
      'the-midnight-library': {
        title: 'The Midnight Library',
        hero: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1600&auto=format&fit=crop',
        rating: 4,
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
        rating: 5,
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
        rating: 5,
        body: [
          'A love letter to problem-solving. It’s hard science tied to an unexpectedly warm buddy story that honors curiosity as survival.',
          'The pacing is rocket-smooth: setups become payoffs with satisfying inevitability, and the humor never undercuts the stakes.'
        ],
        quote: 'Ingenuity is empathy turned outward — a way to keep another alive.'
      },
      'arrival': {
        title: 'Arrival',
        hero: 'https://images.unsplash.com/photo-1499189410883-05fa85288e96?q=80&w=1600&auto=format&fit=crop',
        rating: 5,
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
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-white/70">Review not found.</p>
        <Link to="/reviews" className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent)] hover:text-black" style={{ ['--accent']: accent }}>Back to Reviews</Link>
      </div>
    );
  }

  return (
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
          <Link to="/reviews" className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent)] hover:text-black" style={{ ['--accent']: accent }}>Back to Reviews</Link>
        </div>
      </div>
    </article>
  );
}
