'use client';
import Link from 'next/link';
import type { ToolMeta } from '@/lib/tools-data';
import {
  Clock, Activity, ArrowLeftRight, Music2, BarChart3, Circle as CircleIcon,
  Gauge, AudioWaveform, Sparkles, Guitar, Timer, Music4, Ear, ListMusic,
} from 'lucide-react';
import type { MouseEvent } from 'react';

const ICONS: Record<string, any> = {
  'bpm-time-tool': Clock, 'metronome': Activity, 'lufs-calculator': Gauge,
  'practice-timer': Timer, 'midi-hz': AudioWaveform, 'key-transposer': ArrowLeftRight,
  'chord-finder': Music2, 'scale-finder': BarChart3, 'circle-of-fifths': CircleIcon,
  'chord-progression': Sparkles, 'guitar-chord-diagram': Guitar, 'capo-calculator': Music4,
  'tuning-converter': ListMusic, 'ear-training-quiz': Ear,
};

export default function ToolCard({ tool, featured }: { tool: ToolMeta; featured?: boolean }) {
  const Icon = ICONS[tool.slug] ?? Music2;

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <Link
      href={`/tools/${tool.slug}`}
      onMouseMove={handleMove}
      className={`card-spot ${tool.color === 'coral' ? 'coral' : ''} flex flex-col gap-3.5 rounded-xl2 border border-border bg-bg1 p-5 transition-all hover:-translate-y-1 hover:border-transparent hover:bg-bg2 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tool.color === 'coral' ? 'bg-accent2/15 text-accent2' : 'bg-accent/15 text-accent'}`}>
        <Icon size={19} />
      </div>
      <h3 className="flex items-center gap-2 text-base font-semibold">
        {tool.title}
        {tool.isNew && (
          <span className="rounded-full bg-gradient-to-r from-accent to-accent2 px-2 py-0.5 text-[10px] font-bold text-bg">
            NEW
          </span>
        )}
      </h3>
      <p className="flex-1 text-sm text-textDim">{tool.desc}</p>
      <span className="text-xs text-textFaint">開く →</span>
    </Link>
  );
}
