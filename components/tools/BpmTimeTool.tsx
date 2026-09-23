'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, inputClass, ResultGrid, ResultCell } from '@/components/ui';

const DIVS: Array<[string, string, number]> = [
  ['Whole', '全音符', 4], ['Half', '2分音符', 2], ['Quarter', '4分音符', 1],
  ['Dotted Quarter', '付点4分音符', 1.5], ['Eighth', '8分音符', 0.5], ['Dotted Eighth', '付点8分音符', 0.75],
  ['Eighth Triplet', '8分三連符', 1 / 3], ['Sixteenth', '16分音符', 0.25], ['Sixteenth Triplet', '16分三連符', 1 / 6],
];

export default function BpmTimeTool() {
  const [bpm, setBpm] = useState(120);
  const beat = 60000 / (bpm || 1);

  return (
    <Panel>
      <FieldRow>
        <Field label="BPM" labelJa="テンポ" htmlFor="bpm">
          <input id="bpm" type="number" className={inputClass} value={bpm} min={20} max={300}
            onChange={(e) => setBpm(Number(e.target.value))} />
        </Field>
      </FieldRow>
      <ResultGrid>
        {DIVS.map(([label, ja, mult]) => {
          const ms = beat * mult;
          return (
            <ResultCell key={label} label={label} labelJa={ja} value={ms.toFixed(1)} unit="ms" copyValue={ms.toFixed(1)} />
          );
        })}
      </ResultGrid>
    </Panel>
  );
}
