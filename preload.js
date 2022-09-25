const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
    openMenu: (x, y) => ipcRenderer.send(`display-app-menu`, { x, y })
})