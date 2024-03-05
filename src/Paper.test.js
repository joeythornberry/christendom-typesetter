const { Paper } = require('./Paper.js');
const { Footnote } = require('./Footnote.js');

describe('Paper', () => {

	const fakeAssembledFootnotes = [new Footnote('a','content of a'),new Footnote('b','content of b')]
	const text = "this test paper was assembled";
	const paper = new Paper(text,fakeAssembledFootnotes);

	test('Paper is constructed properly', () => {
		expect(paper.text).toBe("this test paper was assembled");
		expect(paper.footnotes).toEqual(fakeAssembledFootnotes);
	})

	test('Paper is converted to JSON properly', () => {
		const paperJSON = JSON.stringify(paper);
		const expectedJSON = '{"text":"this test paper was assembled","footnotes":[{"code":"a","text":"content of a"},{"code":"b","text":"content of b"}]}';
		expect(paperJSON).toBe(expectedJSON);
	})
})
