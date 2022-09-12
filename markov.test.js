const { MarkovMachine } = require('./markov');

describe('testMarkovMachine', function() {
	let mm;
	let chains;
	beforeEach(function() {
		mm = new MarkovMachine('the cat in the hat');
		chains = mm.makeChains();
	});
	test('Make Marckov object', function() {
		expect(mm).toMatchObject({
			words : [
				'the',
				'cat',
				'in',
				'the',
				'hat'
			]
		});
	});
	test('Set markov chains', function() {
		expect(chains.has('cat')).toEqual(true);
	});

	test('Return random text from chains', function() {
		let text = mm.makeText();
		expect(typeof text).toBe('string');
	});
});
