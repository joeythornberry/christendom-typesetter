const { footnotesLocation } = require('./locations.js')
const { Footnote } = require('./Footnote.js')
const fs = require('fs');
const path = require('path');

function assembleFootnotes(directory) {
	const footnotesJsonLocation = path.join(directory,footnotesLocation,"footnotes.json");
	const footnotesJson = JSON.parse(fs.readFileSync(footnotesJsonLocation))
	const assembledFootnotes = footnotesJson.map(footnote => {
		const footnoteLocation = path.join(directory,footnotesLocation,footnote)
		const footnoteText = fs.readFileSync(footnoteLocation).toString()
		return new Footnote(footnote,footnoteText)
	})
	return assembledFootnotes
}

exports.assembleFootnotes = assembleFootnotes;
