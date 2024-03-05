/*
 * @jest-environment jsdom
 */

const { switchToFootnotes } = require('./switchToFootnotes');
const { switchToParagraphs } = require('./switchToParagraphs');

describe('switching', () => {
	const fakeSendParagraphs = jest.fn()

	beforeEach(() => {
		document.body.innerHTML = `
		<div id="footnotes-paragraphs-container">
		    <div id="footnotes-container">
		</div>
		`;
	})

	test('switching should remove the opposite container', () => {
		switchToParagraphs([], () => {}, fakeSendParagraphs)
		expect(document.getElementById('footnotes-container')).toBeNull()
		switchToFootnotes([], () => {})
		expect(document.getElementById('paragraphs-container')).toBeNull()
	})

	test('switching should add correct container', () => {
		switchToParagraphs([], () => {}, fakeSendParagraphs)
		expect(document.getElementById('paragraphs-container')).not.toBeNull()
		switchToFootnotes([], () => {})
		expect(document.getElementById('footnotes-container')).not.toBeNull()
	})

	test('switching to footnotes should call displayFootnotes', () => {
		const displayFootnotes = jest.fn()
		switchToFootnotes([], displayFootnotes)
		expect(displayFootnotes).toHaveBeenCalled()
	})

})
