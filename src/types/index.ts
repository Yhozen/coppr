// Pattern types
export interface Pattern {
  id: string;
  name: string;
  code: string;
  createdAt: number;
  updatedAt: number;
}

// Transport state
export interface TransportState {
  isPlaying: boolean;
  bpm: number;
  cycle: number;
}

// Project state
export interface Project {
  id: string;
  name: string;
  patterns: Pattern[];
  createdAt: number;
  updatedAt: number;
}

// Audio node types for graph view
export interface AudioNode {
  id: string;
  type: 'pattern' | 'effect' | 'output';
  data: {
    label: string;
    code?: string;
    effect?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface AudioEdge {
  id: string;
  source: string;
  target: string;
}

// Sample management
export interface Sample {
  id: string;
  name: string;
  url: string;
  buffer?: AudioBuffer;
}

// View types
export type ViewType = 'code' | 'graph' | 'timeline' | 'mixer';
