const { themeLocation } = require('./locations.js')
const fs = require('fs')
const path = require('path')

function loadTheme(directory) {
	const theme = fs.readFileSync(path.join(directory,themeLocation), "utf-8")
	return theme.trim()
}

exports.loadTheme = loadTheme
