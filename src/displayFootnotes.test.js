/*
 * @jest-environment jsdom
 */

const { displayFootnotes } = require('./displayFootnotes');

describe('displayFootnotes', () => {
	beforeEach(() => {
		document.body.innerHTML = `
		<div id="paper-container">
		hello world.<sup>1</sup>
		</div>
		<div id="footnotes-paragraphs-container">
		    <div id="footnotes-container">
		    </div>
		</div>
		`;
	})

	test('displays footnotes', () => {
		const footnotes = [{
			code: 'testcode',
			text: 'test text'
		}]
		displayFootnotes(footnotes, document.getElementById('paper-container'))
		const footnotesContainer = document.getElementById('footnotes-container')
		expect(footnotesContainer.innerHTML).toContain('footnote-element')
		expect(footnotesContainer.innerHTML).toContain('testcode')
		expect(footnotesContainer.innerHTML).toContain('test text')
	})
})
