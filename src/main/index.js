import {
  app,
  BrowserWindow,
  Menu,
  ipcMain
} from 'electron'

require('./ipc');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`


function createWindow() {
  let width = 550,
    height = 320;

  mainWindow = new BrowserWindow({
    height: height,
    width: width,
    useContentSize: true,
    resizable: false,
    fullscreen: false,
    frame: false,
    webPreferences: {
      webSecurity: false
    }
  })

  // mainWindow.webContents.openDevTools()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.platform === 'darwin') {
    const template = [{
        label: "Application",
        submenu: [{
          label: "Quit",
          accelerator: "Command+Q",
          click: function () {
            app.quit();
          }
        }]
      },
      {
        label: "Edit",
        submenu: [{
            label: "Copy",
            accelerator: "CmdOrCtrl+C",
            selector: "copy:"
          },
          {
            label: "Paste",
            accelerator: "CmdOrCtrl+V",
            selector: "paste:"
          },
        ]
      }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  } else {
    Menu.setApplicationMenu(null)
  }
}

// 利用ipc让html标签获取主进程的方法,最小化,最大化,关闭
ipcMain.on('min', e => mainWindow.minimize());
ipcMain.on('max', e => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
});
ipcMain.on('close', e => mainWindow.close());

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})




/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */