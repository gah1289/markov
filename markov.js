/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		let listWords = this.words;
		let chains = new Map();

		for (let i = 0; i < this.words.length; i++) {
			let key = listWords[i];
			let value = listWords[i + 1];
			if (chains.has(key)) {
				chains.get(key).push(value);
			}
			else {
				chains.set(key, [
					value
				]);
			}
		}
		// console.log(chains);
		return chains;
	}

	static random(ar) {
		return ar[Math.floor(Math.random() * ar.length)];
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let chains = this.makeChains();
		let keys = Array.from(chains.keys());
		let key = MarkovMachine.random(keys);
		let text = [];

		while (text.length < numWords && key) {
			text.push(key);
			key = MarkovMachine.random(chains.get(key));
		}
		let str = text.join(' ');
		console.log(str);
		return str;
	}
}

module.exports = { MarkovMachine };
