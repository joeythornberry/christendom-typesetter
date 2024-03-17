const { ipcMain, BrowserWindow, Menu } = require('electron')
const path = require('path')
const child_process = require('child_process')
const fs = require('fs')
const { loadPaper } = require('./loadPaper.js')
const { createClientFilesystem } = require('./createClientFilesystem.js')
const { FileManager } = require('./FileManager.js')
const { saveParagraphs } = require('./saveParagraphs.js')
const { loadParagraphs } = require('./loadParagraphs.js')
const { loadParagraphText } = require('./loadParagraphText.js')
const { saveFootnote } = require('./saveFootnote.js')
const { assembleFootnotes } = require('./assembleFootnotes.js')
const { assemblePaper } = require('./assemblePaper.js')
const { saveMetadatum } = require('./saveMetadatum.js')
const { loadMetadata } = require('./loadMetadata.js')
const { txtToLatex } = require('./txtToLatex.js')
const { compileMetadataLatex } = require('./compileMetadataLatex.js')
const { compileLatexPDF } = require('./compileLatexPDF.js')
const { sanitizeTitle } = require('./sanitizeTitle.js')

const { chooser } = require('./windowChooser.js')
const contextMenu = require('electron-context-menu')
const { loadTheme } = require('./loadTheme.js')

function formatter(directory) {

	contextMenu({
		showSearchWithGoogle: false,
		showSaveImageAs: false,
		showInspectElement: false,
	})
	const win = new BrowserWindow({
		width: 900,
		height: 900,
		x: 100,
		y: 50,
		webPreferences: {
			preload: path.join(__dirname, 'preloadFormatter.js'),
			nodeIntegration: true
		}
	})

	if (process.env.NODE_ENV !== 'development') {
		const template = [
		]
		Menu.setApplicationMenu(Menu.buildFromTemplate(template))
	}


	win.loadFile(path.join(__dirname,'htmlFormatter.html'))

	function sendPaper() {
		win.webContents.send('paper', loadPaper(directory))
	}

	createClientFilesystem(directory)

	sendPaper()
	const fm = new FileManager(directory,sendPaper,100)
	fm.updateWatched(loadParagraphs(directory))


	ipcMain.on('compile-latex-pdf', (event, arg) => {
		const paragraphNames = loadParagraphs(directory)
		const paragraphText = loadParagraphText(directory,paragraphNames)
		const text = assemblePaper(paragraphText, {start: "", end: "\\par "})
		const assembledFootnotes = assembleFootnotes(directory)
		compileMetadataLatex(directory)
		const { latex } = txtToLatex(text,assembledFootnotes)
		fs.writeFileSync(path.join(directory,"!cdomtex","paper.tex"),latex)
		const styleLocation = path.join(directory,'!cdomtex','style.tex')
		const success = compileLatexPDF(directory,styleLocation)
		if (success) {
			const originalPDFLocation = path.join(directory,'!cdomtex','style.pdf')
			const rawTitle = sanitizeTitle(loadMetadata(directory).title)
			const title = rawTitle.replace(/ /g,'_').toLowerCase() + '.pdf'

			const finalPDFLocation = path.join(directory,title)
			fs.copyFileSync(originalPDFLocation,finalPDFLocation)
			child_process.exec(`start ${finalPDFLocation}`)
		}
	})

	ipcMain.on('recompile-latex-pdf', (event, arg) => {
		const styleLocation = path.join(directory,'!cdomtex','style.tex')
		const success = compileLatexPDF(directory, styleLocation)
		if (success) {
			const originalPDFLocation = path.join(directory,'!cdomtex','style.pdf')
			const rawTitle = sanitizeTitle(loadMetadata(directory).title)
			const title = rawTitle.replace(/ /g,'_').toLowerCase() + '.pdf'
			const finalPDFLocation = path.join(directory,title)
			fs.copyFileSync(originalPDFLocation,finalPDFLocation)
			child_process.exec(`start ${finalPDFLocation}`)
		}
	})

	ipcMain.on('update-footnote', (event, arg) => {
		const { code, text } = arg
		saveFootnote(directory,code,text)
		sendPaper()
	})
	
	ipcMain.on('update-paragraphs', (event, arg) => {
		const paragraphs = arg.paragraphs
		saveParagraphs(directory,paragraphs)
		fm.updateWatched(paragraphs)
		sendPaper()
	})

	ipcMain.on('update-metadatum', (event, arg) => {
		saveMetadatum(directory,arg.id,arg.text)
	})

	let chooseParagraphWindow = {
		close: () => {throw new Error('chooseParagraphWindow not initialized')}
	}
	let paragraphIndex = null

	ipcMain.on('choose-paragraph', (event, arg) => {
		paragraphIndex = arg.index
		chooseParagraphWindow = chooser(paragraphIndex, directory)
	})

	ipcMain.on('paragraph-chosen', (event, arg) => {
	        chooseParagraphWindow.close()
		const paragraphs = loadParagraphs(directory)
		if (paragraphIndex === null) {
			paragraphs.push(arg.paragraph)
		} else {
			paragraphs[paragraphIndex-1] = arg.paragraph
		}
		saveParagraphs(directory,paragraphs)
		fm.updateWatched(paragraphs)
		sendPaper()
	})

	win.webContents.send('theme', {theme: loadTheme()}) 

}

exports.formatter = formatter
