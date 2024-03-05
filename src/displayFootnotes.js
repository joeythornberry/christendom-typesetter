const { createFootnoteElements } = require('./createFootnoteElements.js');
const { getFootnoteLocations } = require('./getFootnoteLocations.js');
const { createFootnoteManagers } = require('./createFootnoteManagers.js');
const { distributeFootnoteElements } = require('./distributeFootnoteElements.js');
const { ipcRenderer } = require('electron');

function displayFootnotes(footnotes, paperContainer) {
	const footnotesContainer = document.getElementById('footnotes-container');
	if (footnotesContainer === null) {
		console.log('footnotesContainer is null');
		return
	}
	footnotesContainer.innerHTML = 'Footnotes will appear here.';
        const footnoteElements = createFootnoteElements(footnotes)
	const footnoteLocations = getFootnoteLocations(paperContainer);
	const footnoteManagers = createFootnoteManagers(footnoteElements, footnotes, updateFootnote)
	distributeFootnoteElements(footnotesContainer, footnoteLocations, footnoteElements);
}

function updateFootnote(code, text) {
	ipcRenderer.send('update-footnote', {code, text})
}


exports.displayFootnotes = displayFootnotes;
