'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, selectClass, BigResult } from '@/components/ui';
import { NOTES, noteName } from '@/lib/music-theory';

const SHAPES = ['C', 'A', 'G', 'E', 'D'];

export default function CapoCalculator() {
  const [shape, setShape] = useState('C');
  const [fret, setFret] = useState(0);
  const idx = NOTES.indexOf(shape as any);
  const sounding = noteName(idx + fret);

  return (
    <Panel>
      <FieldRow>
        <Field label="押さえているシェイプ（開放コード）" htmlFor="capoShape">
          <select id="capoShape" className={selectClass} value={shape} onChange={(e) => setShape(e.target.value)}>
            {SHAPES.map((s) => <option key={s} value={s}>{s} フォーム</option>)}
          </select>
        </Field>
        <Field label={`カポ位置: ${fret}フレット`} htmlFor="capoFret">
          <input id="capoFret" type="range" min={0} max={9} value={fret} className="w-full accent-accent2"
            onChange={(e) => setFret(Number(e.target.value))} />
        </Field>
      </FieldRow>
      <BigResult value={sounding} label="実際に鳴っているキー" />
    </Panel>
  );
}
