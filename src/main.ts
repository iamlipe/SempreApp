import electron from 'electron';
import path from 'path';

import './data/use-cases/fake-authentication'
import './data/use-cases/save-proposal'
import './data/use-cases/delete-proposal'
import './data/use-cases/fetch-all-proposals'
import './data/use-cases/fetch-proposal'
import './data/use-cases/create-table-proposal'
import './data/use-cases/update-proposal'

if (require('electron-squirrel-startup')) {
  electron.app.quit();
}

let mainWindow: electron.BrowserWindow

const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    width: 1024,
    height: 728,
    icon: process.platform === 'win32' ? path.join(__dirname, 'icon.ico') :
           process.platform === 'darwin' ? path.join(__dirname, 'icon.icns') :
           path.join(__dirname, 'icon.png'),
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});

electron.app.on('activate', () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
