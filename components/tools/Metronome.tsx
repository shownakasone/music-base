'use client';
import { useEffect, useRef, useState } from 'react';
import { Panel, Field, inputClass } from '@/components/ui';

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [beatFlash, setBeatFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const beatCountRef = useRef(0);
  const tapTimesRef = useRef<number[]>([]);

  function beep(accent: boolean) {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = accent ? 1400 : 900;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  function stop() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setPlaying(false);
  }

  function toggle() {
    if (timerRef.current) { stop(); return; }
    beatCountRef.current = 0;
    const interval = 60000 / bpm;
    const tick = () => {
      const accent = beatCountRef.current % 4 === 0;
      beep(accent);
      setBeatFlash(true);
      setTimeout(() => setBeatFlash(false), 90);
      beatCountRef.current++;
    };
    tick();
    timerRef.current = setInterval(tick, interval);
    setPlaying(true);
  }

  function tap() {
    const now = Date.now();
    tapTimesRef.current = [...tapTimesRef.current, now].filter((t) => now - t < 3000);
    if (tapTimesRef.current.length > 1) {
      const intervals = tapTimesRef.current.slice(1).map((t, i) => t - tapTimesRef.current[i]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      setBpm(Math.round(60000 / avg));
    }
  }

  // stop the interval whenever the user navigates away from this page
  useEffect(() => stop, []);

  return (
    <Panel>
      <div className="flex flex-col items-center gap-6 py-4">
        <div
          className={`flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 font-mono text-[15px] text-textDim transition-all duration-75 ${
            beatFlash ? 'scale-[1.12] border-accent2 shadow-[0_0_34px_rgba(255,122,104,.55)]' : 'border-accent'
          }`}
          style={{ background: 'radial-gradient(circle at 35% 30%, #18181c, #0a0a0c)' }}
        >
          ♩ = {bpm}
        </div>
        <div className="w-full max-w-[280px]">
          <Field label="BPM" labelJa="テンポ" htmlFor="metroBpm">
            <input id="metroBpm" type="number" className={inputClass} value={bpm} min={30} max={300}
              onChange={(e) => { const v = Number(e.target.value); setBpm(v); if (playing) { stop(); } }} />
          </Field>
        </div>
        <div className="flex gap-3">
          <button onClick={tap} className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border text-sm hover:border-accent hover:text-accent">
            TAP
          </button>
          <button onClick={toggle} className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-bg">
            {playing ? '■' : '▶'}
          </button>
        </div>
      </div>
    </Panel>
  );
}
