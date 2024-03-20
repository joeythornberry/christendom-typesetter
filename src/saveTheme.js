const { themeLocation } = require('./locations')
const fs = require('fs')
const path = require('path')

function saveTheme(directory,theme) {
	fs.writeFileSync(path.join(directory,themeLocation), theme)
}

exports.saveTheme = saveTheme
