const { dialog, app } = require('electron')
const { launcher } = require('./windowLauncher.js')

function start() {
	launcher()
}

app.whenReady().then(() => {
	if (process.env.NODE_ENV === 'development') {
		console.log('Running in development mode')
	} else {
		console.log('Running in production mode')
	}
	start()
})
