'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, selectClass } from '@/components/ui';
import { NOTES, CHORD_TYPES, CHORD_TYPE_JA, noteName } from '@/lib/music-theory';

export default function ChordFinder() {
  const [root, setRoot] = useState('C');
  const [type, setType] = useState('Major');
  const rootIdx = NOTES.indexOf(root as any);
  const notes = CHORD_TYPES[type].map((iv) => noteName(rootIdx + iv));

  return (
    <Panel>
      <FieldRow>
        <Field label="Root" labelJa="ルート音" htmlFor="chordRoot">
          <select id="chordRoot" className={selectClass} value={root} onChange={(e) => setRoot(e.target.value)}>
            {NOTES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>
        <Field label="Chord Type" labelJa="コードの種類" htmlFor="chordType" wide>
          <select id="chordType" className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
            {Object.keys(CHORD_TYPES).map((t) => <option key={t} value={t}>{t}（{CHORD_TYPE_JA[t]}）</option>)}
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
