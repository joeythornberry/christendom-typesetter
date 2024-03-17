const { themeLocation } = require('./locations')
const fs = require('fs')

function saveTheme(theme) {
	fs.writeFileSync(themeLocation, theme)
}

exports.saveTheme = saveTheme
