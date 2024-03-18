const { ipcRenderer } = require('electron');
const { setTheme } = require('./setTheme')
document.addEventListener('DOMContentLoaded', async () => {
	const openDirectoryButton = document.getElementById('open-directory-button');

	let directory;

	openDirectoryButton.addEventListener('click', async () => {
		ipcRenderer.send('pick-directory');
	})

	ipcRenderer.on('directory-picked', async (event, args) => {
		directory = args.directory;
		openDirectoryButton.innerText = directory;
	})

	const openFormatterButton = document.getElementById('open-formatter-button');

	openFormatterButton.addEventListener('click', async () => {
		if (!directory) {
			alert(`Please select a directory first. Cdomtex needs to know
				where your paper is.`);
			return;
		}
		ipcRenderer.send('open-formatter',{ directory: directory });
	})

	ipcRenderer.on('theme', (event, arg) => {
		setTheme(arg.theme)
	})

})
