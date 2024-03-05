const { createParagraphElements } = require('./createParagraphElements.js')
const { createParagraphManagers } = require('./createParagraphManagers.js')

function displayParagraphs(paragraphs, paragraphsContainer) {
	paragraphsContainer.innerHTML = ''
	const paragraphElements = createParagraphElements(paragraphs)
	const paragraphManagers = createParagraphManagers(paragraphs, paragraphElements, displayParagraphs, paragraphsContainer)
	paragraphElements.forEach(paragraphElement => {
		paragraphsContainer.appendChild(paragraphElement)
	})
}

exports.displayParagraphs = displayParagraphs
