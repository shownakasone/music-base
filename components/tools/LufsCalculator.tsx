'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, inputClass, selectClass, BigResult } from '@/components/ui';

export default function LufsCalculator() {
  const [current, setCurrent] = useState(-9);
  const [target, setTarget] = useState(-14);
  const gain = target - current;

  return (
    <Panel>
      <FieldRow>
        <Field label="現在のLUFS" labelJa="今の音量の大きさ" htmlFor="lufsCurrent">
          <input id="lufsCurrent" type="number" step={0.1} className={inputClass} value={current}
            onChange={(e) => setCurrent(Number(e.target.value))} />
        </Field>
        <Field label="ターゲット" labelJa="配信先の基準" htmlFor="lufsTarget">
          <select id="lufsTarget" className={selectClass} value={target} onChange={(e) => setTarget(Number(e.target.value))}>
            <option value={-14}>Spotify / YouTube (-14 LUFS)</option>
            <option value={-16}>Apple Music (-16 LUFS)</option>
            <option value={-9}>CD / Loud Master (-9 LUFS)</option>
          </select>
        </Field>
      </FieldRow>
      <BigResult value={`${gain >= 0 ? '+' : ''}${gain.toFixed(1)} dB`} label="必要なゲイン調整量" />
    </Panel>
  );
}
