'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, selectClass } from '@/components/ui';
import { TUNINGS } from '@/lib/music-theory';

const LABELS = ['6弦(低)', '5弦', '4弦', '3弦', '2弦', '1弦(高)'];
const STANDARD = TUNINGS['Standard (EADGBE)'];

export default function TuningConverter() {
  const [tuning, setTuning] = useState('Standard (EADGBE)');
  const selected = TUNINGS[tuning];

  return (
    <Panel>
      <FieldRow>
        <Field label="Tuning" labelJa="チューニングの種類" htmlFor="tuningSelect" wide>
          <select id="tuningSelect" className={selectClass} value={tuning} onChange={(e) => setTuning(e.target.value)}>
            {Object.keys(TUNINGS).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </FieldRow>
      <table className="w-full border-collapse font-mono">
        <thead>
          <tr>
            <th className="border-b border-border p-2 text-left font-sans text-xs font-medium text-textDim">String <span className="text-textFaint">弦</span></th>
            <th className="border-b border-border p-2 text-left font-sans text-xs font-medium text-textDim">Standard <span className="text-textFaint">標準</span></th>
            <th className="border-b border-border p-2 text-left font-sans text-xs font-medium text-textDim">Selected <span className="text-textFaint">選択中</span></th>
          </tr>
        </thead>
        <tbody>
          {STANDARD.map((s, i) => (
            <tr key={i}>
              <td className="border-b border-borderSoft p-3 text-base">{LABELS[i]}</td>
              <td className="border-b border-borderSoft p-3 text-base">{s}</td>
              <td className={`border-b border-borderSoft p-3 text-base ${selected[i] !== s ? 'text-accent2' : 'text-text'}`}>{selected[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
