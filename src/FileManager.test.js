const { FileManager } = require('./FileManager.js')
const { createClientFilesystem } = require('../storage/createClientFilesystem.js')
const fs = require('fs')
const path = require('path')

describe('FileManager', () => {

	let reportChange = null
	let directory = null
	let fm = null
	beforeEach(async () => {
		directory = path.join(process.cwd(),fs.mkdtempSync('test'))
		createClientFilesystem(directory)
		reportChange = jest.fn(x => 10 + x)
		fm = new FileManager(directory,reportChange,10)
		fs.writeFileSync(fm.fullName('test.txt'),'test')
		const newWatched = ['test.txt']
		await fm.updateWatched(newWatched)
	})

	test('fullName is correct', () => {
		expect(fm.fullName('test.txt')).toBe(path.join(directory,'test.txt'))
	})

	test('updateWatched adds files', () => {
		expect(fm.watched).toEqual(['test.txt'])
	})

	test('updateWatched adds and removes files', async () => {
		fs.writeFileSync(fm.fullName('test2.txt'),'test')
		fs.writeFileSync(fm.fullName('test3.txt'),'test')
		await fm.updateWatched(['test2.txt','test3.txt'])
		expect(fm.watched).toEqual(['test2.txt', 'test3.txt'])
		fs.unlinkSync(fm.fullName('test2.txt'))
		fs.unlinkSync(fm.fullName('test3.txt'))
	})

	test('updateWatched handles duplicates', async () => {
		await fm.updateWatched(['test.txt'])
		expect(fm.watched).toEqual(['test.txt'])
	})

	test('updateWatched handles empty list', async () => {
		await fm.updateWatched([])
		expect(fm.watched).toEqual([])
	})

	test('FileWatcher detects changes', async () => {
		fs.writeFileSync(fm.fullName('test.txt'),'test2')
		return new Promise(resolve => setTimeout(resolve, 100)).then(() => {
			expect(reportChange.mock.calls).toHaveLength(1)
		})
	})

	afterEach(async () => {
		fs.unlinkSync(fm.fullName('test.txt'))
		await new Promise(resolve => fs.rm(directory, {recursive: true},resolve))
		await fm.updateWatched([])
		fm = null
	})
})

