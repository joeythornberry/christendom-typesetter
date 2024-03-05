const fs = require('fs');
const path = require('path');

function getPotentialParagraphs(directory) {
	const files = getFiles(directory)
	return files
}

function getFiles(directory, directoryPath = '') {
	let files = []
	fs.readdirSync(directory).forEach(file => {
		const location = path.join(directory, file)
		const relativeLocation = directoryPath == '' ? file : [directoryPath, file].join('/')
		if (!relativeLocation.includes('!') && !relativeLocation.endsWith('.pdf')) {
			const isDirectory = fs.lstatSync(location).isDirectory()
			if (isDirectory) {
				files = files.concat(getFiles(location, file))
			} else {
				files.push(relativeLocation)
			}
		}
	})
	return files
}

exports.getPotentialParagraphs = getPotentialParagraphs;
