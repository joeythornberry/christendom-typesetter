const { paragraphsLocation } = require('./locations.js')
const path = require('path')
const fs = require('fs')

function saveParagraphs(directory,paragraphs) {
	const location = path.join(directory,paragraphsLocation,'paragraphs.json')
	const paragraphsJson = JSON.stringify(paragraphs)
	fs.writeFileSync(location,paragraphsJson)
}

exports.saveParagraphs = saveParagraphs
