'use strict';
const { ipcRenderer } = require('electron');

document.getElementById('create-btn').addEventListener('click', () => {
  ipcRenderer.send('open-new-window-to-add-note');
});
