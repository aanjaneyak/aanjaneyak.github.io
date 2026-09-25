export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { EmailContact } from '@/components/email-contact';
import { socials } from '@/lib/content';
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Aanjaneya Kumar, Omidyar Postdoctoral Fellow at the Santa Fe Institute. Email and academic profiles, including ORCID.',
};
export default function Contact() {
  return (
    <main id="main" className="wrap contact-page">
      <header className="page-intro">
        <h1>Contact</h1>
        <p>
          Aanjaneya Kumar
          <br />
          Omidyar Postdoctoral Fellow,{' '}
          <a
            href="https://www.santafe.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Santa Fe Institute
          </a>
        </p>
      </header>
      <div className="contact-copy">
        <EmailContact />
      </div>
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
    </main>
  );
}
