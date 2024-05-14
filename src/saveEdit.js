const { editLocation } = require('./locations')
const fs = require('fs')
const path = require('path')

function saveEdit(directory,edit) {
	fs.writeFileSync(path.join(directory,editLocation), edit)
}

exports.saveEdit = saveEdit
