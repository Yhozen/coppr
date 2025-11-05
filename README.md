# Coppr - Code-First DAW

<p align="center">
<img src="./splashscreen/icon.svg" style="text-align:center" alt="Coppr Logo" width="200" height="200"/>
</p>

**A code-first Digital Audio Workstation where patterns are written in code and enhanced with visual tools.**

Coppr flips the traditional DAW workflow: instead of clicking through menus, you **write music patterns in code** using [Strudel](https://strudel.cc/), then use visual tools for sound design, mixing, and arrangement.

## 🎯 Philosophy

**Code is the primary creative interface. Visual tools enhance it.**

- Write patterns faster than clicking
- Version control your music (Git-friendly)
- Live coding performances
- Generative music with procedural patterns
- Traditional DAW tools when you need them

## ✨ Features

### 🎛️ Dual Workflow

- **Code View**: Write Strudel patterns with Monaco editor (VS Code's editor)
- **Graph View**: Visual modular patching with ReactFlow
- **Timeline View**: Traditional DAW arrangement
- **Mixer View**: Professional mixing console

### 🎵 Pattern-Based Composition

```javascript
// Write music like this
s("bd sd, ~ cp, [hh hh]*4")
  .euclid(3, 8)
  .speed(2)
  .room(0.5)
```

Powered by **Strudel** - the pattern language from TidalCycles, adapted for JavaScript.

### 🧩 Modular Block System

- Drag-and-drop blocks (patterns, instruments, effects)
- Patch-cable connections like modular synths
- Real-time audio engine updates
- Inspect and edit properties in side panel

### 🥁 Built-In Instruments & Effects

**Instruments:**
- Drum synthesizers (kick, snare, hi-hat)
- Sample players with pitch/speed control
- Synthesizers (FM, subtractive, additive)

**Effects:**
- Filter, Reverb, Delay
- Distortion, Compressor
- Chorus, Flanger, Phaser
- And more...

### 🎚️ Professional Tools

- Multi-track timeline with clip arrangement
- Mixer with send/return buses
- Automation lanes
- MIDI support (input/output/clock sync)
- Audio recording & export
- Sample library management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Rust (for development): https://rustup.rs/

### Installation

```bash
# Clone repository
git clone https://github.com/Yhozen/coppr.git
cd coppr

# Install dependencies
npm install

# Run development mode
npm run tauri:dev
```

### Create Your First Pattern

1. Open Coppr
2. Click "New Pattern" block
3. Write: `s("bd sd hh sd")`
4. Press Space to play
5. Hear your beat! 🎉

## 📚 Documentation

- **[Architecture Plan](./ARCHITECTURE.md)** - Technical design and roadmap
- **[Strudel Learn](https://strudel.cc/learn/)** - Pattern language tutorial
- **[macOS Installation](./MACOS_INSTALL.md)** - Fix Gatekeeper issues

## 🎓 Learn Strudel Patterns

Strudel uses **mini-notation** for describing rhythms:

```javascript
// Basic pattern
s("bd sd")              // kick, snare

// With rests
s("bd ~ sd ~")          // kick, (rest), snare, (rest)

// Subdivisions
s("[bd bd] sd")         // two kicks, then snare

// Repetition
s("bd*4")               // four kicks

// Euclidean rhythms
s("bd").euclid(3, 8)    // 3 hits distributed across 8 steps

// Effects
s("bd sd").speed(2).room(0.5)  // faster + reverb

// Randomness
s("bd sd").sometimes(x => x.speed(2))  // sometimes double speed
```

## 🏗️ Project Structure

```
coppr/
├── src/
│   ├── components/
│   │   ├── blocks/          # Pattern, Instrument, Effect blocks
│   │   ├── views/           # Graph, Timeline, Mixer, Code views
│   │   ├── editors/         # Strudel editor, Piano roll, etc.
│   │   └── transport/       # Playback controls
│   ├── engine/              # Audio engine (Strudel + Tone.js)
│   ├── store/               # State management (Zustand)
│   └── lib/                 # Utilities, Tauri APIs
├── src-tauri/               # Rust backend
└── ARCHITECTURE.md          # Detailed technical plan
```

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Play/Pause |
| `Cmd/Ctrl+S` | Save project |
| `Cmd/Ctrl+E` | Export audio |
| `Cmd/Ctrl+N` | New pattern block |
| `Cmd/Ctrl+/` | Command palette |
| `Tab` | Switch views |
| `F12` | DevTools |

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Tauri (Rust)
- **Audio**: Strudel + Tone.js + Web Audio API
- **UI**: shadcn/ui + TailwindCSS
- **Graph**: ReactFlow
- **Editor**: Monaco Editor (VS Code)
- **Storage**: IndexedDB + Tauri FS

## 📦 Build

```bash
# Development
npm run tauri:dev

# Production build
npm run tauri:build

# Output: src-tauri/target/release/bundle/
```

## 🎨 Screenshots

*Coming soon - app is in active development*

## 🗺️ Roadmap

### ✅ Phase 1: Foundation (Current)
- [x] Tauri + React setup
- [x] TypeScript migration
- [ ] Strudel integration
- [ ] Monaco editor
- [ ] Basic audio engine

### 🚧 Phase 2: Core Features
- [ ] Pattern blocks
- [ ] Instrument library
- [ ] Effect chains
- [ ] ReactFlow graph view

### 📅 Phase 3: DAW Features
- [ ] Timeline view
- [ ] Mixer view
- [ ] MIDI support
- [ ] Audio recording

### 🔮 Phase 4: Advanced
- [ ] Automation lanes
- [ ] Clip launcher (Ableton-style)
- [ ] Collaborative editing
- [ ] Plugin system

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed milestones.

## 🤝 Contributing

Contributions welcome! Coppr is in early development.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -am 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 💡 Inspiration

Coppr is inspired by:

- **Strudel/TidalCycles** - Live coding music
- **Sonic Pi** - Code-based music creation
- **Ableton Live** - Session view and workflow
- **VCV Rack** - Modular patching
- **Renoise** - Tracker-based sequencing

## 🎯 Why Coppr?

### vs Traditional DAWs (Ableton, FL Studio, Logic)
- ✅ Faster pattern creation with code
- ✅ Git-friendly project files
- ✅ Algorithmic/generative music
- ✅ Live coding performances
- ✅ Open source & free

### vs Pure Code (Sonic Pi, TidalCycles)
- ✅ Visual mixing/mastering tools
- ✅ Timeline for arrangement
- ✅ Mouse-based editing when needed
- ✅ Native performance (Tauri)
- ✅ Sample browser & management

### vs Modular Synths (VCV Rack)
- ✅ Code-based pattern generation
- ✅ Faster prototyping
- ✅ Text-based composition
- ✅ Version control
- ✅ Easier to share/collaborate

## 📄 License

MIT - See [LICENSE](LICENSE) for details.

## 👤 Author

Gabriel (garox) - gabriel@garox.org

## 🙏 Acknowledgments

- [Strudel](https://strudel.cc/) - Pattern language and inspiration
- [Tone.js](https://tonejs.github.io/) - Web Audio framework
- [Tauri](https://tauri.app/) - Native app framework
- [ReactFlow](https://reactflow.dev/) - Node-based UI
- [TidalCycles](https://tidalcycles.org/) - Original pattern language

## 🔗 Links

- **Website**: https://github.com/Yhozen/coppr
- **Strudel**: https://strudel.cc/
- **Discord**: *Coming soon*
- **Tutorials**: *Coming soon*

---

**🚀 Coppr is in active development. Star the repo to follow progress!**

**🎵 Make music with code. Mix with tools. Coppr.**
