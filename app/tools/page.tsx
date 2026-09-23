'use client';
import { useState } from 'react';
import { TOOLS, CAT_JA, ToolCategory } from '@/lib/tools-data';
import ToolCard from '@/components/ToolCard';

const CATS: Array<ToolCategory | 'ALL'> = ['ALL', 'GUITAR', 'DTM', 'THEORY', 'COMPOSITION', 'PLAY'];
const ALL_JA: Record<string, string> = { ALL: 'すべて', ...CAT_JA };

export default function ToolsPage() {
  const [active, setActive] = useState<ToolCategory | 'ALL'>('ALL');
  const filtered = active === 'ALL' ? TOOLS : TOOLS.filter((t) => t.cat === active);

  return (
    <main className="py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2.5">
          <h1 className="font-disp text-4xl font-bold">Tools</h1>
          <span className="text-sm text-textDim">{TOOLS.length} tools</span>
        </div>
        <div className="mb-7 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active === c
                  ? 'border-transparent bg-gradient-to-r from-accent to-accent2 font-semibold text-bg'
                  : 'border-border bg-bg1 text-textDim hover:border-[#3a3a42] hover:text-text'
              }`}
            >
              {c} <span className="ml-1 text-xs opacity-70">{ALL_JA[c]}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </div>
    </main>
  );
}
