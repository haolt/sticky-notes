'use strict';

const { BrowserWindow } = require('electron');

const defaultProps = {
  width: 300,
  height: 400,
  show: false,
  webPreferences: {
    nodeIntegration: true
  }
};

class Window extends BrowserWindow {
  constructor ({ file, ...windowSettings }) {

    super({ ...defaultProps, ...windowSettings });
    this.loadFile(file);
    
    this.once('ready-to-show', () => {
      this.show(); // Avoid flicker
    });
  };
};

module.exports = Window;

