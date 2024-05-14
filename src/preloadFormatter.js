const { contextBridge, ipcRenderer } = require('electron');
const { onLoad } = require('./onLoad.js')
const { displayFootnotes } = require('./displayFootnotes.js')
const { displayParagraphs } = require('./displayParagraphs.js')
const { displayMetadata } = require('./displayMetadata.js');
const { setTheme } = require('./setTheme.js')
const { setEdit } = require('./setEdit.js')

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

ipcRenderer.on('edit', (event, arg) => {
	setEdit(arg.edit)
	const editToggle = document.getElementById('edit')
	editToggle.checked = (arg.edit === "edit")
})

function deNewline(input) {
	let counter = 0
	let output = ""
	while (counter < input.length) {
		if (input[counter] == "\r") {
			counter += 1
		} else if (input[counter] == "\n") {
			output += " "
			counter += 1
		} else {
			output += input[counter]
			counter += 1
		}
	}
	return output
}


ipcRenderer.on('paper', (event, arg) => {
	paperContainer = document.getElementById('paper-container');
	paperContainer.innerHTML = arg.text;
	footnotes = arg.footnotes;
	paragraphs = arg.paragraphs;

	displayMetadata(arg.metadata);


	const paragraphsContainer = document.getElementById('paragraphs-container');
	if (paragraphsContainer !== null) {
		displayParagraphs(paragraphs, paragraphsContainer);
	} else {
		displayFootnotes(footnotes, paperContainer);
	}

	if (needLoad) {
		onLoad(getFootnotes, getParagraphs)
		needLoad = false
	}
	
	const split = deNewline(arg.text).split(" ")
	const wordCount = split.length - paragraphs.length
	const wordCountElement = document.getElementById('word-count')
	wordCountElement.innerHTML = `Word Count: ${wordCount}`
})

window.addEventListener('resize', () => {
	footnotesContainer = document.getElementById('footnotes-container');
	if (footnotesContainer == null) {
		displayFootnotes(footnotes, paperContainer);
	}
})

document.addEventListener('DOMContentLoaded', () => {
	needLoad = true
	const themeToggle = document.getElementById('theme')
	themeToggle.addEventListener("change", (e) => {
		let theme;
		if (themeToggle.checked) {
			theme = "dark"
		} else {
			theme = "light"
		}
		ipcRenderer.send("theme",{theme: theme})
	})
	const editToggle = document.getElementById('edit')
	editToggle.addEventListener("change", (e) => {
		let edit;
		if (editToggle.checked) {
			edit = "edit"
		} else {
			edit = "preview"
		}
		ipcRenderer.send("edit",{edit: edit})
	})
});
