function distributeFootnoteElements(footnotesContainer,locations,footnoteElements) {
	if (locations.length !== footnoteElements.length) {
		throw new Error('locations and footnoteElements must be the same length')
	}

	const footnotesContainerTop = footnotesContainer.getBoundingClientRect().top

	let previousFootnoteHolder = {
		getBoundingClientRect: () => {
			return {
				bottom: -1000000
			}
		},
		appendChild: (child) => {throw new Error('no previous footnote holder')}
	}

	for (let i = 0; i < locations.length; i++) {
		const footnoteElement = footnoteElements[i]
		const location = locations[i]
		const top = (location-footnotesContainerTop) + 'px'

		const footnoteHolderBottom = previousFootnoteHolder.getBoundingClientRect().bottom
		if (location > footnoteHolderBottom) {
			const footnoteHolder = document.createElement('div')
			footnoteHolder.classList.add('footnote-holder')
			footnoteHolder.style.setProperty('position', 'absolute')
			footnoteHolder.style.setProperty('margin-top', top)
			footnoteHolder.appendChild(footnoteElement)
			footnotesContainer.appendChild(footnoteHolder)
			previousFootnoteHolder = footnoteHolder
		} else {
			previousFootnoteHolder.appendChild(footnoteElement)
		}
	}

}

exports.distributeFootnoteElements = distributeFootnoteElements
