const { loadParagraphs } = require('./loadParagraphs.js')
const { loadParagraphText } = require('./loadParagraphText.js')
const { assemblePaper } = require('./assemblePaper.js')
const { assembleFootnotes } = require('./assembleFootnotes.js')
const { saveParsedFootnotes } = require('./saveParsedFootnotes.js')
const { loadMetadata } = require('./loadMetadata.js')
const { txtToHtml } = require('./txtToHtml.js')
const { Paper } = require('./Paper.js')

function loadPaper(directory){
	const paragraphNames = loadParagraphs(directory)
	const paragraphText = loadParagraphText(directory,paragraphNames)
	const text = assemblePaper(paragraphText, {start: "<p>", end: "</p>"})
	const parsed = txtToHtml(text)
	saveParsedFootnotes(directory,parsed.footnotes)
	const assembledFootnotes = assembleFootnotes(directory)
	const metadata = loadMetadata(directory)
	const assembledPaper =
		new Paper(parsed.html, assembledFootnotes, paragraphNames, metadata)
	return assembledPaper
}

exports.loadPaper = loadPaper
