import { bm, be } from './bliss';

describe('Bliss utility', () => {
	describe('module', () => {
		it('pure', () => {
			expect(bm('Test'))
				.toEqual('Test');
		});
		it('with modifier', () => {
			expect(bm('Test', 'red'))
				.toEqual('Test Test--red');
		});
		it('with multiple modifiers', () => {
			expect(bm('Test', 'red bold'))
				.toEqual('Test Test--red Test--bold');
		});
		it('with array modifiers', () => {
			expect(bm('Test', ['red', 'bold']))
				.toEqual('Test Test--red Test--bold');
		});
		it('with object modifiers', () => {
			expect(bm('Test', { red: false, green: true, bold: true }))
				.toEqual('Test Test--green Test--bold');
		});
		it('with modifier and state', () => {
			expect(bm('Test', 'red', 'isOpen'))
				.toEqual('Test Test--red isOpen');
		});
		it('with combined modifiers', () => {
			expect(bm('Test', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]]))
				.toEqual('Test Test--red Test--green Test--uppercase Test--ugly');
		});
		it('with combined modifiers and combined state', () => {
			expect(bm('Test', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]], [{ isOpen: 1, isBroken: undefined }, 'isOk', [[['isUgly']]]]))
				.toEqual('Test Test--red Test--green Test--uppercase Test--ugly isOpen isOk isUgly');
		});
	});


	describe('element', () => {
		it('without element name', () => {
			expect(be('Test'))
				.toEqual('Test-undefined');
		});
		it('with non sting element name', () => {
			expect(be('Test', ['red']))
				.toEqual('Test-undefined');
		});
		it('with element name', () => {
			expect(be('Test', 'content'))
				.toEqual('Test-content');
		});
		it('with element name and modifier', () => {
			expect(be('Test', 'content', 'red'))
				.toEqual('Test-content Test-content--red');
		});
		it('with element name, modifier and state', () => {
			expect(be('Test', 'content', 'red', 'isOpen'))
				.toEqual('Test-content Test-content--red isOpen');
		});
		it('with element name and state, without modifier', () => {
			expect(be('Test', 'content', null, 'isOpen'))
				.toEqual('Test-content isOpen');
		});
		it('with element name, combined modifiers and combined state', () => {
			expect(be('Test', 'content', [{ red: 1, green: true, bold: undefined }, 'uppercase', [[['ugly']]]], [{ isOpen: 1, isBroken: undefined }, 'isOk', [[['isUgly']]]]))
				.toEqual('Test-content Test-content--red Test-content--green Test-content--uppercase Test-content--ugly isOpen isOk isUgly');
		});
	});
});
