/**
 * preload script that runs before the web page is loaded
 * ability to access DOM APIs and Node.js environment in order to expose privileged APIs via the contextBridge
 */

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
});