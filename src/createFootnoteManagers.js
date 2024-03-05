const { FootnoteManager } = require('./FootnoteManager.js')
function createFootnoteManagers(footnoteElements, footnotes, updateFootnote) {
	return footnoteElements.map((element,index) => {
		const manager = new FootnoteManager(index + 1, footnotes[index].code, footnotes[index].text, element, updateFootnote)
		manager.initialize()
		return manager
	})
}

exports.createFootnoteManagers = createFootnoteManagers
