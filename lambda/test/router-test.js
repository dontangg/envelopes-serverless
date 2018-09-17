var assert = require('assert');
var Router = require('../src/router');

describe('Router', function() {
	let router;
	beforeEach(function() {
		router = new Router();
	});

	describe('#get()', function() {
		it('should register a GET route that gets called with the appropriate URL', function(done) {
			const userId = 10;
			router.get('/user/:id', (req, callback) => {
				assert.equal(req.routeParams.id, userId);
				callback();
			});
			router.run('GET', `/user/${userId}`, null, done);
		});
	});

	describe('#notFound()', function() {
		it('should handle unregistered routes', function(done) {
			router.notFound((req, callback) => {
				callback();
			});
			router.run('GET', '/non-supported-url', null, done);
		});
	});
});