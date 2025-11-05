// Type declarations for Strudel packages
declare module '@strudel/core' {
  export function repl(options: any): any;
}

declare module '@strudel/tonal';

declare module '@strudel/mini';

declare module '@strudel/webaudio' {
  export function webaudioOutput(options?: any): any;
  export function initAudioOnFirstClick(): void;
}
