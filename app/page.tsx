export const dynamic = 'force-static';
import Link from '@/components/site-link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { topics, socials, about } from '@/lib/content';
import { EmailContact } from '@/components/email-contact';
export default function Home() {
  return (
    <main id="main">
      <section className="about-section wrap" aria-labelledby="about-title">
        <h1 id="about-title">Aanjaneya Kumar</h1>
        <p className="affiliation">
          Complexity Postdoctoral Fellow,{' '}
          <a
            href="https://www.santafe.edu/people/profile/aanjaneya-kumar"
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
      <section className="research-section wrap">
        <div className="section-heading">
          <h2>Research interests</h2>
          <Link className="text-link" href="/research/">
            Research details <ArrowRight size={16} />
          </Link>
        </div>
        <div className="research-grid">
          {topics.map((t) => (
            <Link
              className="research-card"
              key={t.id}
              href={'/research/#' + t.id}
            >
              <h3>{t.title}</h3>
              <p>{t.short}</p>
              <span className="card-link">
                Read more <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section id="contact" className="contact-section wrap">
        <h2>Contact</h2>
        <div className="contact-copy">
          <EmailContact />
          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
