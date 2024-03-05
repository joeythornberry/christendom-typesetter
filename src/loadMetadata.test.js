const { loadMetadata } = require('./loadMetadata')
const { metadataTypes } = require('./constants')
const { metadataLocation } = require('./locations')
const { compileMetadataLatex } = require('../html/compileMetadataLatex')
const fs = require('fs')
const path = require('path')

describe('loadMetadata', () => {
	const directory = 'testLoadMetadata'
	beforeAll(() => {
		fs.mkdirSync(`${directory}/${metadataLocation}`, { recursive: true })
	})

	test('returns empty strings if no metadata', () => {
		const metadata = loadMetadata(directory)
		for (const metadataType of metadataTypes) {
			expect(metadata[metadataType]).toBe('')
		}
	})

	test('loads metadata', () => {
		for (const metadataType of metadataTypes) {
			fs.writeFileSync(
				`${directory}/${metadataLocation}/${metadataType}`,
				`_this_ is ${metadataType}`
			)
		}
		const metadata = loadMetadata(directory)
		for (const metadataType of metadataTypes) {
			expect(metadata[metadataType]).toBe(`_this_ is ${metadataType}`)
		}
	})

	test('compileMetadataLatex works properly', () => {
		compileMetadataLatex(directory)
		for (const metadataType of metadataTypes) {
			const location = path.join(directory, metadataLocation, metadataType + ".tex")
			const exists = fs.existsSync(location)
			expect(exists).toBe(true)
			const latex = fs.readFileSync(location, 'utf-8')
			expect(latex).toBe(`\\textit{this} is ${metadataType}`)
		}
	})

	afterAll(() => {
		fs.rmSync(directory, { recursive: true })
	})
})

