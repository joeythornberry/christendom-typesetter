const { splitByEmptyLines } = require('./splitByEmptyLines');

function deNewline(input) {
	let counter = 0
	let output = ""
	while (counter < input.length) {
		if (input[counter] == "\r") {
			counter += 1
		} else if (input[counter] == "\n") {
			output += " "
			counter += 1
		} else {
			output += input[counter]
			counter += 1
		}
	}
	return output
}

function assemblePaper(paragraphs, paragraphDelimiters) { 
	let paper = ""
	for(const paragraphFile of paragraphs) {
		const splitFile = splitByEmptyLines(paragraphFile)
		for(const paragraph of splitFile) {
			paper += paragraphDelimiters.start
			const deNewlinedParagraph = deNewline(paragraph)
			paper += deNewlinedParagraph
			paper += paragraphDelimiters.end
		}
	}
	return paper
}

exports.assemblePaper = assemblePaper;
