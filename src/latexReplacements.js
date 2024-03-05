const { replaceFootnoteLatex } = require('./replaceFootnote.js');
const { replaceNewlineLatex } = require('./replaceNewlineLatex.js');
const replacements = {
	'[': {
		"open_block_quotes": {
			createReplacement: (text, data) => {
				data.inBlockQuote = true
				return {
					before: "[[[",
					after: "\\Q{"
				}
			}
		}
	},
	']': {
		"close_block_quotes": {
			createReplacement: (text, data) => {
				data.inBlockQuote = false
				return {
					before: "]]]",
					after: "}"
				}
			}
		}
	},
	'W' : {
		"works_cited": {
			before: "WORKS CITED",
			after: "\\newpage\\centerline{WORKS CITED}"
		}
	},
	'B': {
		"bibliography": {
			before: "BIBLIOGRAPHY",
			after: "\\newpage\\centerline{BIBLIOGRAPHY}"
		}
	},
	'_': {

		"bibliography_item": {
			before: "___",
			after: "\\b "
		},
		"italics":
		{
			createReplacement: (text,data) => {
			        if (data.inItalics) {
					data.inItalics = false;
					return { 
						before: '_',
						after: '}'
					}
				} else {
					data.inItalics = true;
					return {
						before: '_',
						after: '\\textit{'
					}
				}
			}
		}
	},
	'"': {
		"quote": {
			createReplacement: (text, data) => {
				if (data.inQuote) {
					data.inQuote = false
					return {
						before: '"',
						after: "}",
					}
				} else {
					data.inQuote = true
					return {
						before: '"',
						after: "\\q{"
					}
				}
			}
		}
	},

	'^': {
		"footnote": {
			createReplacement: replaceFootnoteLatex
		}
	},
	"\n": {
		"newline": {
			createReplacement: replaceNewlineLatex
		}

	},
	"&": {
		"leading_space": {
			before: "&nbsp;",
			after: "\\ "
		}
	},
}

exports.replacements = replacements
