/*
 * @jest-environment jsdom
 */

const { metadataTypes } = require('../storage/constants')

const { displayMetadata } = require('./displayMetadata')

describe('displayMetadata', () => {

	const metadata = {}
	for (const type of metadataTypes) {
		metadata[type] = `hello ${type}`
	}

	beforeAll(() => { 
		const metadataContainer = document.createElement('div')
		metadataContainer.id = 'metadata-container'
		document.body.appendChild(metadataContainer)
	})

	test('displayMetadata does not error', () => {
		displayMetadata(metadata)
	})

	test('metadata shows up correctly', () => {
		for (const metadatum in metadata) {
			expect(document.body.innerHTML).toContain(metadatum)
		}
	})
})
