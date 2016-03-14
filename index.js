'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var Menu = electron.Menu;

let mainWindow;

let menuTemplate = [{
  label: 'MyElectron',
  submenu: [
    { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click:
    function () { showAboutDialog(); } },
    { type: 'separator' },
    { label: 'Settings', accelerator: 'CmdOrCtrl+,', click:
    function () { showSettingsWindow(); } },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click:
    function () { app.quit(); }}
  ]
}];
let menu = Menu.buildFromTemplate(menuTemplate);

function createMainWindow() {
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({ width: 600, height: 400 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', function () {
  // create window
  createMainWindow();

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createMainWindow();
  }
});

