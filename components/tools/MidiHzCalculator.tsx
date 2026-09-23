'use client';
import { useState } from 'react';
import { Panel, FieldRow, Field, inputClass, ResultGrid, ResultCell } from '@/components/ui';
import { midiToHz, hzToMidi, noteName } from '@/lib/music-theory';

export default function MidiHzCalculator() {
  const [midi, setMidi] = useState(69);
  const [hz, setHz] = useState(440);

  function onMidiChange(v: number) {
    setMidi(v);
    setHz(Number(midiToHz(v).toFixed(2)));
  }
  function onHzChange(v: number) {
    setHz(v);
    setMidi(Math.round(hzToMidi(v)));
  }

  const exactMidi = hzToMidi(hz);
  const rounded = Math.round(exactMidi);
  const note = noteName(rounded);
  const octave = Math.floor(rounded / 12) - 1;
  const cents = ((exactMidi - rounded) * 100).toFixed(1);

  return (
    <Panel>
      <FieldRow>
        <Field label="MIDI Note" labelJa="MIDIノート番号 (0–127)" htmlFor="midi">
          <input id="midi" type="number" min={0} max={127} className={inputClass} value={midi}
            onChange={(e) => onMidiChange(Number(e.target.value))} />
        </Field>
        <Field label="Frequency" labelJa="周波数(Hz)" htmlFor="hz">
          <input id="hz" type="number" step={0.01} className={inputClass} value={hz}
            onChange={(e) => onHzChange(Number(e.target.value))} />
        </Field>
      </FieldRow>
      <ResultGrid>
        <ResultCell label="Note" labelJa="音名" value={`${note}${octave}`} />
        <ResultCell label="Frequency" labelJa="周波数" value={hz.toFixed(2)} unit="Hz" />
        <ResultCell label="Cents Offset" labelJa="ズレ幅" value={cents} unit="¢" />
      </ResultGrid>
    </Panel>
  );
}
