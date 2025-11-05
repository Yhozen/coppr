import { create } from 'zustand';
import { Pattern } from '../types';
import { generateId } from '../lib/utils';
import { strudelEngine } from '../engine/strudel';

interface PatternStore {
  patterns: Pattern[];
  activePatternId: string | null;

  addPattern: (name: string, code: string) => void;
  updatePattern: (id: string, updates: Partial<Pattern>) => void;
  deletePattern: (id: string) => void;
  setActivePattern: (id: string) => void;
  getActivePattern: () => Pattern | null;
  evaluateActivePattern: () => Promise<void>;
}

const DEFAULT_PATTERN = `// Welcome to Coppr!
// Write Strudel patterns to create music

s("bd sd, ~ cp, [hh hh]*4")
  .bank('RolandTR909')`;

export const usePatternStore = create<PatternStore>((set, get) => ({
  patterns: [
    {
      id: 'default',
      name: 'Pattern 1',
      code: DEFAULT_PATTERN,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
  activePatternId: 'default',

  addPattern: (name: string, code: string) => {
    const newPattern: Pattern = {
      id: generateId(),
      name,
      code,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    set((state) => ({
      patterns: [...state.patterns, newPattern],
    }));
  },

  updatePattern: (id: string, updates: Partial<Pattern>) => {
    set((state) => ({
      patterns: state.patterns.map((p) =>
        p.id === id
          ? { ...p, ...updates, updatedAt: Date.now() }
          : p
      ),
    }));
  },

  deletePattern: (id: string) => {
    set((state) => {
      const newPatterns = state.patterns.filter((p) => p.id !== id);
      const newActiveId =
        state.activePatternId === id
          ? newPatterns[0]?.id || null
          : state.activePatternId;

      return {
        patterns: newPatterns,
        activePatternId: newActiveId,
      };
    });
  },

  setActivePattern: (id: string) => {
    set({ activePatternId: id });
  },

  getActivePattern: () => {
    const { patterns, activePatternId } = get();
    return patterns.find((p) => p.id === activePatternId) || null;
  },

  evaluateActivePattern: async () => {
    const activePattern = get().getActivePattern();
    if (!activePattern) {
      throw new Error('No active pattern');
    }

    try {
      await strudelEngine.evaluateCode(activePattern.code);
    } catch (error) {
      console.error('Failed to evaluate pattern:', error);
      throw error;
    }
  },
}));
