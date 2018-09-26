'use strict';

let assert = require('assert');
let Router = require('../src/router');

describe('Router', function() {
	let router;
	beforeEach(function() {
		router = new Router();
	});

	describe('#get()', function() {
		it('should register a GET route that gets called with the appropriate URL', async function() {
			const userId = 10;
			const responseBody = 'get a user';

			router.get('/user/:id', (req) => {
				assert.equal(req.routeParams.id, userId);
				return { body: responseBody};
			});
			let response = await router.run({ method: 'GET', path: `/user/${userId}` });
			assert.equal(response.body, responseBody);
		});
	});

	describe('404', function() {
		it('should handle unregistered routes', async function() {
			let response = await router.run({ method: 'GET', path: '/non-supported-url' });
			assert.equal(response.statusCode, 404);
		});
	});
});