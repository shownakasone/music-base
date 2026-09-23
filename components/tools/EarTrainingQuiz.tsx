'use client';
import { useRef, useState } from 'react';
import { Panel } from '@/components/ui';
import { INTERVALS, midiToHz } from '@/lib/music-theory';

function randomQuestion() {
  const iv = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
  const rootMidi = 60 + Math.floor(Math.random() * 6);
  return { iv, rootMidi };
}
function randomOptions(correct: (typeof INTERVALS)[number]) {
  const shuffled = [...INTERVALS].sort(() => Math.random() - 0.5).slice(0, 4);
  if (!shuffled.find((o) => o.name === correct.name)) shuffled[0] = correct;
  return shuffled.sort(() => Math.random() - 0.5);
}

export default function EarTrainingQuiz() {
  const [question, setQuestion] = useState(randomQuestion);
  const [options, setOptions] = useState(() => randomOptions(question.iv));
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [answered, setAnswered] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function playInterval() {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      [question.rootMidi, question.rootMidi + question.iv.semi].forEach((m, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = midiToHz(m);
        const t0 = ctx.currentTime + i * 0.6;
        gain.gain.setValueAtTime(0.001, t0);
        gain.gain.linearRampToValueAtTime(0.18, t0 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.55);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(t0); osc.stop(t0 + 0.55);
      });
    } catch {}
  }

  function answer(name: string) {
    if (answered) return;
    const correct = question.iv.name;
    setAnswered(name);
    setTotal((t) => t + 1);
    if (name === correct) { setScore((s) => s + 1); setFeedback('正解！ 🎉'); }
    else { setFeedback(`不正解… 正解は ${correct}`); }
    setTimeout(() => {
      const q = randomQuestion();
      setQuestion(q); setOptions(randomOptions(q.iv)); setAnswered(null); setFeedback('');
    }, 1200);
  }

  return (
    <Panel>
      <div className="mb-4 font-mono text-sm text-textDim">SCORE {score} / {total}</div>
      <div className="text-center">
        <button onClick={playInterval} className="rounded-full bg-gradient-to-br from-accent to-accent2 px-6 py-3.5 text-sm font-semibold text-bg">
          🔊 音を再生
        </button>
      </div>
      <div className="mt-4.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {options.map((o) => {
          const state = answered === null ? '' : o.name === question.iv.name ? 'correct' : answered === o.name ? 'wrong' : '';
          return (
            <button
              key={o.name}
              onClick={() => answer(o.name)}
              className={`rounded-xl border px-2.5 py-3.5 text-center text-sm transition-colors ${
                state === 'correct' ? 'border-accent bg-accent/15 text-accent'
                : state === 'wrong' ? 'border-accent2 bg-accent2/15 text-accent2'
                : 'border-border bg-bg hover:border-accent'
              }`}
            >
              {o.name}
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-center text-sm text-textDim">{feedback}</div>
    </Panel>
  );
}
