const { themeLocation } = require('./locations.js')
const fs = require('fs')

function loadTheme() {
	const theme = fs.readFileSync(themeLocation, "utf-8")
	return theme.trim()
}

exports.loadTheme = loadTheme
