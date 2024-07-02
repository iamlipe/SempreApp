import electron from 'electron';
import path from 'path';

import './data/use-cases/fake-authentication'
import './data/use-cases/add-proposal'
import './data/use-cases/delete-proposal'
import './data/use-cases/get-all-proposals'
import './data/use-cases/get-proposal'

if (require('electron-squirrel-startup')) {
  electron.app.quit();
}

let mainWindow: electron.BrowserWindow

const createWindow = () => {
  mainWindow = new electron.BrowserWindow({
    width: 1024,
    height: 728,
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
