'use client';
import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
const email = 'aanjaneya@santafe.edu';
export function EmailContact() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 2500);
    } catch {
      setStatus('error');
    }
  }
  return (
    <>
      <div className="email-row">
        <a className="email-link" href={'mailto:' + email}>
          {email}
        </a>
        <button
          className="copy-email"
          onClick={() => void copyEmail()}
          aria-label="Copy email address"
        >
          {status === 'copied' ? <Check size={16} /> : <Copy size={16} />}
          <span>{status === 'copied' ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <output className="copy-status">
        {status === 'copied'
          ? 'Email address copied.'
          : status === 'error'
            ? 'Unable to copy automatically. Please select and copy the email address.'
            : ''}
      </output>
    </>
  );
}
