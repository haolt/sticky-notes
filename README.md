## Tech stacks
ElectronJS

## Package
- If no use electronmon, uninstall nodemon & edit `package.json`:
```json
"scripts": {
    "start": "electron ."
  }
```
## Debug
```js
window.mainWindow.webContents.openDevTools();
```
## Build
```js
npm run package-mac
npm run package-win
npm run package-linux
```

## Contact me [here](https://haodev.wordpress.com/me/)