const { sendMetadatum } = require('./sendMetadatum.js');

function displayMetadata(metadata) {
	const metadataContainer = document.getElementById('metadata-container');
	metadataContainer.innerHTML = '';

	const metadataElements = [];

	for (const datum of ['name','class','professor','date']) {
		const metadataElement = document.createElement('div');
		metadataElement.innerHTML = metadata[datum];
		metadataElement.classList.add("upper-left-metadata");
		metadataElements.push(metadataElement);
		metadataElement.oninput = function() {
			sendMetadatum(datum, metadataElement.innerHTML);
		}
	}

	for (const datum of ['title']) {
		const metadataElement = document.createElement('div');
		metadataElement.innerHTML = metadata[datum];
		metadataElement.classList.add("center-metadata");
		metadataElements.push(metadataElement);
		metadataElement.oninput = function() {
			sendMetadatum(datum, metadataElement.innerHTML);
		}
	}

	for (const metadataElement of metadataElements) {
		metadataElement.contentEditable = true;
		metadataElement.spellcheck = false;
		metadataContainer.appendChild(metadataElement);
	}
}

exports.displayMetadata = displayMetadata;
