/**
 * @jest-environment jsdom
 **/

const { FootnoteManager } = require('./FootnoteManager');

describe('FootnoteManager', () => {
	let footnoteManager = null
	let fakeSaveFootnote = null
	const text = 'interesting text'
	beforeEach(() => {
		document.body.innerHTML = `
			<div class="footnote-element"></div>
		`
		const footnoteElement = document.getElementsByClassName('footnote-element')[0]
		document.execCommand = jest.fn()
		fakeSaveFootnote = jest.fn()
		footnoteManager = new FootnoteManager('5','a', text, footnoteElement, fakeSaveFootnote)
	})

	test('setup', () => {
		footnoteManager.initialize()
		const strings = [
			'footnote-number-and-code',
			'5',
			'a',
			'footnote-text',
			text,
		]
		expect(document.body.innerHTML).toContain('footnote-element')
		for (const s of strings) {
			expect(document.body.innerHTML).toContain(s)
		}
	})

	test('initialize works even if stuff is already there', () => {
		const footnoteElement = document.getElementsByClassName('footnote-element')[0]
		const previousText = 'previous text'
		footnoteElement.innerHTML = previousText
		footnoteManager.initialize()
		expect(footnoteManager.footnoteElement.innerHTML).toContain(text)
		expect(footnoteManager.footnoteElement.innerHTML).not.toContain(previousText)
	})

	test('click triggers focus on footnote text', () => {
		footnoteManager.initialize()
		const footnoteTextElement = document.getElementsByClassName('footnote-text')[0]
		footnoteTextElement.focus = jest.fn()
		footnoteManager.footnoteElement.click()
		expect(footnoteTextElement.focus).toHaveBeenCalled()
	})

	test('click triggers edit mode, and enter goes back to display mode', () => {
		
		//this test is still broken
		
		footnoteManager.initialize()

		const footnoteTextElement = document.getElementsByClassName('footnote-text')[0]
		footnoteTextElement.focus()

		const footnoteElement = document.getElementsByClassName('footnote-element')[0]

		expect(document.execCommand).toHaveBeenCalledWith('selectAll', false, null)
                expect(document.body.innerHTML).toContain('editing')
		expect(footnoteElement.classList).toContain('editing')


	        // const event = new KeyboardEvent('keydown', { key: 'Enter' })
		// document.dispatchEvent(event)

		// expect(fakeSaveFootnote).toHaveBeenCalled()
	})
})
