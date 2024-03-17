const { contextBridge, ipcRenderer } = require('electron');
const { onLoad } = require('./onLoad.js')
const { displayFootnotes } = require('./displayFootnotes.js')
const { displayParagraphs } = require('./displayParagraphs.js')
const { displayMetadata } = require('./displayMetadata.js');
const { switchToParagraphs } = require('./switchToParagraphs.js');

let footnotes = [];
let paragraphs = [];
let paperContainer = null
let needLoad = false
let metadataPaperContainer = null

function getFootnotes() {
	return footnotes;
}

function getParagraphs() {
	return paragraphs;
}

window.addEventListener('DOMContentLoaded',() => {
        paperContainer = document.getElementById('paper-container');
	
});

contextBridge.exposeInMainWorld('electronAPI', {
	closeWindow: () => ipcRenderer.send('hello', 'close'),
	compileLatexPDF: () => ipcRenderer.send('compile-latex-pdf','hello')
});

ipcRenderer.on('paper', (event, arg) => {
	paperContainer = document.getElementById('paper-container');
	paperContainer.innerHTML = arg.text;
	footnotes = arg.footnotes;
	paragraphs = arg.paragraphs;

	displayMetadata(arg.metadata);

	displayFootnotes(footnotes, paperContainer);

	const paragraphsContainer = document.getElementById('paragraphs-container');
	if (paragraphsContainer !== null) {
		displayParagraphs(paragraphs, paragraphsContainer);
	}

	if (needLoad) {
		onLoad(getFootnotes, getParagraphs)
		needLoad = false
	}
	
	const split = arg.text.split(" ")
	const wordCount = split.length
	console.log("split:",split)
	const wordCountElement = document.getElementById('word-count')
	wordCountElement.innerHTML = `Word Count: ${wordCount}`
})

window.addEventListener('resize', () => {
	displayFootnotes(footnotes, paperContainer);
})

document.addEventListener('DOMContentLoaded', () => {
	needLoad = true
});
