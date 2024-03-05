const path = require('path')
const fs = require('fs')
const { compileLatexPDF } = require('./compileLatexPDF.js')
const { clientDirectory, metadataLocation } = require('../storage/locations.js')
const { createClientFilesystem } = require('../storage/createClientFilesystem.js')
const child_process = require('child_process')
const { metadataTypes } = require('../storage/constants.js')

function compile(location) {
	const pdflatex = process.cwd() + '\\miktex\\texmfs\\install\\miktex\\bin\\x64\\pdflatex.exe'
	const command = `${pdflatex} ${location}`
	const result = child_process.execSync(command).toString()
	return result
}

describe('miktex', () => {
	
	const testLatex = 
		`\\documentclass{article}
		\\begin{document}
		Hello World!
		\\end{document}`

	test('miktex is present', () => {
		const miktexExists = fs.existsSync('miktex')
		expect(miktexExists).toBe(true)
	})
	
	test('miktex is executable', () => {
		fs.mkdirSync('testMiktex')
		const location = path.join(process.cwd(),'testMiktex','test.tex')
		fs.writeFileSync(location,testLatex)
		const result = compile(location)
		expect(result).toContain('Output written on test.pdf')
		expect(fs.existsSync('test.pdf')).toBe(true)
		const latexFiles = ['test.aux','test.log','test.pdf']
		for (const file of latexFiles) {
			expect(fs.existsSync(file)).toBe(true)
			fs.unlinkSync(file)
		}
		fs.rmSync('testMiktex',{recursive:true})
	})
})

describe('compileLatexPDF', () => {
	let result = ""
	const directory = 'C:/cdomtextest'
	const paperLocation = path.join(directory, clientDirectory, 'paper.tex')
	const styleLocation = path.join(directory, clientDirectory, 'style.tex')
	const targetLocation = path.join(directory, clientDirectory)
	const originalDir = process.cwd()

	beforeAll(() => {
		const testLatex = "hello there"
		fs.mkdirSync(directory, { recursive: true })
		createClientFilesystem(directory)
		fs.writeFileSync(paperLocation,testLatex)
		for (const type of metadataTypes) {
			const location = path.join(directory, metadataLocation, type + '.tex')
			fs.writeFileSync(location,`this is ${type}`)
		}
	})

	test('i set up the test files correctly', () => {
		expect(fs.existsSync(paperLocation)).toBe(true)
		expect(fs.existsSync(styleLocation)).toBe(true)
	})
	
	test('style.tex compiles', () => {
		try {
			result = compileLatexPDF(directory, styleLocation, targetLocation)
		} finally {
			const log = fs.readFileSync(path.join(directory, clientDirectory, 'style.log'), 'utf8')
			// console.log(log)
			expect(result).toContain('Output written on style.pdf')
		}
	})

        const latexFiles = ['style.aux','style.log','style.pdf']
	test('latex files are created', () => {
		for (const file of latexFiles) {
			const fileLocation = path.join(directory, clientDirectory, file)
			expect(fs.existsSync(fileLocation)).toBe(true)
		}
	})

	afterAll(() => {
		process.chdir(originalDir)
	})
})

