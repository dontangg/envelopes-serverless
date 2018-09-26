'use strict';

let assert = require('assert');
let cookieParser = require('../src/cookie-parser');

describe('cookieParser', function() {

	describe('when none are supplied', function() {
		it('creates empty cookies when there are no headers', function() {
			let req = {};
			cookieParser(req);

			assert.deepStrictEqual(req.cookies, {});
		});

		it('creates empty cookies when there are no cookies in the headers', function() {
			let req = { headers: {} };
			cookieParser(req);

			assert.deepStrictEqual(req.cookies, {});
		});
	});

	it('handles a single cookie', function() {
		let req = { headers: { 'Cookie': 'a=1' }};
		cookieParser(req);

		assert.deepStrictEqual(req.cookies, { 'a':'1' });
	});

	it('handles multiple cookies', function() {
		let req = { headers: { 'Cookie': 'a=1; b=2' }};
		cookieParser(req);

		assert.deepStrictEqual(req.cookies, { 'a':'1', 'b':'2' });
	});

	it('handles trailing semicolon', function() {
		let req = { headers: { 'Cookie': 'a=1; b=2;' }};
		cookieParser(req);

		assert.deepStrictEqual(req.cookies, { 'a':'1', 'b':'2' });
	});

	it('handles cookie with no value', function() {
		let req = { headers: { 'Cookie': 'a' }};
		cookieParser(req);

		assert.deepStrictEqual(req.cookies, { 'a':null });
	});

});