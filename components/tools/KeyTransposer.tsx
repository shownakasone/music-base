'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, inputClass } from '@/components/ui';
import { transposeProgression } from '@/lib/music-theory';

export default function KeyTransposer() {
  const [input, setInput] = useState('C G Am F');
  const [semis, setSemis] = useState(0);
  const out = transposeProgression(input, semis);

  return (
    <Panel>
      <FieldRow>
        <Field label="コード進行（スペース区切り、例: C G Am F）" htmlFor="chords" wide>
          <input id="chords" type="text" className={`${inputClass} text-lg`} value={input}
            onChange={(e) => setInput(e.target.value)} />
        </Field>
        <Field label={`移調（半音）: ${semis > 0 ? '+' : ''}${semis}`} htmlFor="semis">
          <input id="semis" type="range" min={-11} max={11} value={semis} className="w-full accent-accent2"
            onChange={(e) => setSemis(Number(e.target.value))} />
        </Field>
      </FieldRow>
      <div className="mt-4 flex flex-wrap gap-2">
        {out.map((c, i) => (
          <span key={i} className="note-pill coral">{c}</span>
        ))}
      </div>
    </Panel>
  );
}
