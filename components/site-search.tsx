'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from '@/components/site-link';
import { Search, ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { publications, topics, about } from '@/lib/content';
import { fuzzyScore } from '@/lib/search';
const entries = [
  {
    title: 'About Aanjaneya Kumar',
    text:
      about.join(' ') + ' Complexity Postdoctoral Fellow Santa Fe Institute',
    url: '/',
    kind: 'Page',
  },
  {
    title: 'Contact & social profiles',
    text: 'aanjaneya@santafe.edu email LinkedIn ResearchGate Google Scholar contact',
    url: '/#contact',
    kind: 'Page',
  },
  {
    title: 'Publications',
    text: 'Papers research publications archive',
    url: '/publications/',
    kind: 'Page',
  },
  ...topics.map((t) => ({
    title: t.title,
    text:
      t.question +
      ' ' +
      t.short +
      ' ' +
      t.text +
      ' ' +
      t.detail +
      ' ' +
      t.keywords,
    url: '/research/#' + t.id,
    kind: 'Research',
  })),
  ...publications.map((p) => ({
    title: p.title,
    text: p.authors + ' ' + p.venue + ' ' + p.year,
    url: '/publications/#' + p.id,
    kind: 'Publication',
  })),
];
export function SiteSearch({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, setOpen]);
  const changeOpen = (value: boolean) => {
    setOpen(value);
    if (!value) setQuery('');
  };
  const results = useMemo(
    () =>
      entries
        .map((e) => ({
          ...e,
          score: fuzzyScore(query, e.title + ' ' + e.text),
        }))
        .filter((e) => e.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12),
    [query],
  );
  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent className="site-search">
        <DialogTitle>Search the website</DialogTitle>
        <DialogDescription>
          Search research, publications, people, and topics.
        </DialogDescription>
        <div className="search-field">
          <Search size={20} />
          <input
            aria-label="Search the whole website"
            placeholder="Try ‘stochastic’, ‘elections’, or an author…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map((r) => (
              <Link
                className="search-result"
                key={r.url}
                href={r.url}
                onClick={() => changeOpen(false)}
              >
                <div>
                  <span className="eyebrow">{r.kind}</span>
                  <p>{r.title}</p>
                </div>
                <ArrowUpRight size={18} />
              </Link>
            ))
          ) : (
            <p className="empty">
              No results for “{query}”. Try a different topic or author.
            </p>
          )}
        </div>
        <div className="search-hint">
          Search results <span>Esc to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
