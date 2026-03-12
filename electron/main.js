const { app, BrowserWindow, Menu, ipcMain, protocol, net } = require('electron');
const { pathToFileURL } = require('url');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const DEV_SERVER_URL = 'http://localhost:8081';

// Register the scheme as privileged
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
      corsEnabled: true
    }
  }
]);

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
    // Production: load the root of our custom protocol
    // This allows Expo Router to match "/" correctly
    mainWindow.loadURL('app://- /');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function buildAppMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about', label: 'SuperLearn 정보' },
            { type: 'separator' },
            {
              label: '설정...',
              accelerator: 'CmdOrCtrl+,',
              click: () => {
                if (mainWindow) {
                  mainWindow.webContents.send('navigate', '/settings');
                }
              },
            },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide', label: 'SuperLearn 숨기기' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit', label: 'SuperLearn 종료' },
          ],
        }]
      : []),
    {
      label: '파일',
      submenu: [
        isMac ? { role: 'close', label: '창 닫기' } : { role: 'quit', label: '종료' },
      ],
    },
    {
      label: '편집',
      submenu: [
        { role: 'undo', label: '실행 취소' },
        { role: 'redo', label: '다시 실행' },
        { type: 'separator' },
        { role: 'cut', label: '잘라내기' },
        { role: 'copy', label: '복사' },
        { role: 'paste', label: '붙여넣기' },
        { role: 'selectAll', label: '모두 선택' },
      ],
    },
    {
      label: '보기',
      submenu: [
        { role: 'reload', label: '새로고침' },
        { role: 'forceReload', label: '강제 새로고침' },
        { role: 'toggleDevTools', label: '개발자 도구' },
        { type: 'separator' },
        { role: 'resetZoom', label: '기본 크기' },
        { role: 'zoomIn', label: '확대' },
        { role: 'zoomOut', label: '축소' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '전체 화면' },
      ],
    },
    {
      label: '계정',
      submenu: [
        {
          label: '내 프로필',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate', '/profile');
            }
          },
        },
        {
          label: '알림 설정',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate', '/notifications');
            }
          },
        },
        { type: 'separator' },
        {
          label: '로그아웃',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate', '/logout');
            }
          },
        },
      ],
    },
    {
      label: '창',
      submenu: [
        { role: 'minimize', label: '최소화' },
        { role: 'zoom', label: '확대/축소' },
        ...(isMac
          ? [{ type: 'separator' }, { role: 'front', label: '앞으로 가져오기' }]
          : [{ role: 'close', label: '닫기' }]),
      ],
    },
    {
      label: '도움말',
      submenu: [
        {
          label: '사용 가이드',
          click: () => {
            require('electron').shell.openExternal('https://superlearn.app/guide');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  protocol.handle('app', (request) => {
    const url = new URL(request.url);
    // Remove the leading slash to get the relative path
    let relativePath = url.pathname;

    // If the path is empty or just "/", serve index.html
    if (relativePath === '/' || relativePath === '') {
      relativePath = 'index.html';
    }

    // Decode the path (fixes issues with spaces/special characters)
    const decodedPath = decodeURIComponent(relativePath.startsWith('/') ? relativePath.substring(1) : relativePath);
    const filePath = path.join(__dirname, 'web-build', decodedPath);

    return net.fetch(pathToFileURL(filePath).toString());
  });

  buildAppMenu();
  createWindow();
});

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
