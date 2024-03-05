const { saveParsedFootnotes } = require('./saveParsedFootnotes.js');
const { footnotesLocation } = require('../storage/locations.js')
const { createClientFilesystem } = require('../storage/createClientFilesystem.js');
const fs = require('fs');
const path = require('path');

describe('saveParsedFootnotes', () => {
	const footnotes = ['a', 'b', 'cdf'];
	const directory = path.join(process.cwd(),'footnotesSaveTest')

	beforeAll(() => {
		fs.mkdirSync(directory)
		createClientFilesystem(directory)
		saveParsedFootnotes(directory, footnotes)
	})

	test('creates footnotes json file', () => {
		expect(fs.existsSync(path.join(directory, footnotesLocation, 'footnotes.json'))).toBe(true)
	})

	test('creates one file for each footnote', () => {
		expect(fs.readdirSync(path.join(directory, footnotesLocation)).length).toBe(footnotes.length+1)
	})

	test('footnote files have correct names', () => {
		const files = fs.readdirSync(path.join(directory, footnotesLocation))
		for (const footnote of footnotes) {
			expect(files).toContain(footnote)
		}
	})

	test('do not create new footnote files if they already exist', () => {
		saveParsedFootnotes(directory, footnotes)
		expect(fs.readdirSync(path.join(directory, footnotesLocation)).length).toBe(footnotes.length+1)
	})

	test('do not erase footnote files that already have content', () => {
		const file = path.join(directory, footnotesLocation, footnotes[0])
		fs.writeFileSync(file, 'content')
		saveParsedFootnotes(directory, footnotes)
		expect(fs.readFileSync(file, 'utf-8')).toBe('content')
	})

	afterAll(() => {
		fs.rmSync(directory, { recursive: true })
	})
})
