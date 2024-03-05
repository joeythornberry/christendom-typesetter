/*
 * @jest-environment jsdom
 */

const { ParagraphManager } = require('./ParagraphManager');

const { deleteParagraph, moveParagraphUp, moveParagraphDown } = require('./createParagraphManagers');

describe('moving paragraphs', () => {
	const displayParagraphs = jest.fn()
	const paragraphsContainer = document.createElement('div')

	test('moveParagraphUp', () => {
		const paragraphs = [
			{ text: 'paragraph 1' },
			{ text: 'paragraph 2' },
			{ text: 'paragraph 3' },
		]
		const paragraphIndex = 1
		const expectedParagraphs = [
			{ text: 'paragraph 2' },
			{ text: 'paragraph 1' },
			{ text: 'paragraph 3' },
		]
		moveParagraphUp(paragraphs, paragraphIndex, displayParagraphs, paragraphsContainer)
		expect(displayParagraphs).toHaveBeenCalledWith(expectedParagraphs, paragraphsContainer)
		expect(paragraphs).toEqual(expectedParagraphs)
	})

	test('moveParagraphDown', () => {
		const paragraphs = [
			{ text: 'paragraph 1' },
			{ text: 'paragraph 2' },
			{ text: 'paragraph 3' },
		]
		const paragraphIndex = 1
		const expectedParagraphs = [
			{ text: 'paragraph 1' },
			{ text: 'paragraph 3' },
			{ text: 'paragraph 2' },
		]
		moveParagraphDown(paragraphs, paragraphIndex, displayParagraphs, paragraphsContainer)
		expect(displayParagraphs).toHaveBeenCalledWith(expectedParagraphs, paragraphsContainer)
		expect(paragraphs).toEqual(expectedParagraphs)
	})

	test('move paragraph with first and last paragraph', () => {
		const paragraphs = [
			{ text: 'paragraph 1' },
		]
		const paragraphIndex = 0
		const expectedParagraphs = [
			{ text: 'paragraph 1' },
		]
		moveParagraphUp(paragraphs, paragraphIndex, displayParagraphs, paragraphsContainer)
		expect(paragraphs).toEqual(expectedParagraphs)
		moveParagraphDown(paragraphs, paragraphIndex, displayParagraphs, paragraphsContainer)
		expect(paragraphs).toEqual(expectedParagraphs)
	})

	test('delete paragraph', () => {
		const paragraphs = [
			{ text: 'paragraph 1' },
			{ text: 'paragraph 2' },
			{ text: 'paragraph 3' },
		]
		const paragraphIndex = 1
		const expectedParagraphs = [
			{ text: 'paragraph 1' },
			{ text: 'paragraph 3' },
		]
		deleteParagraph(paragraphs, paragraphIndex, displayParagraphs, paragraphsContainer)
		expect(displayParagraphs).toHaveBeenCalledWith(expectedParagraphs, paragraphsContainer)
		expect(paragraphs).toEqual(expectedParagraphs)
	})

})

describe('ParagraphManager', () => {
	let paragraphManager = null
	const number = 1
	const name = 'paragraph.txt'
	const paragraphElement = document.createElement('div')
	const fakeMoveParagraphUp = jest.fn()
	const fakeMoveParagraphDown = jest.fn()
	const fakeChooseParagraph = jest.fn()
	const fakeDeleteParagraph = jest.fn()

	beforeAll(() => {
		document.body.innerHTML = ''
		paragraphManager = new ParagraphManager(
					number,
					name,
					paragraphElement,
					fakeMoveParagraphUp,
					fakeMoveParagraphDown,
					fakeChooseParagraph,
					fakeDeleteParagraph
					)
		paragraphManager.initialize()
		document.body.appendChild(paragraphElement)
	})

	test('initialize creates proper elements', () => {
		const strings = ['paragraph-name', 'edit-button', 'delete-button', 'arrows-container','paragraph.txt']
		for (const string of strings) {
			expect(document.body.innerHTML).toContain(string)
		}
		expect(document.getElementsByClassName('arrow').length).toBe(2)
	})

	test('clicking edit button calls chooseParagraph', () => {
		const editButton = document.getElementsByClassName('edit-button')[0]
		editButton.click()
		expect(fakeChooseParagraph).toHaveBeenCalledWith(number)
	})

	test('clicking delete button calls deleteParagraph', () => {
		const deleteButton = document.getElementsByClassName('delete-button')[0]
		deleteButton.click()
		expect(fakeDeleteParagraph).toHaveBeenCalled()
	})

	test('clicking up arrow calls moveParagraphUp', () => {
		const upArrow = document.getElementsByClassName('arrow')[0]
		upArrow.click()
		expect(fakeMoveParagraphUp).toHaveBeenCalled()
	})

	test('clicking down arrow calls moveParagraphDown', () => {
		const downArrow = document.getElementsByClassName('arrow')[1]
		downArrow.click()
		expect(fakeMoveParagraphDown).toHaveBeenCalled()
	})
})
