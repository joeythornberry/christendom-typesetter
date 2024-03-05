const { replaceFootnoteHtml } = require('./replaceFootnote.js');

const replacements = {
	'[' : {
		"open_block_quotes":
		{
			before: '[[[',
			after: '<div class="block-quote-outer"><div class="block-quote-inner">',
		}
			
	},
	']' : {
		"close_block_quotes":
		{
			before: ']]]',
			after: '</div></div>',
		}
	},
	'W': {
		"works_cited": {
			before: "WORKS CITED",
			after: "<div class='bibliography'>WORKS CITED</div>"
			}
	},
	'B': {
		"bibliography": {
			before: "BIBLIOGRAPHY",
			after: "<div class='bibliography'>BIBLIOGRAPHY</div>"
		}
	},
	'_': {
		"bibliography_item":
		{
			before: "___",
			after: "<br><br>"
		},
		"italics":
		{
			createReplacement: (text,data) => {
			        if (data.inItalics) {
					data.inItalics = false;
					return { 
						before: '_',
						after: '</i>'
					}
				} else {
					data.inItalics = true;
					return {
						before: '_',
						after: '<i>'
					}
				}
			}
		}
	},
	'^': {
		"footnote":
		{
			createReplacement:  replaceFootnoteHtml
		}
	},
}

exports.replacements = replacements;
