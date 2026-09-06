export const dynamic = 'force-static';
import type { Metadata } from 'next';
import Link from '@/components/site-link';
import { ArrowRight } from 'lucide-react';
import { topics, publications } from '@/lib/content';
export const metadata: Metadata = {
  title: 'Research',
  description:
    'Explore Aanjaneya Kumar’s research in stochastic biological dynamics, extreme events, inference from partial observations, and collective social behavior.',
};
export default function Research() {
  return (
    <main id="main" className="wrap">
      <header className="page-intro">
        <h1>Research</h1>
        <p>
          How do stochasticity, nonlinearities, and interactions shape
          biological and social dynamics? My research approaches this question
          from four connected directions.
        </p>
      </header>
      <nav className="research-jump" aria-label="Research directions">
        {topics.map((t, i) => (
          <a key={t.id} href={'#' + t.id}>
            0{i + 1} ·{' '}
            {
              [
                'Stochastic dynamics',
                'Extreme events',
                'Partial observations',
                'Social dynamics',
              ][i]
            }
          </a>
        ))}
      </nav>
      {topics.map((t, i) => (
        <section className="research-detail" id={t.id} key={t.id}>
          <div>
            <p className="eyebrow">DIRECTION 0{i + 1}</p>
            <h2>{t.title}</h2>
          </div>
          <div>
            <h3>{t.question}</h3>
            <p>{t.text}</p>
            <p>{t.detail}</p>
            <div className="related-papers">
              <p className="eyebrow">RELATED WORK</p>
              {publications
                .filter((p) => p.categories.includes(t.id))
                .slice(0, 3)
                .map((p) => (
                  <Link href={'/publications/#' + p.id} key={p.id}>
                    <span>{p.year}</span>
                    {p.title} ↗
                  </Link>
                ))}
            </div>
            <Link className="text-link" href={'/publications/?topic=' + t.id}>
              All publications in this direction <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}
