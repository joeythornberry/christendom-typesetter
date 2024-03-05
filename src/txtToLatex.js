 const { replacements } = require('./latexReplacements.js');

function txtToLatex(text,footnotes) {
	let html = "";
	let normalCharacter = true;
	const data = {
		counter: 0,
		footnotes: footnotes,
		inQuote: false,
		inBlockQuote: false,
		inItalics: false,
	}

	function makeReplacement(replacement) {
		if(replacement.createReplacement === undefined) {
			return replace(replacement)
		} else {
			return replace(replacement.createReplacement(text,data))
		}
	}

	function replace(replacement) {
		const replacementLength = replacement.before.length
		const begin = data.counter
		const end = data.counter+replacementLength
		const substring = text.substring(begin,end)
		if(substring === replacement.before) { 
			html += replacement.after
			data.counter += replacementLength-1
			return true
		}
		return false
	}
	
	function checkBeginningKey(key) {
		for (let k in replacements[key]) {
			const replacementFound = makeReplacement(replacements[key][k])
			if(replacementFound) {
				normalCharacter = false;
				break
			}
		}
	}

	for(const footnote of data.footnotes) {
		footnote.text = txtToLatex(footnote.text,[]).latex
	}

	for (data.counter = 0; data.counter < text.length; data.counter++) {

		const c = text[data.counter];

		for (let key in replacements) {
			if (c === key) {
				checkBeginningKey(key)
			}
		}

		if (normalCharacter) {
			html += c
		} else {
			normalCharacter = true;
		}
	}

	if (data.inQuote) {
		throw new Error("Missing closing double quote")
	}
	if (data.inBlockQuote) {
		throw new Error("Missing closing block quote")
	}
	if (data.inItalics) {
		throw new Error("Missing closing italics")
	}

	return { latex: html }
}

exports.txtToLatex = txtToLatex;

