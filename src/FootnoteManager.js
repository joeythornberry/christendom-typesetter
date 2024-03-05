class FootnoteManager {

	constructor(number, code, text, footnoteElement, updateFootnote) { 
		this.number = number
		this.code = code
		this.text = text
		this.footnoteElement = footnoteElement
		this.textElement = null
		this.updateFootnote = updateFootnote
	}

	initialize() {

		this.footnoteElement.innerHTML = ''

		const numberAndCodeElement = document.createElement('div')
		numberAndCodeElement.classList.add('footnote-number-and-code')
		numberAndCodeElement.innerHTML = `${this.number}: ${this.code}`

		this.textElement = document.createElement('div')
		this.textElement.classList.add('footnote-text')
		this.textElement.contentEditable = true
		this.textElement.spellcheck = false

		this.textElement.innerHTML = this.text

		this.footnoteElement.addEventListener('click', () => {
			this.textElement.focus()
		})

		this.textElement.addEventListener('focus', () => {
			this.footnoteElement.classList.add('editing')

			/** 
			 * fun hack to move the cursor to the end of the text
			 * https://stackoverflow.com/a/55811159
			 */
			// select all the content in the element
			document.execCommand('selectAll', false, null);
			// collapse selection to the end
			document.getSelection().collapseToEnd();
		})

		this.textElement.addEventListener('blur', () => {
			this.footnoteElement.classList.remove('editing')
			if (this.textElement.innerHTML != this.text) {
				this.save()
			}
		})
		this.textElement.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault()
				this.save()
			}
		})

		this.footnoteElement.appendChild(numberAndCodeElement)
		this.footnoteElement.appendChild(this.textElement)
	}

	save() {
		this.text = this.textElement.innerHTML
		this.updateFootnote(this.code, this.text)
		this.enterDisplayMode()
	}
}

exports.FootnoteManager = FootnoteManager
