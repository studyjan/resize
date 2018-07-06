var assert = require('assert');

const bm = require('../lib/utils/bliss').bm;

describe('Bliss utility', () => {
	describe('module', () => {
		it('pure', () => {
			assert.equal(
				bm('Test'),
				'Test'
			);
		});
		it('with string modifier', () => {
			assert.equal(
				bm('Test', 'red'),
				'Test Test--red'
			);
		});
		it('with string modifiers', () => {
			assert.equal(
				bm('Test', 'red bold'),
				'Test Test--red Test--bold'
			);
		});
		it('with array modifiers', () => {
			assert.equal(
				bm('Test', ['red', 'bold']),
				'Test Test--red Test--bold'
			);
		});
		it('with object modifiers', () => {
			assert.equal(
				bm('Test', { red: false, green: true, bold: true }),
				'Test Test--green Test--bold'
			);
		});
		it('with combined modifiers', () => {
			assert.equal(
				bm('Test', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]]),
				'Test Test--red Test--green Test--uppercase Test--ugly'
			);
		});
	});
});
