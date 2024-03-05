function createParagraphElements(paragraphs) {
	const paragraphElements = []
	for (let i = 0; i < paragraphs.length; i++) {
		const paragraphElement = document.createElement('div')
		paragraphElement.className = 'paragraph'
		paragraphElements.push(paragraphElement)
	}
	return paragraphElements
}

exports.createParagraphElements = createParagraphElements
