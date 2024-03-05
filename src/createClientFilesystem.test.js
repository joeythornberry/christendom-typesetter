const { createClientFilesystem } = require('./createClientFilesystem.js')
const { metadataLocation, footnotesLocation, clientDirectory } = require('./locations.js')
const { metadataTypes } = require('./constants.js')
const fs = require('fs')
const path = require('path')

describe('createClientFilesystem', () => {

	const directory = path.join(__dirname, 'testDirectory')

	beforeEach(() => {
		fs.mkdirSync(directory)
		createClientFilesystem(directory)
	})

	test('client folder is created', () => {
		expect(fs.existsSync(path.join(directory,clientDirectory))).toBe(true)
	})

	test('footnote folder is created', () => {
		expect(fs.existsSync(path.join(directory,footnotesLocation))).toBe(true)
	})
	
	test('metadata folder is created', () => {
		expect(fs.existsSync(path.join(directory,metadataLocation))).toBe(true)
	})

	test('style.tex file is created', () => {
		expect(fs.existsSync(path.join(directory, clientDirectory, 'style.tex'))).toBe(true)
	})

	test('metadata.tex file is created', () => {
		expect(fs.existsSync(path.join(directory, clientDirectory, 'metadata.tex'))).toBe(true)
	})

	test('metadatum files are created', () => {
		for (const type of metadataTypes) {
			expect(fs.existsSync(path.join(directory, metadataLocation, type))).toBe(true)
		}
	})

	afterEach(() => {
		fs.rmSync(directory, { recursive: true })
	})
})
