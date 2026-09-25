export const dynamic = 'force-static';
import { about } from '@/lib/content';
export default function Home() {
  return (
    <main id="main">
      <section className="about-section wrap" aria-labelledby="about-title">
        <h1 id="about-title">Aanjaneya Kumar</h1>
        <p className="affiliation">
          Omidyar Postdoctoral Fellow,{' '}
          <a
            href="https://www.santafe.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Santa Fe Institute
          </a>
        </p>
        <div className="about-copy">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
