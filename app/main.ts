import path from 'path'
import url from 'url'
import { app, crashReporter, BrowserWindow, Menu, ipcMain, MenuItemConstructorOptions } from 'electron'
import * as Splashscreen from "@trodi/electron-splashscreen"

const isDevelopment: boolean = (process.env.NODE_ENV === 'development')

let mainWindow: BrowserWindow | null = null
let forceQuit: boolean = false

const installExtensions = async (): Promise<void> => {
  const installer = require('electron-devtools-installer')
  const extensions: string[] = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ]
  const forceDownload: boolean = !!process.env.UPGRADE_EXTENSIONS
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload)
    } catch (e: any) {
      console.log(`Error installing ${name} extension: ${e.message}`)
    }
  }
}

crashReporter.start({
  productName: 'coppr',
  companyName: 'Garox',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false
})

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions()
  }
  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false
  }
  mainWindow = Splashscreen.initSplashScreen({
      windowOpts: windowOptions,
      templateUrl: path.join(__dirname, "../splashscreen", "icon.svg"),
      delay: 0, // force show immediately since example will load fast
      minVisible: 1500, // show for 1.5s so example is obvious
      splashScreenOpts: {
          height: 500,
          width: 500,
          transparent: false,
      },
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    if (mainWindow) {
      mainWindow.show()
    }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow!.on('close', function (e: Electron.Event) {
        if (!forceQuit) {
          e.preventDefault()
          mainWindow!.hide()
        }
      })

      app.on('activate', () => {
        if (mainWindow) {
          mainWindow.show()
        }
      })

      app.on('before-quit', () => {
        forceQuit = true
      })
    } else {
      mainWindow!.on('closed', () => {
        mainWindow = null
      })
    }
  })

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools()

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      const menuTemplate: MenuItemConstructorOptions[] = [{
        label: 'Inspect element',
        click() {
          if (mainWindow) {
            mainWindow.inspectElement(props.x, props.y)
          }
        }
      }]
      Menu.buildFromTemplate(menuTemplate).popup(mainWindow!)
    })
  }
})
