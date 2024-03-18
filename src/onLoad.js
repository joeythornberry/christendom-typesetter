const { ipcRenderer } = require('electron');
const { displayFootnotes } = require('./displayFootnotes.js');
const { switchToFootnotes } = require('./switchToFootnotes.js');
const { switchToParagraphs } = require('./switchToParagraphs.js');

class footnotesParagraphsManager {
	constructor(footnotesParagraphsButton, goToFootnotes, goToParagraphs) {
		this.show = "paragraphs"
		this.goToParagraphs = goToParagraphs
		this.goToFootnotes = goToFootnotes
		this.button = footnotesParagraphsButton
	}
	initialize() {
		this.button.onclick = () => {this.change(this)}
	}
	change = (man) => {
		if (man.show == "paragraphs") {
			man.show = "footnotes"
			man.button.innerHTML = "Edit Paragraphs"
			man.goToFootnotes()
		} else if (man.show == "footnotes") {
			man.show = "paragraphs"
			man.button.innerHTML = "Edit Footnotes"
			man.goToParagraphs()
		}
	}

}
function onLoad(getFootnotes,getParagraphs) {
	const compileLatexButton = document.getElementById('compile-latex-button');
	compileLatexButton.addEventListener('click', () => {
		ipcRenderer.send('compile-latex-pdf','hello')
	});

	// const recompileLatexButton = document.getElementById('recompile-latex-button');
	// recompileLatexButton.addEventListener('click', () => {
		// ipcRenderer.send('recompile-latex-pdf','hello')
	// });

	const footnotesParagraphsButton = document.getElementById('footnotes-paragraphs-button')

	// footnotesParagraphsButton.onclick = () => {
		// switchToFootnotes(getFootnotes(), displayFootnotes,
			// () => {
				// switchToParagraphs(getParagraphs())
			// })
	// }

	// const paragraphsButton = document.getElementById('paragraphs-button')
	// paragraphsButton.addEventListener('click',() => {
		// switchToParagraphs(getParagraphs())
	// })
	//
	function goToFootnotes() {
		switchToFootnotes(getFootnotes(), displayFootnotes)
	}

	function goToParagraphs() {
		switchToParagraphs(getParagraphs())
	}

	const footnotes_paragraphs_manager =
		new footnotesParagraphsManager(
			footnotesParagraphsButton, goToFootnotes, goToParagraphs)
	footnotes_paragraphs_manager.initialize()
	switchToParagraphs(getParagraphs())
}

exports.onLoad = onLoad;
