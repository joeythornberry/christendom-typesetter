const path = require('path');
const fs = require('fs');
const { metadataLocation } = require('./locations.js');

function saveMetadatum(directory, id, text) {
	fs.writeFileSync(path.join(directory, metadataLocation, id), text);
}

exports.saveMetadatum = saveMetadatum;
