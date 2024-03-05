const fs = require('fs');
const path = require('path');
const { footnotesLocation } = require('./locations.js')

function saveParsedFootnotes(directory,footnotes) {
	fs.writeFileSync(path.join(directory,footnotesLocation,"footnotes.json"), JSON.stringify(footnotes));

	for (const footnote of footnotes) {
		const footnotePath = path.join(directory,footnotesLocation,footnote);
		if(!fs.existsSync(footnotePath)) {
			fs.writeFileSync(footnotePath,``);
		}
	}
}

exports.saveParsedFootnotes = saveParsedFootnotes;
