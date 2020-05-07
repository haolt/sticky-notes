'use strict';

const path = require('path');
const { app, Menu } = require('electron');

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

}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});

