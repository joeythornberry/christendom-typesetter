const { saveParagraphs } = require('./saveParagraphs')
const { loadParagraphs } = require('./loadParagraphs')
const { loadParagraphText } = require('./loadParagraphText')
const { paragraphsLocation } = require('./locations')
const { createClientFilesystem } = require('./createClientFilesystem')

const path = require('path')
const fs = require('fs')

describe('paragraphs', () => {

	const paragraphs = ['uwu.txt','test.txt']
	beforeAll(() => {
		fs.mkdirSync('paragraphsTest')
		createClientFilesystem('paragraphsTest')
		saveParagraphs('paragraphsTest',paragraphs)
		for(const paragraph of paragraphs) {
			fs.writeFileSync(path.join('paragraphsTest',paragraph),`test_${paragraph}`)
		}
	})

	test('paragraphs.json is created', () => {
		const location = path.join('paragraphsTest',paragraphsLocation,'paragraphs.json')
		expect(fs.existsSync(location)).toEqual(true)
	})

	test('paragraphs.json contains the correct data', () => {
		const location = path.join('paragraphsTest',paragraphsLocation,'paragraphs.json')
		expect(fs.readFileSync(location,'utf8')).toEqual(JSON.stringify(paragraphs))
	})

	test('paragraphs.json can be loaded', () => {
		const location = 'paragraphsTest'
		expect(loadParagraphs(location)).toEqual(paragraphs)
	})

	test('paragraph content can be loaded', () => {
		const paragraphs = loadParagraphs('paragraphsTest')
		const paragraphsText = loadParagraphText('paragraphsTest',paragraphs)
		expect(paragraphsText).toEqual(['test_uwu.txt','test_test.txt'])
	})

	afterAll(() => {
		fs.rmSync('paragraphsTest',{ recursive: true })
	})
})
