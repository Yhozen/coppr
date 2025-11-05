import { useEffect, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { usePatternStore } from '../../store/patterns';
import { useTransportStore } from '../../store/transport';
import { debounce } from '../../lib/utils';

export function CodeView() {
  const activePattern = usePatternStore((state) => state.getActivePattern());
  const updatePattern = usePatternStore((state) => state.updatePattern);
  const evaluateActivePattern = usePatternStore((state) => state.evaluateActivePattern);
  const isPlaying = useTransportStore((state) => state.isPlaying);
  const [localCode, setLocalCode] = useState(activePattern?.code || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activePattern) {
      setLocalCode(activePattern.code);
    }
  }, [activePattern?.id]);

  // Debounced code update
  const debouncedUpdate = debounce((code: string) => {
    if (activePattern) {
      updatePattern(activePattern.id, { code });

      // Auto-evaluate if playing
      if (isPlaying) {
        evaluateActivePattern().catch((err) => {
          setError(err.message);
        });
      }
    }
  }, 500);

  const handleCodeChange = (value: string | undefined) => {
    const code = value || '';
    setLocalCode(code);
    setError(null);
    debouncedUpdate(code);
  };

  const handleEvaluate = async () => {
    try {
      setError(null);
      await evaluateActivePattern();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <h2 className="text-sm font-semibold">{activePattern?.name || 'No Pattern'}</h2>
        <button
          onClick={handleEvaluate}
          className="px-3 py-1 text-xs font-medium text-primary-foreground bg-primary rounded hover:bg-primary/90"
        >
          Evaluate (Ctrl+Enter)
        </button>
      </div>

      {error && (
        <div className="px-4 py-2 text-xs text-destructive-foreground bg-destructive border-b border-border">
          Error: {error}
        </div>
      )}

      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={localCode}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            fontLigatures: true,
            lineNumbers: 'on',
            rulers: [],
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
          onMount={(editor, monaco) => {
            // Add keyboard shortcut for evaluate
            editor.addCommand(
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
              handleEvaluate
            );
          }}
        />
      </div>
    </div>
  );
}
