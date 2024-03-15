function switchParagraphsFootnotes(to, displayFootnotes, displayParagraphs, sendParagraphsInternal, chooseParagraph) {
	const footnotesParagraphsButton = document.getElementById('footnotes-paragraphs-button')
	const footnotesParagraphsLabel = document.getElementById('footnotes-paragraphs-label')
	const footnotesParagraphsContainer = document.getElementById('footnotes-paragraphs-container')
	const paperContainer = document.getElementById('paper-container')

	if (to === "footnotes") {
		footnotesParagraphsButton.innerHTML = "Edit Paragraphs"
		footnotesParagraphsButton.onclick = paragraphsSwitch

		footnotesParagraphsLabel.innerHTML = "Footnotes"

		footnotesParagraphsContainer.innerHTML = ''
		const footnotesContainer = document.createElement('div')
		footnotesContainer.id = 'footnotes-container'
		footnotesParagraphsContainer.appendChild(footnotesContainer)
		displayFootnotes(footnotes, paperContainer)
	} else if(to === "paragraphs") {

		footnotesParagraphsButton.innerHTML = "Edit Footnotes"
		footnotesParagraphsButton.onclick = footnotesSwitch

		footnotesParagraphsLabel.innerHTML = "Footnotes"

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
}
