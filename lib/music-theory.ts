export const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'] as const;
export const NOTES_FLAT = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'] as const;

export function noteName(i: number, flats = false): string {
  const arr = flats ? NOTES_FLAT : NOTES;
  return arr[((i % 12) + 12) % 12];
}

export const CHORD_TYPES: Record<string, number[]> = {
  'Major': [0,4,7], 'Minor': [0,3,7], 'Major 7th': [0,4,7,11], 'Minor 7th': [0,3,7,10],
  'Dominant 7th': [0,4,7,10], 'Diminished': [0,3,6], 'Diminished 7th': [0,3,6,9],
  'Augmented': [0,4,8], 'Sus2': [0,2,7], 'Sus4': [0,5,7], 'Minor 7b5': [0,3,6,10], 'Add9': [0,4,7,14],
};
export const CHORD_TYPE_JA: Record<string, string> = {
  'Major': 'メジャー', 'Minor': 'マイナー', 'Major 7th': 'メジャーセブンス', 'Minor 7th': 'マイナーセブンス',
  'Dominant 7th': 'ドミナントセブンス', 'Diminished': 'ディミニッシュ', 'Diminished 7th': 'ディミニッシュセブンス',
  'Augmented': 'オーギュメント', 'Sus2': 'サスペンデッド2', 'Sus4': 'サスペンデッド4',
  'Minor 7b5': 'マイナーセブンフラットファイブ', 'Add9': 'アドナイン',
};

export const SCALES: Record<string, number[]> = {
  'Major (Ionian)': [0,2,4,5,7,9,11], 'Natural Minor (Aeolian)': [0,2,3,5,7,8,10],
  'Dorian': [0,2,3,5,7,9,10], 'Phrygian': [0,1,3,5,7,8,10], 'Lydian': [0,2,4,6,7,9,11],
  'Mixolydian': [0,2,4,5,7,9,10], 'Locrian': [0,1,3,5,6,8,10],
  'Major Pentatonic': [0,2,4,7,9], 'Minor Pentatonic': [0,3,5,7,10],
  'Blues': [0,3,5,6,7,10], 'Harmonic Minor': [0,2,3,5,7,8,11],
};
export const SCALE_JA: Record<string, string> = {
  'Major (Ionian)': 'メジャースケール', 'Natural Minor (Aeolian)': 'ナチュラルマイナースケール',
  'Dorian': 'ドリアン', 'Phrygian': 'フリジアン', 'Lydian': 'リディアン',
  'Mixolydian': 'ミクソリディアン', 'Locrian': 'ロクリアン',
  'Major Pentatonic': 'メジャーペンタトニック', 'Minor Pentatonic': 'マイナーペンタトニック',
  'Blues': 'ブルーススケール', 'Harmonic Minor': 'ハーモニックマイナー',
};

