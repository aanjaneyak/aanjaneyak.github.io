'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { publications, scholar } from '@/lib/content';
import { fuzzyScore } from '@/lib/search';
const categories = [
  { id: 'all', label: 'All publications' },
  { id: 'stochastic', label: 'Stochastic dynamics' },
  { id: 'extremes', label: 'Extreme events' },
  { id: 'observation', label: 'Partial observations' },
  { id: 'social', label: 'Social dynamics' },
];
export function PublicationArchive() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const sync = () => {
      const param = new URLSearchParams(window.location.search).get('topic');
      setCategory(
        window.location.hash
          ? 'all'
          : categories.some((c) => c.id === param)
            ? param!
            : 'all',
      );
      setQuery('');
      if (window.location.hash)
        requestAnimationFrame(() =>
          document
            .getElementById(decodeURIComponent(window.location.hash.slice(1)))
            ?.scrollIntoView(),
        );
    };
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);
  const visible = useMemo(
    () =>
      publications.filter(
        (p) =>
          (category === 'all' || p.categories.includes(category)) &&
          fuzzyScore(
            query,
            p.title +
              ' ' +
              p.authors +
              ' ' +
              p.venue +
              ' ' +
              p.year +
              ' ' +
              p.kind,
          ) > 0,
      ),
    [category, query],
  );
  const years = [...new Set(visible.map((p) => p.year))];
  function changeCategory(value: unknown) {
    const next = String(value);
    setCategory(next);
    const url = new URL(window.location.href);
    url.hash = '';
    if (next === 'all') url.searchParams.delete('topic');
    else url.searchParams.set('topic', next);
    window.history.replaceState(null, '', url);
  }
  return (
    <>
      <div className="pub-toolbar">
        <div className="search-field">
          <Search size={19} />
          <input
            aria-label="Search publications"
            placeholder="Search by title, author, keyword, or year…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="clear-search"
              aria-label="Clear publication search"
              onClick={() => setQuery('')}
            >
              ×
            </button>
          )}
        </div>
        <output>
          {visible.length} of {publications.length} publications
        </output>
      </div>
      <Tabs
        className="pub-tabs"
        value={category}
        onValueChange={changeCategory}
      >
        <TabsList aria-label="Publication categories">
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id}>
              {c.label}
              <small>
                {c.id === 'all'
                  ? publications.length
                  : publications.filter((p) => p.categories.includes(c.id))
                      .length}
              </small>
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((c) => (
          <TabsContent key={c.id} value={c.id}>
            {c.id === category &&
              (visible.length ? (
                years.map((year) => (
                  <section
                    className="year-group"
                    aria-label={'Publications from ' + year}
                    key={year}
                  >
                    <h2 className="year-label">{year}</h2>
                    <div>
                      {visible
                        .filter((p) => p.year === year)
                        .map((p) => (
                          <article className="pub-item" id={p.id} key={p.id}>
                            <div className="pub-meta">
                              <span>{p.kind}</span>
                              <span>·</span>
                              <span>
                                {p.categories
                                  .map(
                                    (id) =>
                                      categories.find((c) => c.id === id)
                                        ?.label,
                                  )
                                  .join(' / ')}
                              </span>
                            </div>
                            <h3>
                              <a
                                href={p.paperUrl || p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {p.title}
                              </a>
                            </h3>
                            <p className="pub-authors">
                              {p.authors
                                .split(/(A Kumar|A KUMAR)/)
                                .map((s, i) =>
                                  /A Kumar|A KUMAR/.test(s) ? (
                                    <strong key={i}>A. Kumar</strong>
                                  ) : (
                                    s
                                  ),
                                )}
                            </p>
                            {p.venue && <p className="pub-venue">{p.venue}</p>}
                            <div className="pub-links">
                              {p.paperUrl && (
                                <a
                                  href={p.paperUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Read preprint <ArrowUpRight size={13} />
                                </a>
                              )}
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Google Scholar <ArrowUpRight size={13} />
                              </a>
                            </div>
                          </article>
                        ))}
                    </div>
                  </section>
                ))
              ) : (
                <div className="empty">
                  <h3>No matching publications</h3>
                  <p>Try another search term or research direction.</p>
                  <button
                    className="text-link"
                    onClick={() => {
                      setQuery('');
                      changeCategory('all');
                    }}
                  >
                    Reset search and filters
                  </button>
                </div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
      <div className="archive-note">
        <span>Google Scholar · 25 entries · Updated September 7, 2026</span>
        <a href={scholar} target="_blank" rel="noopener noreferrer">
          View Google Scholar profile ↗
        </a>
      </div>
    </>
  );
}
