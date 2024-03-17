const { Menu } = require('electron')
const path = require('path')
const fs = require('fs')

const { getPotentialParagraphs } = require('./getPotentialParagraphs.js')

const { BrowserWindow, ipcMain } = require('electron')

function chooser(index, directory) {

	if (process.env.NODE_ENV !== 'development') {
		const template = [
		]
		Menu.setApplicationMenu(Menu.buildFromTemplate(template))
	}

	const chooseParagraphWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preloadChooser.js'),
			nodeIntegration: true
		}
	})

	chooseParagraphWindow.loadFile(path.join(__dirname,'htmlChooser.html'))
	chooseParagraphWindow.webContents.send('potential-paragraphs',{ paragraphs: getPotentialParagraphs(directory), index: index })

	return chooseParagraphWindow

}

exports.chooser = chooser
