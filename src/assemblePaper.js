const { splitByEmptyLines } = require('./splitByEmptyLines');

function assemblePaper(paragraphs, paragraphDelimiters) { 
	let paper = ""
	for(const paragraphFile of paragraphs) {
		const splitFile = splitByEmptyLines(paragraphFile)
		for(const paragraph of splitFile) {
			paper += paragraphDelimiters.start
			paper += paragraph
			paper += paragraphDelimiters.end
		}
	}
	return paper
}

exports.assemblePaper = assemblePaper;
