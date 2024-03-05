const { assembleFootnotes } = require('./assembleFootnotes');
const { Footnote } = require('./Footnote');
const { footnotesLocation } = require('../storage/locations');
const { createClientFilesystem } = require('../storage/createClientFilesystem');
const { saveParsedFootnotes } = require('../html/saveParsedFootnotes');
const fs = require('fs');
const path = require('path');

describe('assembleFootnotes', () => {
	const footnotes = ['a', 'b'];
	const directory = path.join(process.cwd(),'footnotesAssembleTest')
	beforeAll(() => {
		fs.mkdirSync(directory)
		createClientFilesystem(directory)
		saveParsedFootnotes(directory, footnotes)
		const files = fs.readdirSync(path.join(directory, footnotesLocation))
		for (const file of files) {
			if (file !== 'footnotes.json') {
				fs.writeFileSync(path.join(directory, footnotesLocation, file), `content of ${file}`)
			}
		}
	}) 

	test('should assemble footnotes', () => {
		const fakeAssembledFootnotes = [new Footnote('a','content of a'),new Footnote('b','content of b')]
		expect(assembleFootnotes(directory,footnotes)).toEqual(fakeAssembledFootnotes)
	})

	afterAll(() => {
		fs.rmSync(directory, { recursive: true })
	})

})
