const fs = require('fs');
const path = require('path');

function loadParagraphText(directory, paragraphs) {
	return paragraphs.map(paragraph => {
		const location = path.join(directory, paragraph)
		const text = fs.readFileSync(location, 'utf8')
		return text 
	})
}

exports.loadParagraphText = loadParagraphText
