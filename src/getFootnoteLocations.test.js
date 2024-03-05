/**
 * @jest-environment jsdom
 */

const { getFootnoteLocations } = require('./getFootnoteLocations');

describe('getFootnoteLocations', () => {
	const { paperContainer, footnotesContainer } = createFakePaperAndControls()
	const locations = getFootnoteLocations(paperContainer,footnotesContainer)

	test('returns an array', () => {
		expect(Array.isArray(locations)).toBe(true)
	})

	test('array has correct length', () => {
		expect(locations.length).toBe(3)
	})

	test('array contains numbers', () => {
		locations.forEach((location) => {
			expect(typeof location).toBe('number')
		})
	})

	test('each number is greater than or equal to the last', () => {
		// jest doesn't really work well for this - i think it sticks the entire paper on one line, and <br>s don't help. right now, they all have a location of 0, which isn't great.
		locations.forEach((location,index) => {
			if (index > 0) {
				expect(location >= locations[index-1]).toBe(true)
			}
		})
	})
})

function createFakePaperAndControls() {
	document.body.innerHTML =
	'<div id="paper-and-controls-container">' +
	'<span id="paper-container">' +
		'<p>lorem ipsum dolor sit amet, conseptetur adipiscing elit,<sup>1</sup>' +
		'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
		'Helbren dolor est sed contra lumen dosn hhsjaklfdjhflasjdhf<sup>2</sup>' +
		'sdjflashdfkjsdhfkjdsh ahsdjflasdkjfhlasdkjfh hdjflasdkjfhalsdkjhf' +
		'hadjflhasdfkjhsadlfkj<sup>3</sup>' + 
		'</p>'+
	'</span>' +
	'<span id="footnotes-container">' +
	'</span>' +
	'</div>'

	const paperContainer = document.getElementById('paper-container')
	const footnotesContainer = document.getElementById('footnotes-container')

	return { paperContainer, footnotesContainer }
}
