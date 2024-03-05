const { paragraphsLocation } = require('./locations.js')
const path = require('path')
const fs = require('fs')

function loadParagraphs(directory) {
	const location = path.join(directory,paragraphsLocation,'paragraphs.json')
	const paragraphsJson = fs.readFileSync(location,'utf-8')
	const paragraphs = JSON.parse(paragraphsJson)
	return paragraphs
}

exports.loadParagraphs = loadParagraphs
