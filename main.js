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

  // init
  mainWindow.once('show', () => {
    mainWindow.send('bind-all-notes-to-screen', notesData.notes);
  });

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
      });
    };
  });

  ipcMain.on('add-this-note', (event, note) => {
    const updatedNotes= notesData.addNote(note).notes;
    mainWindow.send('bind-all-notes-to-screen', updatedNotes);
  });

  ipcMain.on('clear-all-notes', () => {
    const updatedNotes= notesData.clear().notes;
    mainWindow.send('bind-all-notes-to-screen', updatedNotes);
  });

  ipcMain.on('delete-this-note', (event, note) => {
    const updatedNotes= notesData.deleteNote(note).notes;
    mainWindow.send('bind-all-notes-to-screen', updatedNotes);
  })

};

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});
