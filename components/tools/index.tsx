import dynamic from 'next/dynamic';

export const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'bpm-time-tool': dynamic(() => import('./BpmTimeTool')),
  'metronome': dynamic(() => import('./Metronome')),
  'lufs-calculator': dynamic(() => import('./LufsCalculator')),
  'practice-timer': dynamic(() => import('./PracticeTimer')),
  'midi-hz': dynamic(() => import('./MidiHzCalculator')),
  'key-transposer': dynamic(() => import('./KeyTransposer')),
  'chord-finder': dynamic(() => import('./ChordFinder')),
  'scale-finder': dynamic(() => import('./ScaleFinder')),
  'circle-of-fifths': dynamic(() => import('./CircleOfFifths')),
  'chord-progression': dynamic(() => import('./ChordProgressionGenerator')),
  'guitar-chord-diagram': dynamic(() => import('./GuitarChordDiagram')),
  'capo-calculator': dynamic(() => import('./CapoCalculator')),
  'tuning-converter': dynamic(() => import('./TuningConverter')),
  'ear-training-quiz': dynamic(() => import('./EarTrainingQuiz')),
};
