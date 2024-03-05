const { FootnoteManager } = require('./FootnoteManager.js')

function createFootnoteElements(footnotes) {
	return footnotes.map((footnote,index) => {
		const element = document.createElement('div')
		element.classList.add('footnote-element')
		return element
	})
}

exports.createFootnoteElements = createFootnoteElements
