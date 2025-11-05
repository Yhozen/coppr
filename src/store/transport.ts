import { create } from 'zustand';
import { strudelEngine } from '../engine/strudel';
import { TransportState } from '../types';

interface TransportStore extends TransportState {
  play: () => void;
  stop: () => void;
  setBPM: (bpm: number) => void;
  setCycle: (cycle: number) => void;
  initialize: () => Promise<void>;
}

export const useTransportStore = create<TransportStore>((set, get) => ({
  isPlaying: false,
  bpm: 120,
  cycle: 0,

  initialize: async () => {
    try {
      await strudelEngine.init();
    } catch (error) {
      console.error('Failed to initialize transport:', error);
    }
  },

  play: () => {
    try {
      strudelEngine.play();
      set({ isPlaying: true });
    } catch (error) {
      console.error('Failed to start playback:', error);
    }
  },

  stop: () => {
    try {
      strudelEngine.stop();
      set({ isPlaying: false, cycle: 0 });
    } catch (error) {
      console.error('Failed to stop playback:', error);
    }
  },

  setBPM: (bpm: number) => {
    try {
      strudelEngine.setBPM(bpm);
      set({ bpm });
    } catch (error) {
      console.error('Failed to set BPM:', error);
    }
  },

  setCycle: (cycle: number) => {
    set({ cycle });
  },
}));
