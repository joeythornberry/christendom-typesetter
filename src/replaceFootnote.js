function replaceFootnoteHtml(text,data) {
	let code = "";
	let i = data.counter
	if (text[i] != '^') {
		throw new Error("Error: replaceFootnote called on non-footnote");
	}
	i++;
	while (i < text.length && !(['\n','\r','\t',' ','<','\\'].includes(text[i]))) {
		code += text[i];
		i++;
	}

	const num = data.footnotes.length + 1
	data.footnotes.push(code);
	
	return {
		before: "^" + code,
	        after: "<sup>" + num + "</sup>"
	}
}

function replaceFootnoteLatex(text,data) {
	let code = "";
	let i = data.counter
	if (text[i] != '^') {
		throw new Error("Error: replaceFootnote called on non-footnote");
	}
	i++;
	while (i < text.length && !(['\n','\r','\t',' ','<','\\'].includes(text[i]))) {
		code += text[i];
		i++;
	}
	let footnoteText = `ERROR: Footnote ${code} not found`
	for(const footnote of data.footnotes) {
		if (footnote.code == code) {
			footnoteText = footnote.text;
		}
	}

	console.log(`setting footnote ${code} to ${footnoteText}`)
	return {
		before: "^" + code,
		after: "\\footnote{" + footnoteText + "}"
	}
}

exports.replaceFootnoteHtml = replaceFootnoteHtml;
exports.replaceFootnoteLatex = replaceFootnoteLatex;
