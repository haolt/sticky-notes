'use strict';

const path = require('path');
const { app, Menu, ipcMain } = require('electron');

const Window = require('./Window');
const DataStore = require('./DataStore');
const menuBar = require('./components/MenuBar');

const notesData = new DataStore({ name: 'Notes Data' });

function main () {
  let mainWindow = new Window({
    file: path.join('renderers', 'Home/index.html'),
    icon: 'favicon.ico'
  });

  const mainMenu = Menu.buildFromTemplate(menuBar);
  Menu.setApplicationMenu(mainMenu);

  let addNoteWindow;
  ipcMain.on('open-new-window-to-add-note', () => {
    if (!addNoteWindow) {
      addNoteWindow = new Window({
        file: path.join('renderers', 'AddNote/index.html'),
        width: 300,
        height: 300,
        parent: mainWindow
      });
      addNoteWindow.on('closed', () => {
        addNoteWindow = null;
      })
    }
  });
}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});

