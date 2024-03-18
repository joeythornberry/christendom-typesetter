const { contextBridge, ipcRenderer } = require('electron');
const { onLoad } = require('./onLoad.js')
const { displayFootnotes } = require('./displayFootnotes.js')
const { displayParagraphs } = require('./displayParagraphs.js')
const { displayMetadata } = require('./displayMetadata.js');
const { switchToParagraphs } = require('./switchToParagraphs.js');
const { setTheme } = require('./setTheme.js')

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

ipcRenderer.on('theme', (event, arg) => {
	setTheme(arg.theme)
	const themeToggle = document.getElementById('theme')
	themeToggle.checked = (arg.theme === "dark")
})

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
	const wordCountElement = document.getElementById('word-count')
	wordCountElement.innerHTML = `Word Count: ${wordCount}`
})

window.addEventListener('resize', () => {
	displayFootnotes(footnotes, paperContainer);
})

document.addEventListener('DOMContentLoaded', () => {
	needLoad = true
	const themeToggle = document.getElementById('theme')
	themeToggle.addEventListener("change", (e) => {
		let theme;
		if (themeToggle.checked === true) {
			theme = "dark"
		} else {
			theme = "light"
		}
		ipcRenderer.send("theme",{theme: theme})
	})
});
