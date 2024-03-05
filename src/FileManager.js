const fs = require('fs');
const path = require('path');
const { prevsLocation } = require('./locations.js');


class FileManager {

	constructor(directory, reportChange, interval) {
		this.directory = directory;
		this.interval = interval;
		this.reportChange = reportChange;
		this.watched = [];
	}

	fullName(shortName) {
		const fullName = path.join(this.directory, shortName);
		return fullName;
	}

	async updateWatched(watched) {
		for(const file of this.watched) {
			if(!watched.includes(file)) {
				fs.unwatchFile(this.fullName(file));
			}
		}

		for(const file of watched) {
			if(!this.watched.includes(file)) {
				fs.watchFile(this.fullName(file), {interval: this.interval}, () => {
					this.reportChange(file)
					}
				);
				
			}
		}
		this.watched = watched;
	}

}

exports.FileManager = FileManager;

