var assert = require('assert');

const bm = require('../lib/utils/bliss').bm;
const be = require('../lib/utils/bliss').be;

describe('Bliss utility', () => {
	describe('module', () => {
		it('pure', () => {
			assert.equal(
				bm('Test'),
				'Test'
			);
		});
		it('with modifier', () => {
			assert.equal(
				bm('Test', 'red'),
				'Test Test--red'
			);
		});
		it('with multiple modifiers', () => {
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
		it('with modifier and state', () => {
			assert.equal(
				bm('Test', 'red', 'isOpen'),
				'Test Test--red isOpen'
			);
		});
		it('with combined modifiers', () => {
			assert.equal(
				bm('Test', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]]),
				'Test Test--red Test--green Test--uppercase Test--ugly'
			);
		});
		it('with combined modifiers and combined state', () => {
			assert.equal(
				bm('Test', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]], [{ isOpen: 1, isBroken: undefined }, 'isOk', [[['isUgly']]]]),
				'Test Test--red Test--green Test--uppercase Test--ugly isOpen isOk isUgly'
			);
		});
	});


	describe('element', () => {
		it('without element name', () => {
			assert.equal(
				be('Test'),
				'Test-undefined'
			);
		});
		it('with non sting element name', () => {
			assert.equal(
				be('Test', ['red']),
				'Test-undefined'
			);
		});
		it('with element name', () => {
			assert.equal(
				be('Test', 'content'),
				'Test-content'
			);
		});
		it('with element name and modifier', () => {
			assert.equal(
				be('Test', 'content', 'red'),
				'Test-content Test-content--red'
			);
		});
		it('with element name, modifier and state', () => {
			assert.equal(
				be('Test', 'content', 'red', 'isOpen'),
				'Test-content Test-content--red isOpen'
			);
		});
		it('with element name and state, without modifier', () => {
			assert.equal(
				be('Test', 'content', null, 'isOpen'),
				'Test-content isOpen'
			);
		});
		it('with element name, combined modifiers and combined state', () => {
			assert.equal(
				be('Test', 'content', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]], [{ isOpen: 1, isBroken: undefined }, 'isOk', [[['isUgly']]]]),
				'Test-content Test-content--red Test-content--green Test-content--uppercase Test-content--ugly isOpen isOk isUgly'
			);
		});
	});
});
