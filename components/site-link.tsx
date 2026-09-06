import type { ComponentProps } from 'react';
// Real document navigation keeps every route independent on static hosts.
export default function SiteLink({
  href = '',
  children,
  ...props
}: ComponentProps<'a'>) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return (
    <a href={href.startsWith('/') ? base + href : href} {...props}>
      {children}
    </a>
  );
}
