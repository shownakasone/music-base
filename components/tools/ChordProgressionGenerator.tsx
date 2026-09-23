'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, selectClass } from '@/components/ui';
import { NOTES, PROGRESSIONS, romanToChord } from '@/lib/music-theory';

export default function ChordProgressionGenerator() {
  const [key, setKey] = useState('C');
  const [mode, setMode] = useState<'major' | 'minor'>('major');
  const [patIdx, setPatIdx] = useState(0);
  const patterns = PROGRESSIONS[mode];
  const pattern = patterns[patIdx] ?? patterns[0];
  const rootIdx = NOTES.indexOf(key as any);
  const chords = pattern.roman.map((r) => romanToChord(rootIdx, r, mode));

  return (
    <Panel>
      <FieldRow>
        <Field label="Key" labelJa="キー" htmlFor="progKey">
          <select id="progKey" className={selectClass} value={key} onChange={(e) => setKey(e.target.value)}>
            {NOTES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>
        <Field label="Mode" labelJa="メジャー/マイナー" htmlFor="progMode">
          <select id="progMode" className={selectClass} value={mode}
            onChange={(e) => { setMode(e.target.value as 'major' | 'minor'); setPatIdx(0); }}>
            <option value="major">Major（メジャー）</option>
            <option value="minor">Minor（マイナー）</option>
          </select>
        </Field>
        <Field label="Pattern" labelJa="進行パターン" htmlFor="progPattern" wide>
          <select id="progPattern" className={selectClass} value={patIdx} onChange={(e) => setPatIdx(Number(e.target.value))}>
            {patterns.map((p, i) => <option key={p.name} value={i}>{p.name} ({p.roman.join('-')})</option>)}
          </select>
        </Field>
      </FieldRow>
      <div className="mt-5 flex flex-wrap gap-2.5">
        {chords.map((c, i) => (
          <div key={i} className="min-w-[80px] rounded-xl border border-border bg-bg px-5 py-5 text-center transition-transform hover:-translate-y-0.5 hover:border-accent2">
            <div className="font-mono text-xl font-semibold">{c}</div>
            <div className="mt-1.5 text-[11px] text-textDim">{pattern.roman[i]}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
