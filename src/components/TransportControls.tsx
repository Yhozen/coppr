import { useState } from 'react';
import { Play, Square } from 'lucide-react';
import { useTransportStore } from '../store/transport';
import { usePatternStore } from '../store/patterns';

export function TransportControls() {
  const { isPlaying, bpm, play, stop, setBPM } = useTransportStore();
  const evaluateActivePattern = usePatternStore((state) => state.evaluateActivePattern);
  const [bpmInput, setBpmInput] = useState(bpm.toString());
  const [error, setError] = useState<string | null>(null);

  const handlePlay = async () => {
    try {
      setError(null);
      // Evaluate the pattern first
      await evaluateActivePattern();
      // Then start playback
      play();
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to play:', err);
    }
  };

  const handleStop = () => {
    stop();
    setError(null);
  };

  const handleBPMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBpmInput(value);

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 20 && numValue <= 300) {
      setBPM(numValue);
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-border bg-card">
      {/* Play/Stop buttons */}
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded hover:bg-primary/90 transition-colors"
            title="Play (Ctrl+Space)"
          >
            <Play size={16} />
            Play
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-destructive rounded hover:bg-destructive/90 transition-colors"
            title="Stop (Ctrl+Space)"
          >
            <Square size={16} />
            Stop
          </button>
        )}
      </div>

      {/* BPM Control */}
      <div className="flex items-center gap-2">
        <label htmlFor="bpm" className="text-sm font-medium text-foreground">
          BPM
        </label>
        <input
          id="bpm"
          type="number"
          min="20"
          max="300"
          value={bpmInput}
          onChange={handleBPMChange}
          className="w-16 px-2 py-1 text-sm text-foreground bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Error display */}
      {error && (
        <div className="flex-1 text-sm text-destructive-foreground">
          Error: {error}
        </div>
      )}

      {/* Status indicator */}
      <div className="ml-auto flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isPlaying ? 'bg-green-500 animate-pulse' : 'bg-muted'
          }`}
        />
        <span className="text-xs text-muted-foreground">
          {isPlaying ? 'Playing' : 'Stopped'}
        </span>
      </div>
    </div>
  );
}
