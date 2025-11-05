# Instalación en macOS - Coppr

## El Error "coppr is damaged"

Si ves este mensaje al intentar abrir Coppr:

> "coppr" is damaged and can't be opened. You should move it to the Trash.

**No te preocupes**, tu app NO está dañada. Este es el sistema de seguridad Gatekeeper de macOS bloqueando apps que no están firmadas por Apple.

## Soluciones

### ✅ Solución Rápida (Recomendada)

Abre Terminal y ejecuta:

```bash
xattr -cr /Applications/coppr.app
```

Luego intenta abrir la app normalmente.

### Paso a Paso Detallado

#### Si descargaste el archivo .app

1. Abre **Terminal** (Cmd + Espacio, escribe "Terminal")

2. Navega a donde está la app:
   ```bash
   cd ~/Downloads
   ```

3. Remueve el atributo de cuarentena:
   ```bash
   xattr -cr coppr.app
   ```

4. Abre la app:
   ```bash
   open coppr.app
   ```

#### Si descargaste el archivo .dmg

1. Abre **Terminal**

2. Remueve el atributo de cuarentena del DMG:
   ```bash
   cd ~/Downloads
   xattr -cr coppr_*.dmg
   ```

3. Monta el DMG (doble clic en el archivo)

4. Arrastra coppr.app a Applications

5. En Terminal, ejecuta:
   ```bash
   xattr -cr /Applications/coppr.app
   ```

6. Abre la app desde Applications

### 🔒 Solución Alternativa: Preferencias del Sistema

1. Intenta abrir Coppr (aparecerá el error)
2. Ve a **Preferencias del Sistema** > **Seguridad y Privacidad**
3. En la pestaña **General**, verás un mensaje sobre Coppr
4. Haz clic en **"Abrir de todas formas"**
5. Confirma que quieres abrir la app

### 🚨 Solución Temporal (NO recomendada)

**Solo usa esto si las opciones anteriores no funcionan:**

```bash
# Desactivar Gatekeeper
sudo spctl --master-disable

# Abrir la app
open /Applications/coppr.app

# IMPORTANTE: Reactivar Gatekeeper inmediatamente después
sudo spctl --master-enable
```

## ¿Por Qué Pasa Esto?

Coppr está construido con Tauri y no tiene una firma de desarrollador de Apple ($99/año). Las apps no firmadas son bloqueadas por Gatekeeper para proteger tu Mac.

El comando `xattr -cr` simplemente le dice a macOS que confíe en esta app específica.

## ¿Es Seguro?

Sí, si descargaste Coppr de:
- GitHub oficial: https://github.com/Yhozen/coppr
- GitHub Actions (artifacts)

**NUNCA** ejecutes `xattr -cr` en apps de fuentes desconocidas.

## Verificar el Código Fuente

Coppr es open source. Puedes revisar todo el código en:
https://github.com/Yhozen/coppr

## Construir Desde el Código Fuente

Si prefieres construir la app tú mismo:

```bash
# Clonar repositorio
git clone https://github.com/Yhozen/coppr.git
cd coppr

# Instalar dependencias
npm install

# Construir app
npm run tauri:build

# La app estará en: src-tauri/target/release/bundle/macos/
```

## Problemas Comunes

### "Command not found: xattr"

`xattr` viene instalado por defecto en macOS. Si ves este error, tu instalación de macOS puede estar corrupta.

### "Operation not permitted"

Necesitas permisos completos en el disco. Ve a:
**Preferencias del Sistema** > **Seguridad y Privacidad** > **Privacidad** > **Acceso Total al Disco**

### La app se cierra inmediatamente

1. Abre Terminal
2. Ejecuta: `/Applications/coppr.app/Contents/MacOS/coppr`
3. Verás mensajes de error que ayudarán a diagnosticar el problema

## Versiones de macOS

Esta solución funciona en:
- ✅ macOS Catalina (10.15)
- ✅ macOS Big Sur (11.x)
- ✅ macOS Monterey (12.x)
- ✅ macOS Ventura (13.x)
- ✅ macOS Sonoma (14.x)

## ¿Necesitas Ayuda?

Crea un issue en: https://github.com/Yhozen/coppr/issues

Incluye:
- Versión de macOS
- Método que intentaste
- Mensaje de error completo
- Salida de: `ls -la@ /Applications/coppr.app`
