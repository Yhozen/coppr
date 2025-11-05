# Coppr

<p align="center">
<img src="./splashscreen/icon.svg" style="text-align:center" alt="Coppr Logo" width="200" height="200"/>
</p>

Un interpretador de pseudo código en español, inspirado en PSeInt. Ahora construido con Tauri para mejor rendimiento y menor tamaño de aplicación.

## Tecnologías

- **Frontend**: React + Redux + TypeScript
- **Backend**: Tauri (Rust)
- **Build**: Vite
- **Code Editor**: Draft.js con syntax highlighting

## Instalación

### Prerequisitos

- Node.js 18+
- Rust (para desarrollo): https://rustup.rs/

### Clonar el repositorio

```bash
git clone https://github.com/Yhozen/coppr.git
cd coppr
```

### Instalar dependencias

```bash
npm install
```

## Desarrollo

### Modo desarrollo

```bash
npm run tauri:dev
```

Esto iniciará:
1. El servidor de desarrollo Vite (frontend)
2. La aplicación Tauri con hot-reload

### Solo frontend

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Construcción (Build)

### Construcción local

```bash
npm run tauri:build
```

Los archivos compilados estarán en `src-tauri/target/release/bundle/`

### Construcción en GitHub Actions

El proyecto tiene CI/CD configurado:
- **Automático**: Builds de macOS en cada push
- **Manual**: Ir a Actions > "Build Tauri App" > Run workflow

## Instalación de la App

### macOS

#### Método 1: Remover atributo de cuarentena (Recomendado)

Si ves el error "coppr is damaged and can't be opened", ejecuta:

```bash
# Navega a donde descargaste la app
cd ~/Downloads  # o donde esté tu app

# Opción A: Si descargaste el .app
xattr -cr coppr.app
open coppr.app

# Opción B: Si descargaste el .dmg
xattr -cr coppr_*.dmg
open coppr_*.dmg
# Luego arrastra coppr.app a Applications y ejecuta:
xattr -cr /Applications/coppr.app
```

#### Método 2: Permitir en Preferencias del Sistema

1. Intenta abrir la app (aparecerá el error)
2. Ve a **Preferencias del Sistema** > **Seguridad y Privacidad**
3. Haz clic en **"Abrir de todas formas"**
4. Confirma en el diálogo que aparece

#### Método 3: Desactivar Gatekeeper temporalmente (NO recomendado para producción)

```bash
# Desactivar Gatekeeper
sudo spctl --master-disable

# Abrir la app
open coppr.app

# IMPORTANTE: Reactivar Gatekeeper después
sudo spctl --master-enable
```

### Linux

#### Debian/Ubuntu (.deb)

```bash
sudo dpkg -i coppr_*.deb
# Si hay problemas con dependencias:
sudo apt-get install -f
```

#### AppImage

```bash
chmod +x coppr_*.AppImage
./coppr_*.AppImage
```

### Windows

#### Instalador MSI

1. Doble clic en `coppr_*_x64_en-US.msi`
2. Sigue el asistente de instalación

#### Instalador NSIS

1. Doble clic en `coppr_*_x64-setup.exe`
2. Sigue el asistente de instalación

**Nota**: Es posible que Windows SmartScreen muestre una advertencia. Haz clic en "Más información" y luego "Ejecutar de todas formas".

## DevTools

Abre las DevTools del navegador:

- **macOS**: <kbd>Cmd</kbd> + <kbd>Alt</kbd> + <kbd>I</kbd> o <kbd>F12</kbd>
- **Linux**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> o <kbd>F12</kbd>
- **Windows**: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> o <kbd>F12</kbd>

## Estructura del Proyecto

```
coppr/
├── src/                    # Código fuente del frontend
│   ├── components/        # Componentes React
│   ├── containers/        # Contenedores conectados a Redux
│   ├── actions/          # Redux actions
│   ├── reducers/         # Redux reducers
│   └── main.tsx          # Punto de entrada
├── src-tauri/            # Código Rust de Tauri
│   ├── src/             # Código fuente Rust
│   ├── icons/           # Iconos de la aplicación
│   └── tauri.conf.json  # Configuración Tauri
├── dist/                 # Build del frontend (generado)
├── index.html           # HTML principal
├── vite.config.js       # Configuración Vite
└── package.json         # Dependencias y scripts
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo Vite
- `npm run build` - Construir frontend
- `npm run tauri:dev` - Modo desarrollo con Tauri
- `npm run tauri:build` - Construir aplicación Tauri
- `npm run tauri` - Ejecutar CLI de Tauri

## Solución de Problemas

### "Error loading Python lib" en macOS

Esto es normal en Tauri y no afecta la funcionalidad. Es un mensaje de debug del sistema.

### La app no abre en macOS

Ver sección [Instalación de la App > macOS](#macos) arriba.

### Errores de compilación Rust

```bash
# Actualizar Rust
rustup update

# Limpiar cache de Cargo
cd src-tauri
cargo clean
cd ..

# Reintentar build
npm run tauri:build
```

### Errores de npm

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## Por Qué Tauri vs Electron

Coppr migró de Electron a Tauri por varias razones:

- **Tamaño**: Apps Tauri son ~10-20x más pequeñas
- **Rendimiento**: Usa webview nativo en lugar de Chromium embebido
- **Memoria**: Menor uso de RAM
- **Seguridad**: Menor superficie de ataque
- **Moderno**: Tooling moderno con Vite y Rust

## Contribuir

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-caracteristica`
3. Commit cambios: `git commit -am 'Agregar nueva característica'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## Licencia

MIT - Ver [LICENSE](LICENSE) para más detalles.

## Autor

Gabriel (garox) - gabriel@garox.org

## Reconocimientos

- Inspirado en PSeInt
- Basado originalmente en [electron-react-redux-boilerplate](https://github.com/jschr/electron-react-redux-boilerplate)
