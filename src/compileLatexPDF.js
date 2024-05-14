const child_process = require('child_process')
const path = require('path')
const fs = require('fs')
const { clientDirectory } = require('./locations.js')
const { dialog } = require('electron')

function compileLatexPDF(
	        directory,
		latex,
		targetDirectory = path.join(directory,clientDirectory)
			) {

	let success = true

	const currentDirectory = process.cwd()
	process.chdir(targetDirectory)
	let compileBatch = process.resourcesPath + '\\compile.bat'
	if(process.env.NODE_ENV === 'development') {
		// compileBatch = path.join(__dirname, 'resources', 'compile.bat"')
	}
	try {
		child_process.execSync(compileBatch, () => {})
	} catch (e) {
		const result = e.toString()
		if (result.includes('The system cannot find')) {
			const compileBatchText = fs.readFileSync(compileBatch, 'utf8')
			const message = `Tried to invoke pdflatex with:
			${compileBatchText} from ${process.cwd()} - it could not be found.
			Full error message: ${result}`

			dialog.showErrorBox('Cdomtex Error: cannot find MikTeX', message)
			success = false
		}
		else {
			const log = fs.readFileSync('style.log', 'utf8').split('\n')
			const errorLog = []
			let start = false
			for (let i = log.length - 1; i >= 0; i--) {
				const line = log[i]
				if (line.includes('output PDF file') || line.includes('on the terminal')) {
					continue
				}
				if (start) {
					errorLog.push(line)
				}
				if (start && line.includes('!')) {
					break
				}
				if (line.includes('!')) {
					start = true
					errorLog.push(line)
				} 
			}
			const error = errorLog.reverse().join('\n')
			dialog.showErrorBox('LaTeX Error',
			`${error}
			${result}`)
			success = false
		}	}
	process.chdir(currentDirectory)
	// const pdflatex = directory + 'miktex\\texmfs\\install\\miktex\\bin\\x64\\pdflatex.exe'
	// const currentDirectory = process.cwd()
	// process.chdir(targetDirectory)
	// const command = `${pdflatex} ${latex}`
	// const result = child_process.execSync(command, () => {}).toString()
	// process.chdir(currentDirectory)
	// return result
	
	return success
}

exports.compileLatexPDF = compileLatexPDF;
