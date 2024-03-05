const { splitByEmptyLines } = require('./splitByEmptyLines');

describe('splitByEmptyLines', () => {
	const windowsNewLine = `hello there

there was a gap above this`

	const explicitWindowsNewLine = `hello there\r\n\r\nthere was a gap above this`

	const linuxNewLine = `hello there\n\nthere was a gap above this`

	test('splits by empty lines for just multi-line string', () => {
		const split = splitByEmptyLines(windowsNewLine);
		expect(split.length).toBe(2);
		expect(split[0]).toBe('hello there');
		expect(split[1]).toBe('there was a gap above this');
	})

	test('splits by empty lines for explicit multi-line string', () => {
		const split = splitByEmptyLines(explicitWindowsNewLine);
		expect(split.length).toBe(2);
		expect(split[0]).toBe('hello there');
		expect(split[1]).toBe('there was a gap above this');
	})
})
