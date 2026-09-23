export type ToolCategory = 'GUITAR' | 'DTM' | 'THEORY' | 'COMPOSITION' | 'PLAY';

export interface ToolMeta {
  slug: string;
  cat: ToolCategory;
  title: string;
  desc: string;
  color: 'cyan' | 'coral';
  isNew?: boolean;
}

export const CAT_JA: Record<ToolCategory, string> = {
  GUITAR: 'ギター',
  DTM: 'DTM・宅録',
  THEORY: '音楽理論',
  COMPOSITION: '作曲',
  PLAY: '遊んで学ぶ',
};

export const TOOLS: ToolMeta[] = [
  { slug: 'bpm-time-tool', cat: 'DTM', title: 'BPM Time Tool', desc: 'BPMからディレイ・ノート単位の時間(ms)をまとめて計算', color: 'cyan' },
  { slug: 'metronome', cat: 'DTM', title: 'Metronome', desc: 'タップテンポ対応のメトロノーム', color: 'coral', isNew: true },
  { slug: 'lufs-calculator', cat: 'DTM', title: 'LUFS Calculator', desc: '配信プラットフォーム基準への音量調整量を確認', color: 'cyan' },
  { slug: 'practice-timer', cat: 'DTM', title: 'Practice Timer', desc: '練習時間を計測してストリークを記録', color: 'coral', isNew: true },
  { slug: 'midi-hz', cat: 'DTM', title: 'MIDI ↔ Hz Calculator', desc: 'MIDIノート番号と周波数を相互変換', color: 'cyan' },
  { slug: 'key-transposer', cat: 'THEORY', title: 'Key Transposer', desc: 'コード進行を任意の半音数で移調', color: 'cyan' },
  { slug: 'chord-finder', cat: 'THEORY', title: 'Chord Finder', desc: 'コードの構成音を検索', color: 'cyan' },
  { slug: 'scale-finder', cat: 'THEORY', title: 'Scale Finder', desc: 'スケールの構成音を検索', color: 'cyan' },
  { slug: 'circle-of-fifths', cat: 'THEORY', title: 'Circle of Fifths', desc: '五度圏でキーの関係を確認', color: 'cyan' },
  { slug: 'chord-progression', cat: 'COMPOSITION', title: 'Chord Progression Generator', desc: 'キーとムードからコード進行を生成', color: 'coral' },
  { slug: 'guitar-chord-diagram', cat: 'GUITAR', title: 'Guitar Chord Diagram', desc: 'コードの指板図（フレット・フォーム）を表示', color: 'coral', isNew: true },
  { slug: 'capo-calculator', cat: 'GUITAR', title: 'Capo Calculator', desc: 'カポ位置から実音キーを計算', color: 'coral', isNew: true },
  { slug: 'tuning-converter', cat: 'GUITAR', title: 'Tuning Converter', desc: 'レギュラーチューニングから変則チューニングへ変換', color: 'coral' },
  { slug: 'ear-training-quiz', cat: 'PLAY', title: 'Ear Training Quiz', desc: '2音を聴いて音程(インターバル)を当てる', color: 'coral', isNew: true },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
