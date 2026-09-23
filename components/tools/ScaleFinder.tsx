'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, selectClass } from '@/components/ui';
import { NOTES, SCALES, SCALE_JA, noteName } from '@/lib/music-theory';

export default function ScaleFinder() {
  const [root, setRoot] = useState('C');
  const [type, setType] = useState('Major (Ionian)');
  const rootIdx = NOTES.indexOf(root as any);
  const notes = SCALES[type].map((iv) => noteName(rootIdx + iv));

  return (
    <Panel>
      <FieldRow>
        <Field label="Root" labelJa="ルート音" htmlFor="scaleRoot">
          <select id="scaleRoot" className={selectClass} value={root} onChange={(e) => setRoot(e.target.value)}>
            {NOTES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>
        <Field label="Scale" labelJa="スケールの種類" htmlFor="scaleType" wide>
          <select id="scaleType" className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
            {Object.keys(SCALES).map((t) => <option key={t} value={t}>{t}（{SCALE_JA[t]}）</option>)}
          </select>
        </Field>
      </FieldRow>
      <div className="mb-3.5 font-mono text-xl font-semibold">{root} {type}</div>
      <div className="flex flex-wrap gap-2">
        {notes.map((n, i) => <span key={i} className="note-pill">{n}</span>)}
      </div>
    </Panel>
  );
}
