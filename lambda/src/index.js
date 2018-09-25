'use strict';

let Router = require('./router');
let router = new Router();
let UserController = require('./user-controller');

router.get('/user/:id', UserController.getUser);
router.post('/user/:id', UserController.saveUser);
router.post('/user', UserController.saveUser);

router.post('/sign_in', UserController.signIn);
router.post('/sign_out', UserController.signOut);

exports.handler = async function(event, context, callback) {
	context.callbackWaitsForEmptyEventLoop = false;

	console.log(`${event.httpMethod} ${event.path}`);
	return router.run(event.httpMethod, event.path, event.body);
};