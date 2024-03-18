function setTheme(theme) {
	const changes = []

		console.log("setting theme to", theme)
	if (theme === "light") {
		changes.push({property: "--background-color", value: "#ffffff"})
		changes.push({property: "--text-color", value: "#202020"})
		changes.push({property: "--tertiary-color",value: "#c2c2c2"})
		changes.push({property: "--edit-color", value: "#f0f0f0"})
	} else if (theme === "dark") {
		changes.push({property: "--background-color", value: "#101010"})
		changes.push({property: "--text-color", value: "#ffffff"})
		changes.push({property: "--tertiary-color",value: "#0000c0"})
		changes.push({property: "--edit-color", value: "#303030"})
	}
	for (const change of changes) {
	document.querySelector(":root").style.setProperty(change.property,change.value)
	}
}

exports.setTheme = setTheme
