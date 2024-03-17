const { metadataTypes } = require('./constants.js')
const { themeLocation, footnotesLocationPath, metadataLocationPath, metadataLocation, clientDirectory, paragraphsLocation} = require('./locations.js')
const path = require('path');
const fs = require('fs');

function createClientFilesystem(directory) { 
	let d = directory;
	for(const metadataDirectory of metadataLocationPath) {
		d = path.join(d, metadataDirectory);
		if(!fs.existsSync(d)) {
			fs.mkdirSync(d);
		}
	}

	for (const metadatum of metadataTypes) {
		const metadataPath = path.join(directory, metadataLocation, metadatum);
		if(!fs.existsSync(metadataPath)) {
			let text = `Click to edit ${metadatum}`;
			if(metadatum === 'date') {
				text = `\\today%(automatic)`
			}
			fs.writeFileSync(metadataPath, text);
		}
	}

	const metadataTexPath = path.join(directory, clientDirectory, "metadata.tex");
	if (!fs.existsSync(metadataTexPath)) {
		fs.copyFileSync(path.join(__dirname, "metadata.tex"), metadataTexPath);
	}

	const styleTexPath = path.join(directory, clientDirectory, "style.tex");
	if (!fs.existsSync(styleTexPath)) {
		fs.copyFileSync(path.join(__dirname, "style.tex"), styleTexPath);
	}

	const paragraphsPath = path.join(directory, paragraphsLocation, "paragraphs.json")
	if (!fs.existsSync(paragraphsPath)) {
		fs.writeFileSync(paragraphsPath, "[]");
	}

	d = directory
	for(const footnotesDirectory of footnotesLocationPath) {
		d = path.join(d, footnotesDirectory);
		if(!fs.existsSync(d)) {
			fs.mkdirSync(d);
		}
	}

	if(!fs.existsSync(themeLocation)) {
		fs.writeFileSync(themeLocation,"light")
	}
}
	
exports.createClientFilesystem = createClientFilesystem;
