/**
 * main process where Node.js APIs are available, and the app lifecycle is managed
 * 
 */

// check for updates and install them if available
const { updateElectronApp } = require('update-electron-app');
updateElectronApp();

const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('node:path');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile('index.html');
}

// create the main browser window when the app is ready
app.whenReady().then(() => {
	// need to set up handler prior to starting window so it's available for the renderer process
	ipcMain.handle('ping', () => 'pong');
	
	createWindow();
	
	// open a window if none are present (MacOS)
	// the other OS's would be starting and creating the app
	app.on('activate', () => {
		if(BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// close the windows when the app is done and do any deconstructing
app.on('window-all-closed', () => {
	// Windows and Linux usually close apps when all windows are closed (MacOS is different)
	// process.platform can be win32, linux, or darwin
	if (process.platform !== 'darwin') app.quit();
});

