const { dialog, ipcMain, BrowserWindow, Menu } = require('electron')
const path = require('path')
const { formatter } = require('./windowFormatter.js')
const { inspect } = require('util')
const { loadTheme } = require('./loadTheme')

function launcher() {
	const launcherWindow = new BrowserWindow({
		width: 800,
		height: 620,
		webPreferences: {
			preload: path.join(__dirname,'preloadLauncher.js'),
			nodeIntegration: true
		}
	})

	if (process.env.NODE_ENV !== 'development') {
		const template = [
		]
		Menu.setApplicationMenu(Menu.buildFromTemplate(template))
	}

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

	launcherWindow.webContents.send('theme', {theme: loadTheme()}) 
}

exports.launcher = launcher
