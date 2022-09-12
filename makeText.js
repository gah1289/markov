/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');

const { MarkovMachine } = require('./markov');

async function generateText(type, source) {
	if (type == 'url') {
		try {
			await axios.get(source).then(function(resp) {
				let data = resp.data;
				let mm = new MarkovMachine(data);
				mm.makeText();
			});
		} catch (e) {
			console.error(`Error fetching ${type}: ${e}`);
			process.exit(1);
		}
	}
	else if (type == 'file') {
		fs.readFile(source, 'utf8', function(e, data) {
			if (e) {
				console.error(`Error reading ${path}: ${e}`);
				process.exit(1);
			}
			else {
				let mm = new MarkovMachine(data);
				mm.makeText();
			}
		});
	}
}

type = process.argv[2];
source = process.argv[3];

generateText(type, source);

module.exports = { generateText };
