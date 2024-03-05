const { ipcRenderer } = require('electron');

function sendParagraphs(paragraphs) {
	ipcRenderer.send('update-paragraphs',{ paragraphs: paragraphs })
}

exports.sendParagraphs = sendParagraphs;
