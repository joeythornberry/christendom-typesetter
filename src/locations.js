const path = require('path');

const clientDirectory = '!cdomtex'

exports.clientDirectory = clientDirectory;

const metadataLocationPath = [clientDirectory, 'metadata'];
const metadataLocation = path.join(...metadataLocationPath);

exports.metadataLocationPath = metadataLocationPath;
exports.metadataLocation = metadataLocation;

const footnotesLocationPath = [clientDirectory, 'footnotes'];
const footnotesLocation = path.join(...footnotesLocationPath);

exports.footnotesLocationPath = footnotesLocationPath;
exports.footnotesLocation = footnotesLocation;

const paragraphsLocationPath = [clientDirectory]
const paragraphsLocation = path.join(...paragraphsLocationPath);

exports.paragraphsLocationPath = paragraphsLocationPath
exports.paragraphsLocation = paragraphsLocation

const paperLocationPath = [clientDirectory,"paper.tex"]
const paperLocation = path.join(...paperLocationPath)

exports.paperLocationPath = paperLocationPath
exports.paperLocation = paperLocation

const themeLocationPath = [clientDirectory, 'theme.txt']
const themeLocation = path.join(...themeLocationPath)

exports.themeLocationPath = themeLocationPath
exports.themeLocation = themeLocation

const editLocationPath = [clientDirectory, 'edit.txt']
const editLocation = path.join(...editLocationPath)

exports.editLocationPath = editLocationPath
exports.editLocation = editLocation
