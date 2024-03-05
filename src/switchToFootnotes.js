function switchToFootnotes(footnotes, displayFootnotes) {
	const footnotesParagraphsContainer = document.getElementById('footnotes-paragraphs-container')
	footnotesParagraphsContainer.innerHTML = ''
	const footnotesContainer = document.createElement('div')
	footnotesContainer.id = 'footnotes-container'
	footnotesParagraphsContainer.appendChild(footnotesContainer)
	const paperContainer = document.getElementById('paper-container')
	displayFootnotes(footnotes, paperContainer)
}

exports.switchToFootnotes = switchToFootnotes
