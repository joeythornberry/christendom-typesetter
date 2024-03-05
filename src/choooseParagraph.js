const { ipcRenderer } = require('electron')

function chooseParagraph(index) {
	ipcRenderer.send('choose-paragraph',{ index: index })
}

exports.chooseParagraph = chooseParagraph
