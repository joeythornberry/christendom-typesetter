const { footnotesLocation } = require('./locations.js')
const path = require('path')
const fs = require('fs')

function saveFootnote(directory, code, text) {
	const location = path.join(directory, footnotesLocation, code)
	fs.writeFileSync(location, text)
}

exports.saveFootnote = saveFootnote
