'use strict';

let authorizer = require('./authorizer');
let cookieParser = require('./cookie-parser');
let Router = require('./router');
let router = new Router();
let UserController = require('./user-controller');

router.get('/user', UserController.getUser);
router.post('/user', UserController.saveUser);

router.post('/sign_in', UserController.signIn);
router.post('/sign_out', UserController.signOut);

exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false;

	console.log(`${event.httpMethod} ${event.path}`);

	//return { statusCode: 200, body: JSON.stringify({ event, context }) };

	let req = {
		method: event.httpMethod,
		path: event.path,
		headers: event.headers,
		query: event.queryStringParameters,
	};
	if (event.body) req.body = event.body;

	cookieParser(req);

	let response = null;
	if (!authorizer(req)) {
		response = { statusCode: 401, body: JSON.stringify({ 'message': 'Unauthorized' }) };
	} else {
		response = await router.run(req);
	}

	if (req.headers) {
		let origin = event.headers['Origin'] || event.headers['origin'];
		if (origin === 'http://envelopes.thewilsonpad.com' || origin === 'http://local.int:1234') {
			if (!response.headers)
				response.headers = {};
			response.headers['Access-Control-Allow-Origin'] = origin;
			response.headers['Access-Control-Allow-Credentials'] = 'true';
		}
	}

	return response;
};