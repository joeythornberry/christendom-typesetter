const { txtToHtml } = require('./txtToHtml');
const { txtToLatex } = require('./txtToLatex');
const { Footnote } = require('../paper/Footnote');
const fs = require('fs');
const path = require('path');

describe('txtToHtml', () => {
	const directories = fs.readdirSync(path.join(process.cwd(),'/html/test')) 
	for (let directory of directories) {
		const beforeText = fs.readFileSync(`./html/test/${directory}/text`, 'utf8');
		const afterHtml = fs.readFileSync(`./html/test/${directory}/html`, 'utf8');
		const afterLatex = fs.readFileSync(`./html/test/${directory}/latex`, 'utf8');
		const { html, footnotes } = txtToHtml(beforeText);
		const footnoteObjects = footnotes.map(footnote => new Footnote(footnote.id, "This is footnote "+footnote.id));
		const { latex } = txtToLatex(beforeText, footnoteObjects);

		test(directory, () => {
			expect(html).toBe(afterHtml);
			expect(latex).toBe(afterLatex);
		})

		const caretCount = beforeText.split('').filter(char => char === '^').length;
		test(`${directory} test has right number of footnotes`, () => {
			expect(footnotes.length).toBe(caretCount);
		})
	}

	test('footnotes get replaced in html', () => {
		const beforeText = 'This is a test^oooa';
		const afterHtml = 'This is a test<sup>1</sup>';
		const { html } = txtToHtml(beforeText);
		expect(html).toBe(afterHtml);
	})

	test('footnotes get replaced in latex', () => {
		const beforeText = 'This is a test.^oooa';
		const afterLatex = 'This is a test.\\footnote{test footnote}'
		const footnoteObjects = [new Footnote('oooa', 'test footnote')];
		const { latex } = txtToLatex(beforeText, footnoteObjects);
		expect(latex).toBe(afterLatex);
	})

	test('footnotes get replaced in latex, and in-footnote replacements work', () => {
		const beforeText = 'This is a test.^oooa';
		const afterLatex = 'This is a test.\\footnote{Test Author, \\q{Test Title}, \\textit{Test Journal}}'
		const footnoteObjects = [new Footnote('oooa','Test Author, "Test Title", _Test Journal_')];
		const { latex } = txtToLatex(beforeText, footnoteObjects);
		expect(latex).toBe(afterLatex);
	})
})
