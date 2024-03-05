/*
 * @jest-environment jsdom
 */

const { createParagraphElements } = require('./createParagraphElements');

describe('createParagraphElements', () => {
	const paragraphs = ['1', '2', '3']
	const paragraphElements = createParagraphElements(paragraphs)

	test('creates a paragraph element for each paragraph', () => {
		expect(paragraphElements.length).toBe(3)
		for (let i = 0; i < paragraphElements.length; i++) {
			expect(paragraphElements[i].classList).toContain('paragraph')
		}
	})
})
