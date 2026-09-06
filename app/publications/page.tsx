export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { PublicationArchive } from '@/components/publication-archive';
export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Browse all 25 Google Scholar entries by Aanjaneya Kumar. Filter publications by stochastic dynamics, extreme events, partial observations, and social dynamics.',
};
export default function Publications() {
  return (
    <main className="wrap" id="main">
      <header className="page-intro">
        <h1>Publications</h1>
        <p>
          Research papers, preprints, and theses spanning statistical physics,
          biological systems, and collective behavior.
        </p>
      </header>
      <PublicationArchive />
    </main>
  );
}
