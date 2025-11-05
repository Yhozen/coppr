# Coppr DAW - Architecture Plan (Improved)

## 🎯 Vision

**A code-first DAW where code is the primary creative interface, enhanced by visual tools.**

Traditional DAWs force you into a mouse-driven workflow. Coppr flips this: **write patterns in code**, then use visual tools for sound design, mixing, and arrangement.

## 📐 Architecture Improvements

### ✅ What's Great in Your Plan

1. **Modular block system** - Excellent for extensibility
2. **ReactFlow for visual patching** - Perfect choice
3. **Tone.js audio engine** - Battle-tested
4. **shadcn/ui** - Professional polish
5. **Auto-boot graph** - Great first impression
6. **Progressive discovery UX** - Essential for adoption

### 🔧 Critical Additions

#### 1. **Proper Strudel Integration**

**Current gap:** Plan mentions "Strudel-style" but not actual Strudel.

**Solution:**
```typescript
// Install actual Strudel packages
@strudel/core          // Pattern evaluation
@strudel/webaudio      // Web Audio integration
@strudel/mini          // Mini-notation parser
@strudel/tonal         // Music theory helpers
@strudel/transpiler    // Code → Pattern compiler
```

**Integration approach:**
- Use Strudel's pattern evaluation engine directly
- Bridge Strudel patterns to ReactFlow nodes
- Allow both code blocks AND visual nodes
- Strudel handles scheduling, we add visual editing

#### 2. **Code Editor Upgrade**

**Current:** Draft.js (not ideal for code)

