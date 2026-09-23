'use client';
import { useState } from 'react';
import { Panel } from '@/components/ui';

const ORDER = ['C','G','D','A','E','B','F#','C#','G#','D#','A#','F'];
const MINORS = ['Am','Em','Bm','F#m','C#m','G#m','D#m','A#m','Fm','Cm','Gm','Dm'];
const cx = 210, cy = 210, rOuter = 170, rInner = 105;

export default function CircleOfFifths() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Panel>
      <div className="flex justify-center py-2">
        <svg viewBox="0 0 420 420" className="w-full max-w-[420px]">
          <circle cx={cx} cy={cy} r={rOuter + 18} fill="none" stroke="#242429" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={rOuter - 18} fill="none" stroke="#242429" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={rInner + 16} fill="none" stroke="#1c1c20" strokeWidth={1} />
          {ORDER.map((n, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = cx + rOuter * Math.cos(angle), y1 = cy + rOuter * Math.sin(angle);
            const x2 = cx + rInner * Math.cos(angle), y2 = cy + rInner * Math.sin(angle);
            const activate = (note: string) => setSelected(note);
            return (
              <g key={n}>
                <text
                  tabIndex={0} role="button" aria-label={`${n} メジャーキー`}
                  onClick={() => activate(n)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(n); } }}
                  x={x1} y={y1} fontFamily="JetBrains Mono, monospace" fontSize={17} fontWeight={600}
                  fill="#f5f5f7" textAnchor="middle" dominantBaseline="middle"
                  className="cursor-pointer outline-none transition-opacity hover:opacity-70 focus:opacity-100"
                  style={selected === n ? { filter: 'drop-shadow(0 0 4px #3fd0ff)' } : undefined}
                >
                  {n}
                </text>
                <text
                  tabIndex={0} role="button" aria-label={`${MINORS[i]} マイナーキー`}
                  onClick={() => activate(MINORS[i])}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(MINORS[i]); } }}
                  x={x2} y={y2} fontFamily="JetBrains Mono, monospace" fontSize={12}
                  fill="#ff7a68" textAnchor="middle" dominantBaseline="middle"
                  className="cursor-pointer outline-none transition-opacity hover:opacity-70 focus:opacity-100"
                >
                  {MINORS[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="text-center text-[13px] text-textDim">
        {selected ? `Selected: ${selected}` : 'キーをクリックすると詳細が表示されます'}
      </div>
    </Panel>
  );
}
