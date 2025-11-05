import { useEffect } from 'react';
import { Code, GitGraph, Clock, Sliders } from 'lucide-react';
import { TransportControls } from './components/TransportControls';
import { CodeView } from './components/views/CodeView';
import { GraphView } from './components/views/GraphView';
import { TimelineView } from './components/views/TimelineView';
import { MixerView } from './components/views/MixerView';
import { useProjectStore } from './store/project';
import { useTransportStore } from './store/transport';
import { ViewType } from './types';
import { cn } from './lib/utils';

const views = [
  { id: 'code' as ViewType, name: 'Code', icon: Code, component: CodeView },
  { id: 'graph' as ViewType, name: 'Graph', icon: GitGraph, component: GraphView },
  { id: 'timeline' as ViewType, name: 'Timeline', icon: Clock, component: TimelineView },
  { id: 'mixer' as ViewType, name: 'Mixer', icon: Sliders, component: MixerView },
];

export function App() {
  const currentView = useProjectStore((state) => state.currentView);
  const setCurrentView = useProjectStore((state) => state.setCurrentView);
  const initialize = useTransportStore((state) => state.initialize);

  // Initialize audio engine on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const CurrentViewComponent = views.find((v) => v.id === currentView)?.component || CodeView;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <h1 className="text-xl font-bold">Coppr</h1>
        <p className="text-sm text-muted-foreground">Code-First DAW</p>
      </header>

      {/* Transport Controls */}
      <TransportControls />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* View Tabs */}
        <aside className="w-16 border-r border-border bg-card flex flex-col items-center py-4 gap-2">
          {views.map((view) => {
            const Icon = view.icon;
            const isActive = currentView === view.id;

            return (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={cn(
                  'flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-muted-foreground hover:text-accent-foreground'
                )}
                title={view.name}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{view.name}</span>
              </button>
            );
          })}
        </aside>

        {/* View Content */}
        <main className="flex-1 overflow-hidden">
          <CurrentViewComponent />
        </main>
      </div>
    </div>
  );
}
