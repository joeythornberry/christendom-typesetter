class ParagraphManager {
	constructor(
		number,
		name,
		paragraphElement,
		moveParagraphUp,
		moveParagraphDown,
		chooseParagraph,
		deleteParagraph
	) { 
		this.number = number
		this.name = name
		this.paragraphElement = paragraphElement
		this.nameElement = null
		this.moveParagraphUp = moveParagraphUp
		this.moveParagraphDown = moveParagraphDown
		this.chooseParagraph = chooseParagraph
		this.deleteParagraph = deleteParagraph
	}

	initialize() {
		this.nameElement = document.createElement('div')
		this.nameElement.className = 'paragraph-name'
		this.nameElement.innerHTML = `${this.number}: ${this.name}`
		this.paragraphElement.appendChild(this.nameElement)

		this.arrowsContainer = document.createElement('div')
		this.arrowsContainer.className = 'arrows-container'
		this.upArrow = document.createElement('div')
		this.upArrow.className = 'arrow'
		this.upArrow.innerHTML = '&#x25B2;'
		this.downArrow = document.createElement('div')
		this.downArrow.className = 'arrow'
		this.downArrow.innerHTML = '&#x25BC;'
		this.arrowsContainer.appendChild(this.upArrow)
		this.arrowsContainer.appendChild(this.downArrow)

		this.editAndDeleteContainer = document.createElement('div')

		this.editButton = document.createElement('div')
		this.editButton.className = 'edit-button'
		this.editButton.innerHTML = '&#x270E;'

		this.deleteButton = document.createElement('div')
		this.deleteButton.className = 'delete-button'
		this.deleteButton.innerHTML = '&#x2715;'

		this.editAndDeleteContainer.appendChild(this.editButton)
		this.editAndDeleteContainer.appendChild(this.deleteButton)
		this.paragraphElement.appendChild(this.editAndDeleteContainer)

		this.paragraphElement.appendChild(this.arrowsContainer)

		this.upArrow.addEventListener('click', () => {
			this.moveParagraphUp()
		})

		this.downArrow.addEventListener('click', () => {
			this.moveParagraphDown()
		})

		this.editButton.addEventListener('click', () => {
			this.chooseParagraph(this.number)
		})

		this.deleteButton.addEventListener('click', () => {
			this.deleteParagraph()
		})
	}
}

exports.ParagraphManager = ParagraphManager
