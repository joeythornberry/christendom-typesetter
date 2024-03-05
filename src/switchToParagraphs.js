const { displayParagraphs } = require('./displayParagraphs.js')
const { sendParagraphs } = require('./sendParagraphs.js')
const { chooseParagraph } = require('./choooseParagraph.js')

function switchToParagraphs(paragraphs, sendParagraphsInternal = sendParagraphs) {
	// the default parameter is for testing purposes
	
	const footnotesParagraphsContainer = document.getElementById('footnotes-paragraphs-container')
	footnotesParagraphsContainer.innerHTML = ''

	const paragraphsControlsContainer = document.createElement('div')
	paragraphsControlsContainer.id = 'paragraphs-controls-container'

	const newParagraphButtonContainer = document.createElement('div')
	newParagraphButtonContainer.id = 'new-paragraph-button-container'

	const newParagraphButton = document.createElement('button')
	newParagraphButton.id = 'new-paragraph-button'
	newParagraphButton.innerHTML = 'New Paragraph'
	newParagraphButton.addEventListener('click', () => {
		chooseParagraph(null)
	})

	newParagraphButtonContainer.appendChild(newParagraphButton)
	paragraphsControlsContainer.appendChild(newParagraphButtonContainer)

	footnotesParagraphsContainer.appendChild(paragraphsControlsContainer)


	const paragraphsContainer = document.createElement('div')
	paragraphsContainer.id = 'paragraphs-container'
	displayParagraphs(paragraphs, paragraphsContainer)
	footnotesParagraphsContainer.appendChild(paragraphsContainer)
	sendParagraphsInternal(paragraphs)
}
	
exports.switchToParagraphs = switchToParagraphs
