const { ParagraphManager } = require('./ParagraphManager.js');
const { chooseParagraph } = require('./choooseParagraph.js');
const { sendParagraphs } = require('./sendParagraphs.js');

function createParagraphManagers(paragraphs, paragraphElements, displayParagraphs, paragraphsContainer) {
	const paragraphManagers = []
	for (let i = 0; i < paragraphs.length; i++) {
		const paragraphManager =
			new ParagraphManager(
				i+1,
				paragraphs[i],
				paragraphElements[i],
				() => { 
					moveParagraphUp(paragraphs, i, displayParagraphs, paragraphsContainer),
					sendParagraphs(paragraphs)
				},
				() => { 
					moveParagraphDown(paragraphs, i, displayParagraphs, paragraphsContainer),
					sendParagraphs(paragraphs)
				},
				() => chooseParagraph(i+1),
				() => {
					deleteParagraph(paragraphs, i, displayParagraphs, paragraphsContainer)
					sendParagraphs(paragraphs)
				}

			)
		paragraphManager.initialize()
		paragraphManagers.push(paragraphManager)
	}
	return paragraphManagers
}

function moveParagraphUp(paragraphs, index, displayParagraphs, paragraphsContainer) {
	if (index > 0) {
		const mover = paragraphs[index]
		paragraphs[index] = paragraphs[index - 1]
		paragraphs[index - 1] = mover
	}
	displayParagraphs(paragraphs, paragraphsContainer)
}

function moveParagraphDown(paragraphs, index, displayParagraphs, paragraphsContainer) {
	if (index < paragraphs.length - 1) {
		const mover = paragraphs[index]
		paragraphs[index] = paragraphs[index + 1]
		paragraphs[index + 1] = mover
	}
	displayParagraphs(paragraphs, paragraphsContainer)
}

function deleteParagraph(paragraphs, index, displayParagraphs, paragraphsContainer) {
	paragraphs.splice(index, 1)
	displayParagraphs(paragraphs, paragraphsContainer)
}

exports.createParagraphManagers = createParagraphManagers
exports.moveParagraphUp = moveParagraphUp // for testing only
exports.moveParagraphDown = moveParagraphDown // for testing only
exports.deleteParagraph = deleteParagraph // for testing only
