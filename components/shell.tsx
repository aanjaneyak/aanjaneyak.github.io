'use client';
import Link from '@/components/site-link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, ArrowUpRight, Menu, X } from 'lucide-react';
import { socials } from '@/lib/content';
import { SiteSearch } from './site-search';
export function Header() {
  const path = usePathname()?.replace(
    process.env.NEXT_PUBLIC_BASE_PATH || '',
    '',
  );
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  return (
    <>
      <header className="site-header wrap">
        <nav
          aria-label="Main navigation"
          className={menu ? 'navigation expanded' : 'navigation'}
        >
          {[
            ['/', 'Home'],
            ['/research/', 'Research'],
            ['/publications/', 'Publications'],
          ].map(([url, label]) => (
            <Link
              key={url}
              href={url}
              aria-current={
                path?.replace(/\/$/, '') === url.replace(/\/$/, '')
                  ? 'page'
                  : undefined
              }
              onClick={() => setMenu(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setMenu(false)}>
            Contact
          </Link>
        </nav>
        <div className="header-actions">
          <button
            className="search-launch"
            onClick={() => setSearch(true)}
            aria-label="Search website"
          >
            <Search size={17} />
            <span>Search</span>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="mobile-menu"
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <SiteSearch open={search} setOpen={setSearch} />
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <span>© {new Date().getFullYear()} Aanjaneya Kumar</span>
      <div>
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.name}
            <ArrowUpRight size={13} />
          </a>
        ))}
      </div>
    </footer>
  );
}
