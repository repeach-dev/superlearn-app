const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const DEV_SERVER_URL = 'http://localhost:8081';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hiddenInset',
    title: 'SuperLearn',
  });

  if (isDev) {
    mainWindow.loadURL(DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    // Production: load from web-build folder (Expo web export)
    mainWindow.loadFile(path.join(__dirname, 'web-build', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers for native desktop features
ipcMain.handle('get-platform', () => {
  return {
    platform: process.platform,
    version: app.getVersion(),
    electron: process.versions.electron,
  };
});

ipcMain.handle('get-app-path', () => {
  return app.getPath('userData');
});
