const { txtToLatex } = require('./txtToLatex.js');
const fs = require('fs');
const { metadataLocation } = require('./locations.js');
const { loadMetadata } = require('./loadMetadata.js');
const path = require('path');

function compileMetadataLatex(directory) {
	const metadata = loadMetadata(directory);
	for (const [id,text] of Object.entries(metadata)) {
		const { latex } = txtToLatex(text,[]);
		fs.writeFileSync(path.join(directory, metadataLocation, id + '.tex'), latex);
	}
}

exports.compileMetadataLatex = compileMetadataLatex;
