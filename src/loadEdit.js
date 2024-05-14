const { editLocation } = require('./locations.js')
const fs = require('fs')
const path = require('path')

function loadEdit(directory) {
	const edit = fs.readFileSync(path.join(directory,editLocation), "utf-8")
	return edit.trim()
}

exports.loadEdit = loadEdit
