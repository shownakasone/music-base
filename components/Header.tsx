'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools-data';

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [{ href: '/tools', label: 'Tools', badge: TOOLS.length }];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-borderSoft bg-bg/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-disp text-lg font-bold tracking-tight">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent to-accent2 shadow-[0_0_10px_rgba(63,208,255,.5)]" />
            MUSIC BASE
          </Link>
          <div className="flex items-center gap-4 text-sm text-textDim">
            <Link href="/tools" className="hidden rounded-full border border-border px-4 py-2 text-text transition-colors hover:border-accent2 hover:text-accent2 md:inline-block">
              Tools
            </Link>
            <button
              aria-label="メニューを開く"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-text md:hidden"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[78%] max-w-[320px] flex-col gap-1 border-l border-border bg-bg1 p-6">
            <button aria-label="閉じる" onClick={() => setOpen(false)} className="mb-4 self-end text-2xl text-textDim">
              ✕
            </button>
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-borderSoft py-3.5 text-base"
              >
                {l.label}
                {l.badge ? (
                  <span className="rounded-full bg-accent2/15 px-2 py-0.5 text-xs font-bold text-accent2">{l.badge}</span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
