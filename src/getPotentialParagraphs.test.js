const { getPotentialParagraphs } = require('./getPotentialParagraphs');
const fs = require('fs');
const path = require('path');

describe('getPotentialParagraphs', () => {
	test('gets all files recursively', () => {
		const directory = 'testGetPotentialParagraphs'
		fs.mkdirSync(directory)
		fs.mkdirSync(directory + '/1')
		fs.writeFileSync(directory + '/1/1.txt', '1')
		fs.writeFileSync(directory + '/2.txt', '2')
		const files = getPotentialParagraphs('testGetPotentialParagraphs')
		expect(files).toEqual(['1/1.txt', '2.txt'])
	})

	test('ignores files with ! in the name', () => {
		const directory = 'testGetPotentialParagraphs'
		fs.mkdirSync(directory)
		fs.mkdirSync(directory + '/1')
		fs.mkdirSync(directory + '/2!')
		fs.writeFileSync(directory + '/1/1.txt', '1')
		fs.writeFileSync(directory + '/2!.txt', '2')
		fs.writeFileSync(directory + '/1/3!.txt', '3')
		fs.writeFileSync(directory + '/2!/4.txt', '4')
		const files = getPotentialParagraphs('testGetPotentialParagraphs')
		expect(files).toEqual(['1/1.txt'])
	})

	afterEach(() => {
		fs.rmSync('testGetPotentialParagraphs', { recursive: true })
	})
})
