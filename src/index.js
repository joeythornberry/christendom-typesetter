const { dialog, app } = require('electron')
const { argv } = require('process')
const { launcher } = require('./windowLauncher.js')
const { formatter } = require('./windowFormatter.js')
const { createClientFilesystem } = require('./createClientFilesystem')

function start(args) {
	if (args.length === 0) {
		launcher()
		return
	}

	for (let arg in args) {
		if (arg === ".") {
			arg = process.cwd()
		} else if (arg === "..") {
			arg = process.cwd() + "/.."
		}
	}

	const directory = args[0]
	formatter(directory)

}

app.whenReady().then(() => {

	if (process.env.NODE_ENV === 'development') {
		// console.log('Running in development mode')
	} else {
		// console.log('Running in production mode')
	}

	let args = []

	if (argv.length > 1) {
		if (argv[1].includes('index.js')) {
			args = argv.slice(2)
		} else {
			args = argv.slice(1)
		}
	}

	start(args)
})
