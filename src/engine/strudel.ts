import { repl } from '@strudel/core';
import '@strudel/tonal';
import { initAudioOnFirstClick, webaudioOutput } from '@strudel/webaudio';
import { audioEngine } from './audio';

// Strudel REPL singleton
class StrudelEngine {
  private static instance: StrudelEngine | null = null;
  private repl: any;
  private initialized = false;
  private currentPattern: any = null;

  private constructor() {}

  static getInstance(): StrudelEngine {
    if (!StrudelEngine.instance) {
      StrudelEngine.instance = new StrudelEngine();
    }
    return StrudelEngine.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize audio engine first
      await audioEngine.init();

      // Initialize Strudel REPL
      this.repl = repl({
        defaultOutput: webaudioOutput,
      });

      // Set up audio context activation on first click
      initAudioOnFirstClick();

      console.log('Strudel engine initialized');
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Strudel engine:', error);
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async evaluateCode(code: string): Promise<void> {
    if (!this.initialized) {
      throw new Error('Strudel engine not initialized');
    }

    try {
      // Stop current pattern if playing
      if (this.currentPattern) {
        this.stop();
      }

      // Evaluate the new code
      this.currentPattern = await this.repl.evaluate(code);
      console.log('Code evaluated successfully');
    } catch (error) {
      console.error('Failed to evaluate code:', error);
      throw error;
    }
  }

  play(): void {
    if (!this.initialized) {
      throw new Error('Strudel engine not initialized');
    }

    if (!this.currentPattern) {
      throw new Error('No pattern to play');
    }

    try {
      this.repl.start();
      console.log('Playback started');
    } catch (error) {
      console.error('Failed to start playback:', error);
      throw error;
    }
  }

  stop(): void {
    if (!this.initialized) return;

    try {
      this.repl.stop();
      console.log('Playback stopped');
    } catch (error) {
      console.error('Failed to stop playback:', error);
    }
  }

  isPlaying(): boolean {
    return this.repl?.scheduler?.started || false;
  }

  setBPM(bpm: number): void {
    audioEngine.setBPM(bpm);
  }

  getBPM(): number {
    return audioEngine.getBPM();
  }
}

export const strudelEngine = StrudelEngine.getInstance();
