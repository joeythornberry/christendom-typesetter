function sanitizeTitle(title) {
	console.log("title:",title)
	let output = ""
	const illegalChars = ['#','%','&','{','}','\\','<','>','*','?','/','$','!',"'",'"',':','@','+','`','|','=','_']
	for (let i = 0; i < title.length; i++) {
		if(!illegalChars.includes(title[i])) {
			output += title[i]
		}
	}
	return output
}

exports.sanitizeTitle = sanitizeTitle
