const { ipcRenderer } = require('electron');
const { displayFootnotes } = require('./displayFootnotes.js');
const { switchToFootnotes } = require('./switchToFootnotes.js');
const { switchToParagraphs } = require('./switchToParagraphs.js');

function onLoad(getFootnotes,getParagraphs) {
	const compileLatexButton = document.getElementById('compile-latex-button');
	compileLatexButton.addEventListener('click', () => {
		ipcRenderer.send('compile-latex-pdf','hello')
	});

	const recompileLatexButton = document.getElementById('recompile-latex-button');
	recompileLatexButton.addEventListener('click', () => {
		ipcRenderer.send('recompile-latex-pdf','hello')
	});

	const footnotesButton = document.getElementById('footnotes-button')
	footnotesButton.addEventListener('click',() => {
		switchToFootnotes(getFootnotes(), displayFootnotes)
	})

	const paragraphsButton = document.getElementById('paragraphs-button')
	paragraphsButton.addEventListener('click',() => {
		switchToParagraphs(getParagraphs())
	})
}

exports.onLoad = onLoad;
