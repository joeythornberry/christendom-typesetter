function getFootnoteLocations(paperContainer) {
	const sups = paperContainer.querySelectorAll('sup')
	const locations = []
        for(const sup of sups) {
		locations.push(sup.getBoundingClientRect().top)
	}
	return locations
}

exports.getFootnoteLocations = getFootnoteLocations