/** Transpose a space-separated chord progression string by N semitones. */
export function transposeProgression(raw: string, semis: number): string[] {
  const chords = raw.trim().split(/\s+/).filter(Boolean);
  return chords.map((c) => {
    const m = c.match(/^([A-Ga-g])(#|b)?(.*)$/);
    if (!m) return c;
    const root = m[1].toUpperCase();
    const acc = m[2] || '';
    const rest = m[3] || '';
    let idx = NOTES.indexOf((root + (acc === '#' ? '#' : '')) as any);
    if (idx === -1) idx = NOTES_FLAT.indexOf((root + (acc === 'b' ? 'b' : '')) as any);
    if (idx === -1) idx = NOTES.indexOf(root as any);
    const newIdx = ((idx + semis) % 12 + 12) % 12;
    return noteName(newIdx) + rest;
  });
}

export const PROGRESSIONS = {
  major: [
    { name: '定番ポップ', roman: ['I','V','vi','IV'] },
    { name: 'J-POPバラード', roman: ['I','vi','IV','V'] },
    { name: 'ジャズ的循環', roman: ['ii','V','I','vi'] },
    { name: 'アンセム系', roman: ['vi','IV','I','V'] },
    { name: '王道進行', roman: ['IV','V','iii','vi'] },
  ],
  minor: [
    { name: 'マイナー王道', roman: ['i','VI','III','VII'] },
    { name: 'ドラマティック', roman: ['i','iv','v','i'] },
    { name: 'アンダーグラウンド', roman: ['i','VII','VI','VII'] },
    { name: '哀愁進行', roman: ['i','III','VII','iv'] },
  ],
} as const;

export function romanToChord(rootIdx: number, roman: string, mode: 'major'|'minor'): string {
  const degreeSteps = mode === 'major' ? SCALES['Major (Ionian)'] : SCALES['Natural Minor (Aeolian)'];
  const order = mode === 'major' ? ['I','ii','iii','IV','V','vi','vii'] : ['i','ii','III','iv','v','VI','VII'];
  const idx = order.indexOf(roman);
  const semis = idx >= 0 ? degreeSteps[idx] : 0;
  const isMinorChord = roman === roman.toLowerCase() && roman !== 'iii' && roman !== 'vii';
  return noteName(rootIdx + semis) + (isMinorChord ? 'm' : '');
}

export function midiToHz(n: number): number { return 440 * Math.pow(2, (n - 69) / 12); }
export function hzToMidi(f: number): number { return 69 + 12 * Math.log2(f / 440); }

export const BARRE_PATTERNS: Record<string, number[]> = {
  'Major': [0,2,2,1,0,0], 'Minor': [0,2,2,0,0,0], 'Dominant 7th': [0,2,0,1,0,0], 'Minor 7th': [0,2,0,0,0,0],
};
/** Real open-position fingerings, low E to high E. -1 = muted, 0 = open string. */
export const OPEN_SHAPES: Record<string, number[]> = {
  'C-Major': [-1,3,2,0,1,0], 'D-Major': [-1,-1,0,2,3,2], 'G-Major': [3,2,0,0,0,3],
  'A-Major': [-1,0,2,2,2,0], 'E-Major': [0,2,2,1,0,0],
  'A-Minor': [-1,0,2,2,1,0], 'E-Minor': [0,2,2,0,0,0], 'D-Minor': [-1,-1,0,2,3,1],
  'E-Dominant 7th': [0,2,0,1,0,0], 'A-Dominant 7th': [-1,0,2,0,2,0], 'D-Dominant 7th': [-1,-1,0,2,1,2],
  'G-Dominant 7th': [3,2,0,0,0,1], 'C-Dominant 7th': [-1,3,2,3,1,0],
  'A-Minor 7th': [-1,0,2,0,1,0], 'E-Minor 7th': [0,2,0,0,0,0],
};

export const TUNINGS: Record<string, string[]> = {
  'Standard (EADGBE)': ['E2','A2','D3','G3','B3','E4'],
  'Drop D': ['D2','A2','D3','G3','B3','E4'],
  'Drop C': ['C2','G2','C3','F3','A3','D4'],
  'Half Step Down (Eb)': ['Eb2','Ab2','Db3','Gb3','Bb3','Eb4'],
  'Whole Step Down (D)': ['D2','G2','C3','F3','A3','D4'],
  'Open G': ['D2','G2','D3','G3','B3','D4'],
  'Open D': ['D2','A2','D3','F#3','A3','D4'],
  'DADGAD': ['D2','A2','D3','G3','A3','D4'],
};

export const INTERVALS = [
  { name: 'Minor 2nd', semi: 1 }, { name: 'Major 2nd', semi: 2 }, { name: 'Minor 3rd', semi: 3 },
  { name: 'Major 3rd', semi: 4 }, { name: 'Perfect 4th', semi: 5 }, { name: 'Tritone', semi: 6 },
  { name: 'Perfect 5th', semi: 7 }, { name: 'Major 6th', semi: 9 }, { name: 'Minor 7th', semi: 10 },
  { name: 'Octave', semi: 12 },
];
