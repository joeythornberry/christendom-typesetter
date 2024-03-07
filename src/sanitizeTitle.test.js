const { sanitizeTitle } = require('./sanitizeTitle.js')

describe('sanitizeTitle', () => {
	test('title with no illegal characters is unaffected', () => {
		const raw = "legal"
		const sanitized = sanitizeTitle(raw)
		expect(sanitized).toEqual(raw)
	})
	test('illegal chars are removed', () => {
		const raw = "!lleg_@l\\<>"
		const sanitized = sanitizeTitle(raw)
		expect(sanitized).toEqual('llegl')
	})
})
