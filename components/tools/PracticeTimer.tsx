'use client';
import { useEffect, useRef, useState } from 'react';
import { Panel } from '@/components/ui';

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function PracticeTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [streak, setStreak] = useState(0);
  const [sessions, setSessions] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      setStreak(parseInt(localStorage.getItem('mb_streak') || '0', 10));
      setSessions(parseInt(localStorage.getItem('mb_sessions') || '0', 10));
    } catch {}
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function toggle() {
    if (timerRef.current) {
      clearInterval(timerRef.current); timerRef.current = null; setRunning(false);
      if (seconds >= 60) {
        try {
          const mins = Math.floor(seconds / 60);
          const newStreak = streak + mins;
          const newSessions = sessions + 1;
          localStorage.setItem('mb_streak', String(newStreak));
          localStorage.setItem('mb_sessions', String(newSessions));
          setStreak(newStreak); setSessions(newSessions);
        } catch {}
      }
    } else {
      setRunning(true);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  }

  function reset() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; setRunning(false); }
    setSeconds(0);
  }

  return (
    <Panel>
      <div className="py-5 text-center">
        <div className="font-mono text-[clamp(48px,10vw,72px)] font-semibold">{fmt(seconds)}</div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={toggle} className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-bg">
          {running ? '■' : '▶'}
        </button>
        <button onClick={reset} className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent">
          ↺
        </button>
      </div>
      <div className="mt-6 flex justify-center gap-5 text-[13px] text-textDim">
        <div>合計セッション: <b className="font-mono text-accent2">{sessions}</b></div>
        <div>累計練習: <b className="font-mono text-accent2">{streak}</b> 分</div>
      </div>
    </Panel>
  );
}
