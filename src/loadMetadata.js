const { metadataLocation } = require('./locations.js');
const { metadataTypes } = require('./constants.js');
const path = require('path');
const fs = require('fs');


function loadMetadata(directory) {
	const metadata = {};

	for (const id of metadataTypes) {
		const metadataPath = path.join(directory, metadataLocation, id);
		let metadataValue = '';

		try {
			metadataValue = fs.readFileSync(metadataPath, 'utf8');
		} catch (err) {
			if (err.code !== 'ENOENT') {
				throw err;
			}
		}

		metadata[id] = metadataValue;
	}

	return metadata;
}

exports.loadMetadata = loadMetadata;
