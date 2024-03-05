const { ipcRenderer } = require('electron');

function sendMetadatum(id, text) {
	ipcRenderer.send('update-metadatum', { id: id, text: text });
}

exports.sendMetadatum = sendMetadatum;
