const { ipcMain, BrowserWindow } = require('electron')
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

const { chooser } = require('./windowChooser.js')

function formatter(directory) {
	const win = new BrowserWindow({
		width: 900,
		height: 1000,
		x: 0,
		y: 0,
		webPreferences: {
			preload: path.join(__dirname, 'preloadFormatter.js'),
			nodeIntegration: true
		}
	})

	win.loadFile(path.join(__dirname,'htmlFormatter.html'))

	function sendPaper() {
		win.webContents.send('paper', loadPaper(directory))
	}

	createClientFilesystem(directory)

	sendPaper()
	const fm = new FileManager(directory,sendPaper,100)
	fm.updateWatched(loadParagraphs(directory))


	ipcMain.on('compile-latex-pdf', (event, arg) => {
		console.log('backend is compiling latex pdf')
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
			const title = loadMetadata(directory).title.replace(/ /g,'_').toLowerCase() + '.pdf'

			const finalPDFLocation = path.join(directory,title)
			fs.copyFileSync(originalPDFLocation,finalPDFLocation)
			child_process.exec(`start ${finalPDFLocation}`)
		}
	})

	ipcMain.on('recompile-latex-pdf', (event, arg) => {
		console.log('backend is recompiling existing latex pdf')
		const styleLocation = path.join(directory,'!cdomtex','style.tex')
		const success = compileLatexPDF(directory, styleLocation)
		if (success) {
			const originalPDFLocation = path.join(directory,'!cdomtex','style.pdf')
			const title = loadMetadata(directory).title.toLowerCase().replace(/ /g,'_') + '.pdf'
			const finalPDFLocation = path.join(directory,title)
			fs.copyFileSync(originalPDFLocation,finalPDFLocation)
			child_process.exec(`start ${finalPDFLocation}`)
		}
	})

	ipcMain.on('update-footnote', (event, arg) => {
		console.log('backend is updating footnote')
		const { code, text } = arg
		saveFootnote(directory,code,text)
		sendPaper()
	})
	
	ipcMain.on('update-paragraphs', (event, arg) => {
		console.log('backend is updating paragraphs')
		console.log(arg)
		const paragraphs = arg.paragraphs
		console.log('paragraphs',paragraphs)
		saveParagraphs(directory,paragraphs)
		fm.updateWatched(paragraphs)
		sendPaper()
	})

	ipcMain.on('update-metadatum', (event, arg) => {
		console.log(`updating metadatum ${arg.id} to ${arg.text}`)
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
		console.log('paragraph chosen',arg.paragraph)
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

}

exports.formatter = formatter
