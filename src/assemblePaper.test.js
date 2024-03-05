const { assemblePaper } = require('./assemblePaper');

describe('assemblePaper', () => {
	const paragraphs = [
		`a\r\n\r\nb`,
		`c\n\nd`,
		'e'
		]
	test('assembles paragraphs into a paper', () => {
		expect(assemblePaper(paragraphs,{start: "<p>", end: "</p>"})).toBe('<p>a</p><p>b</p><p>c</p><p>d</p><p>e</p>')
	})
})
