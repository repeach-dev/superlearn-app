const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  isElectron: true,
});
