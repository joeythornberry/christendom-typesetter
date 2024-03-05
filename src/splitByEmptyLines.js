function splitByEmptyLines(text) { 
	const regex = /\r?\n\r?\n/;
	const split = text.split(regex);
	return split
}

exports.splitByEmptyLines = splitByEmptyLines;
