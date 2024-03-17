function setTheme(theme) {
	const changes = []

		console.log("setting theme to", theme)
	if (theme === "light") {
		changes.push({property: "--background-color", value: "#ffffff"})
		changes.push({property: "--text-color", value: "#000000"})
		changes.push({property: "--tertiary-color",value: "ff5500"})
	} else if (theme === "dark") {
		changes.push({property: "--background-color", value: "#111111"})
		changes.push({property: "--text-color", value: "#ffffff"})
		changes.push({property: "--tertiary-color",value: "0000ff"})
	}
	for (const change of changes) {
	document.querySelector(":root").style.setProperty(change.property,change.value)
	}
}

exports.setTheme = setTheme