**Recommended:** Monaco Editor (VS Code's editor)
- Syntax highlighting for Strudel patterns
- IntelliSense / autocomplete
- Error indicators
- Multi-cursor editing
- Already TypeScript-friendly

**Alternative:** CodeMirror 6 (lighter weight)

#### 3. **Tauri-Specific Considerations**

**Audio APIs:**
```json
// tauri.conf.json allowlist
{
  "fs": {
    "readFile": true,
    "writeFile": true,
    "readDir": true,
    "scope": ["$APPDATA/coppr/*", "$AUDIO/*"]
  },
  "dialog": {
    "open": true,
    "save": true
  },
  "shell": {
    "open": true
  }
}
```

**Sample Loading:**
- Use Tauri's `fs` API to read local audio files
- Convert to base64 or use `convertFileSrc()` for Tone.js
- Cache samples in IndexedDB for performance

**Project Files:**
- Save/Load project state as JSON
- Use Tauri's dialog API for file pickers
- Auto-save to prevent data loss

#### 4. **MIDI Support** (Missing from original plan)

```typescript
// Web MIDI API
@strudel/midi          // MIDI input/output
```

**Features:**
- MIDI clock sync
- MIDI controller mapping (knobs/faders → parameters)
- MIDI note input for instruments
- External synth control

#### 5. **Timeline/Sequencer View** (Critical for DAW)

**Add to block types:**
```typescript
Block Types:
  Pattern:Code      // Strudel code block
  Pattern:Visual    // Piano roll / step sequencer
  Clip:Audio        // Audio clip with waveform
  Clip:MIDI         // MIDI clip
  Scene:Launcher    // Ableton-style scene launcher
```

**Timeline UI:**
- Horizontal time ruler
- Vertical track lanes
- Clip arrangement
- Zoom controls
- Playhead / loop region

#### 6. **Audio Recording & Rendering**

**Recording:**
```typescript
// Use MediaRecorder + Tone.js Recorder
import { Recorder } from 'tone';

const recorder = new Recorder();
Tone.Destination.connect(recorder);
```

**Export:**
- Render to WAV/MP3
- Offline rendering for bounce
- Use Tauri's fs API to save files
- Progress bar during render

#### 7. **Sample Management System**

**Sample Browser:**
- Drag & drop samples into app
- Sample preview player
- Tag/search system
- Built-in sample packs (kick, snare, etc.)
- Waveform visualization

**Storage:**
```typescript
// IndexedDB for samples
import Dexie from 'dexie';

class SampleDatabase extends Dexie {
  samples!: Table<Sample>;

  constructor() {
    super('CopprSamples');
    this.version(1).stores({
      samples: '++id, name, tags, buffer'
    });
  }
}
```

#### 8. **Effect Chains** (Expand on original)

**Audio Effects:**
```typescript
Effects:
  Filter (LP/HP/BP/Notch)
  Reverb
  Delay
  Distortion
  Compressor
  EQ (3-band, parametric)
  Chorus/Flanger/Phaser
  BitCrusher
  Ping-Pong Delay
```

**Visual Routing:**
- Drag effects onto track/instrument
- Serial/parallel processing
- Wet/dry mix controls
- Bypass toggles

#### 9. **Mixer View**

**Features:**
- Per-track volume/pan
- Mute/solo buttons
- Send/return buses
- Master channel
- VU meters
- Groups/busses

#### 10. **Preset System** (Expand on original)

**Preset Types:**
- Instrument presets
- Effect chains
- Pattern templates
- Full project templates

**UX:**
- Preset browser with tags
- Save current state as preset
- Import/export presets
- Community preset sharing (future)

---

## 🎨 Enhanced UX Flow

### Three-Pane Layout

```
┌─────────────────────────────────────────────────────────┐
│  Toolbar: Transport | BPM | Save/Load | View Modes      │
├──────────┬──────────────────────────────┬───────────────┤
│          │                              │               │
│  Block   │   Main Canvas                │   Inspector   │
│  Library │   (ReactFlow Graph           │   (Selected   │
│          │    OR Timeline View          │    Block      │
│  Patterns│    OR Mixer View)            │    Props)     │
│  Instru- │                              │               │
│  ments   │   [Switch via tabs]          │   Parameters  │
│  Effects │                              │   Automation  │
│  Clips   │                              │               │
│          │                              │               │
└──────────┴──────────────────────────────┴───────────────┘
```

### View Modes (Tabs)

1. **Graph View** (ReactFlow) - Modular patching
2. **Timeline View** - Linear arrangement
3. **Mixer View** - Mixing console
4. **Code View** - Full-screen Strudel editor

### Keyboard-First Workflow

```
Space        - Play/Pause
Cmd/Ctrl+S   - Save project
Cmd/Ctrl+E   - Export audio
Tab          - Switch views
Cmd/Ctrl+N   - New pattern block
Cmd/Ctrl+/   - Command palette
```

---

## 📦 Revised Library Stack

### Audio Engine

```json
{
  "@strudel/core": "^1.0.0",
  "@strudel/webaudio": "^1.0.0",
  "@strudel/mini": "^1.0.0",
  "@strudel/tonal": "^1.0.0",
  "@strudel/transpiler": "^1.0.0",
  "tone": "^14.7.77",
  "superdough": "latest"  // Strudel's sampler
}
```

### Code Editor

```json
{
  "@monaco-editor/react": "^4.6.0"  // VS Code editor
}
```

### Graph/UI

```json
{
  "reactflow": "^11.10.0",
  "shadcn/ui": "latest",
  "tailwindcss": "^3.4.0"
}
```

### Storage/Files

```json
{
  "dexie": "^3.2.4",           // IndexedDB wrapper
  "@tauri-apps/api": "^1.5.3"  // File system APIs
}
```

### Utilities

```json
{
  "zustand": "^4.4.7",          // State management
  "immer": "^10.0.3",           // Immutable updates
  "zod": "^3.22.4",             // Schema validation
  "wavesurfer.js": "^7.4.0"     // Waveform display
}
```

---

## 🏗️ File Structure

```
src/
├── components/
│   ├── blocks/              # Block components
│   │   ├── PatternBlock.tsx
│   │   ├── InstrumentBlock.tsx
│   │   ├── EffectBlock.tsx
│   │   └── ...
│   ├── editors/             # Specialized editors
│   │   ├── StrudelEditor.tsx
│   │   ├── PianoRoll.tsx
│   │   └── StepSequencer.tsx
│   ├── views/               # Main view modes
│   │   ├── GraphView.tsx    # ReactFlow canvas
│   │   ├── TimelineView.tsx # Arrangement view
│   │   ├── MixerView.tsx    # Mixing console
│   │   └── CodeView.tsx     # Full code editor
│   ├── ui/                  # shadcn components
│   │   ├── button.tsx
│   │   ├── slider.tsx
│   │   └── ...
│   └── transport/           # Playback controls
│       ├── Transport.tsx
│       └── BPMControl.tsx
├── engine/                  # Audio engine
│   ├── StrudelEngine.ts     # Strudel integration
│   ├── ToneEngine.ts        # Tone.js setup
│   ├── blocks/              # Block evaluation
│   │   ├── PatternBlock.ts
│   │   ├── InstrumentBlock.ts
│   │   └── ...
│   └── scheduler.ts         # Clock/scheduling
├── store/                   # State management
│   ├── useGraphStore.ts     # Graph state
│   ├── useTransportStore.ts # Playback state
│   ├── useProjectStore.ts   # Project data
│   └── useSampleStore.ts    # Sample library
├── lib/                     # Utilities
│   ├── tauri.ts             # Tauri API wrappers
│   ├── sampleDb.ts          # IndexedDB for samples
│   └── serialization.ts     # Save/load logic
└── types/
    ├── blocks.ts            # Block type definitions
    ├── project.ts           # Project schema
    └── audio.ts             # Audio interfaces
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1-2)
- ✅ Set up Strudel + Tone.js
- ✅ Monaco editor integration
- ✅ Basic ReactFlow graph
- ✅ Simple pattern → audio pipeline
- ✅ Transport controls (play/stop/BPM)

### Phase 2: Core Blocks (Week 3-4)
- ✅ Pattern:Code block (Strudel)
- ✅ Instrument blocks (kick/snare/synth)
- ✅ Basic effect chain (filter/reverb)
- ✅ LFO modulation
- ✅ Block library panel

### Phase 3: Timeline (Week 5-6)
- ✅ Timeline view implementation
- ✅ Clip arrangement
- ✅ Loop regions
- ✅ Audio clips (sample playback)

### Phase 4: Mixing (Week 7-8)
- ✅ Mixer view
- ✅ Volume/pan per track
- ✅ Send/return buses
- ✅ Master channel with limiter

### Phase 5: File System (Week 9-10)
- ✅ Save/load projects (Tauri fs API)
- ✅ Sample browser + drag-drop
- ✅ Export audio rendering
- ✅ Preset system

### Phase 6: Polish (Week 11-12)
- ✅ Keyboard shortcuts
- ✅ Undo/redo
- ✅ Performance optimization
- ✅ Tutorial/onboarding

---

## 🎯 Success Metrics

**MVP is successful when:**
1. User can write a Strudel pattern and hear it immediately
2. User can drag blocks to create a song structure
3. User can export audio file
4. User can save/load project
5. App feels responsive (< 50ms audio latency)

**1.0 is successful when:**
1. All features in Phase 1-6 implemented
2. < 10 critical bugs
3. Usable on all platforms (Mac/Win/Linux)
4. Documentation + tutorial videos
5. 100+ community patterns shared

---

## 🔥 Killer Features (Unique to Coppr)

1. **Code-first but visual-enhanced**
   - Live code evaluation
   - Visual representation of code
   - Best of both worlds

2. **Strudel patterns as building blocks**
   - Copy/paste patterns between projects
   - Pattern libraries
   - Generative + structured composition

3. **Tauri performance**
   - Native speed
   - Small app size
   - Cross-platform consistency

4. **Open file format**
   - JSON project files
   - Git-friendly
   - Version control your music

5. **Extensible block system**
   - Plugin architecture ready
   - Community block sharing
   - JavaScript/TypeScript plugins

---

## 🎓 Learning Resources

**For Strudel:**
- https://strudel.cc/
- Strudel REPL for testing patterns
- Strudel Discord community

**For Tone.js:**
- https://tonejs.github.io/
- Transport, Sampler, Effects documentation

**For ReactFlow:**
- https://reactflow.dev/
- Node-based editors examples

**For DAW UX:**
- Study Ableton Live (Session View)
- Study Renoise (tracker-style)
- Study Sonic Pi (code-first)

---

## ⚠️ Potential Pitfalls & Solutions

### Pitfall 1: Audio latency in browser
**Solution:** Use AudioWorklet for sample-accurate timing

### Pitfall 2: Strudel + ReactFlow sync
**Solution:** Unidirectional data flow: Graph → Strudel, not bidirectional

### Pitfall 3: Large sample libraries
**Solution:** Lazy loading + streaming + IndexedDB caching

### Pitfall 4: Undo/redo complexity
**Solution:** Immer for immutable state + command pattern

### Pitfall 5: Cross-platform audio issues
**Solution:** Test early on all platforms, abstract audio APIs

---

## 🎉 Next Steps

1. Review this improved plan
2. Set up development environment
3. Install Strudel + dependencies
4. Build Phase 1 foundation
5. Iterate with user feedback

**Let's build something amazing! 🚀**
