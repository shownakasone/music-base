'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, selectClass } from '@/components/ui';
import { NOTES, BARRE_PATTERNS, OPEN_SHAPES, CHORD_TYPE_JA } from '@/lib/music-theory';

function stringX(i: number) { return 30 + i * 36; }
function fretY(f: number) { return 50 + f * 38; }

function OpenShapeSvg({ frets }: { frets: number[] }) {
  const windowFrets = Math.max(3, ...frets.filter((f) => f > 0), 0);
  return (
    <svg viewBox={`0 0 210 ${50 + windowFrets * 38 + 30}`} width={220}>
      {[0,1,2,3,4,5].map((s) => (
        <line key={s} x1={stringX(s)} y1={40} x2={stringX(s)} y2={fretY(windowFrets)} stroke="#3a3a42" strokeWidth={1.5} />
      ))}
      {Array.from({ length: windowFrets + 1 }).map((_, f) => (
        <line key={f} x1={stringX(0)} y1={fretY(f)} x2={stringX(5)} y2={fretY(f)} stroke="#3a3a42" strokeWidth={f === 0 ? 3 : 1} />
      ))}
      {frets.map((f, i) => {
        if (f === -1) return <text key={i} x={stringX(i)} y={30} fontFamily="JetBrains Mono, monospace" fontSize={14} fill="#ff7a68" textAnchor="middle">×</text>;
        if (f === 0) return <circle key={i} cx={stringX(i)} cy={30} r={5} fill="none" stroke="#3fd0ff" strokeWidth={2} />;
        return <circle key={i} cx={stringX(i)} cy={fretY(f - 0.5)} r={9} fill="#3fd0ff" />;
      })}
    </svg>
  );
}

function BarreShapeSvg({ root, type }: { root: string; type: string }) {
  const rootIdx = NOTES.indexOf(root as any);
  const eIdx = NOTES.indexOf('E' as any);
  const r = ((rootIdx - eIdx) % 12 + 12) % 12;
  const pattern = BARRE_PATTERNS[type];
  const windowFrets = 5;
  return (
    <svg viewBox={`0 0 210 ${50 + windowFrets * 38 + 30}`} width={220}>
      {[0,1,2,3,4,5].map((s) => (
        <line key={s} x1={stringX(s)} y1={40} x2={stringX(s)} y2={fretY(windowFrets)} stroke="#3a3a42" strokeWidth={1.5} />
      ))}
      {Array.from({ length: windowFrets + 1 }).map((_, f) => (
        <line key={f} x1={stringX(0)} y1={fretY(f)} x2={stringX(5)} y2={fretY(f)} stroke="#3a3a42" strokeWidth={f === 0 && r === 0 ? 3 : 1} />
      ))}
      <text x={8} y={fretY(0.5) + 4} fontFamily="JetBrains Mono, monospace" fontSize={11} fill="#9a9aa2">{r === 0 ? 'open' : r}</text>
      {r > 0 && <rect x={stringX(0) - 6} y={fretY(0.5) - 9} width={stringX(5) - stringX(0) + 12} height={18} rx={9} fill="#ff7a68" opacity={0.85} />}
      {pattern.map((off, i) => {
        if (off === 0) return r === 0 ? <circle key={i} cx={stringX(i)} cy={30} r={5} fill="none" stroke="#3fd0ff" strokeWidth={2} /> : null;
        return <circle key={i} cx={stringX(i)} cy={fretY(off - 0.5)} r={9} fill="#3fd0ff" />;
      })}
    </svg>
  );
}

export default function GuitarChordDiagram() {
  const [root, setRoot] = useState('C');
  const [type, setType] = useState('Major');
  const openKey = `${root}-${type}`;
  const openShape = OPEN_SHAPES[openKey];
  const rootIdx = NOTES.indexOf(root as any);
  const eIdx = NOTES.indexOf('E' as any);
  const barreFret = ((rootIdx - eIdx) % 12 + 12) % 12;

  return (
    <Panel>
      <FieldRow>
        <Field label="Root" labelJa="ルート音" htmlFor="diaRoot">
          <select id="diaRoot" className={selectClass} value={root} onChange={(e) => setRoot(e.target.value)}>
            {NOTES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </Field>
        <Field label="Chord Type" labelJa="コードの種類" htmlFor="diaType" wide>
          <select id="diaType" className={selectClass} value={type} onChange={(e) => setType(e.target.value)}>
            {Object.keys(BARRE_PATTERNS).map((t) => <option key={t} value={t}>{t}（{CHORD_TYPE_JA[t]}）</option>)}
          </select>
        </Field>
      </FieldRow>
      <div className="flex justify-center py-2.5">
        {openShape ? <OpenShapeSvg frets={openShape} /> : <BarreShapeSvg root={root} type={type} />}
      </div>
      <div className="mt-2.5 text-center text-[13px] text-textDim">
        {root} {type} —{' '}
        {openShape ? 'Open Chord（開放コード）' : barreFret === 0 ? 'Open Chord（開放コード）' : `Barre Chord（バレーコード・${barreFret}フレット）`}
      </div>
    </Panel>
  );
}
