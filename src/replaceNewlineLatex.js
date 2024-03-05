function replaceNewlineLatex(text,data) {
	if(text[data.counter] != "\n") {
		throw new Error("Error: replaceNewlineLatex called on non-newline");
	}
	if(data.inBlockQuote && data.counter + 1 < text.length && !(["\n","\r"].includes(text[data.counter+1]))) {
		return {
			before: "\n",
			after: "\n\\newline\\indent "
		}
	} else {
		return {
			before: "\n",
			after: "\n"
		}
	}
}

exports.replaceNewlineLatex = replaceNewlineLatex
