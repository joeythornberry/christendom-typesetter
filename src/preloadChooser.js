const { ipcRenderer } = require('electron')

ipcRenderer.on('potential-paragraphs', (event, arg) => {
	const potentialParagraphsContainer = document.getElementById('potential-paragraphs-container')
	potentialParagraphsContainer.innerHTML = ''
	const header = document.createElement('h2')
	const prompt = arg.index === null ? `Choose a paragraph` : `Choose paragraph ${arg.index}`
	header.innerText = prompt
	potentialParagraphsContainer.appendChild(header)

	createPotentialParagraphs(arg.paragraphs).forEach((element) => {
		potentialParagraphsContainer.appendChild(element)
	})
})

function createPotentialParagraphs(potentialParagraphs) {
	const elements = []
	potentialParagraphs.forEach((paragraph) => {
		const element = document.createElement('div')
		element.className = 'potential-paragraph'
		element.innerHTML = paragraph

		element.addEventListener('click', () => {
			chooseParagraph(paragraph)
		})

		elements.push(element)
	})
	return elements
}

function chooseParagraph(paragraph) {
	ipcRenderer.send('paragraph-chosen', { paragraph: paragraph })
}
