import * as Tone from 'tone';

// Audio engine singleton
class AudioEngine {
  private static instance: AudioEngine | null = null;
  private initialized = false;

  private constructor() {}

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      await Tone.start();
      console.log('Audio engine initialized');
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getBPM(): number {
    return Tone.getTransport().bpm.value;
  }

  setBPM(bpm: number): void {
    Tone.getTransport().bpm.value = bpm;
  }

  getCurrentTime(): number {
    return Tone.getTransport().seconds;
  }

  stop(): void {
    Tone.getTransport().stop();
  }
}

export const audioEngine = AudioEngine.getInstance();
