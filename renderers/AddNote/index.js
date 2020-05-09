'use strict';

const { ipcRenderer } = require('electron');

document.getElementById('save-btn').addEventListener('click', event => {
  const newNote = document.getElementById('new-note').value;
  if (newNote) {
    ipcRenderer.send('add-this-note', newNote);
  };

  document.getElementById('new-note').value = '';
})
