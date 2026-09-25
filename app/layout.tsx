import type { Metadata } from 'next';
import { Header, Footer } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = {
  title: {
    default: 'Aanjaneya Kumar — Complexity & Statistical Physics',
    template: '%s — Aanjaneya Kumar',
  },
  description:
    'Aanjaneya Kumar, Omidyar Postdoctoral Fellow at the Santa Fe Institute. Research on stochastic processes, biological and social dynamics, extreme events, and inference.',
  openGraph: {
    title: 'Aanjaneya Kumar',
    description:
      'Research on nonequilibrium biological and social dynamics, stochastic processes, and statistical physics.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Aanjaneya Kumar',
              jobTitle: 'Omidyar Postdoctoral Fellow',
              affiliation: {
                '@type': 'Organization',
                name: 'Santa Fe Institute',
              },
              email: 'aanjaneya@santafe.edu',
              sameAs: [
                'https://orcid.org/0000-0003-1212-1128',
                'https://www.linkedin.com/in/aanjaneyak/',
                'https://scholar.google.com/citations?user=KZC2cBMAAAAJ&hl=en',
                'https://www.researchgate.net/profile/Aanjaneya-Kumar',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
