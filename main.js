const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { menu } = require("./menu")

let mainWindow;

const isWindows = process.platform === "win32";

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 450,
        height: 350,
        autoHideMenuBar: true,
        backgroundColor: 'rgb(192,192,192)',
        resizable: false,
        frame: false,
        movable:true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile('index.html')
    mainWindow.setIcon(path.join(__dirname, 'battery-ico.png'));

   //mainWindow.webContents.openDevTools()
}

ipcMain.on(`display-app-menu`, function(e, args) {
    menu.popup({
        x: args.x,
        y: args.y
      });
    /* if (isWindows && mainWindow) {
      menu.popup({
        window: mainWindow,
        x: args.x,
        y: args.y
      });
    } */
  });
  
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})