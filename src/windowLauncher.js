const { dialog, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const { formatter } = require('./windowFormatter.js')

function launcher() {
	const launcherWindow = new BrowserWindow({
		width: 800,
		height: 620,
		webPreferences: {
			preload: path.join(__dirname,'preloadLauncher.js'),
			nodeIntegration: true
		}
	})

	launcherWindow.loadFile(path.join(__dirname,'htmlLauncher.html'))

	ipcMain.on('open-formatter', (event, arg) => {
		launcherWindow.close()
		formatter(arg.directory)
	})
 
	
	ipcMain.on('pick-directory', (event, arg) => {
		const result = dialog.showOpenDialogSync(launcherWindow, {
			properties: ['openDirectory']
		})
		if (!result) {
			return
		}
		launcherWindow.webContents.send('directory-picked', { directory: result[0] })
	})
}

exports.launcher = launcher
