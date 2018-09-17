let Router = require('./router');
let router = new Router();
let UserController = require('./user-controller');

router.get('/user/:id', UserController.getUser);

router.notFound((req, callback) => {
	let responseBody = req;
	responseBody.route = "Not Found!";

	const response = {
		statusCode: 404,
		body: JSON.stringify(responseBody),
	};
	callback(null, response);
});

exports.handler = (event, context, callback) => {
	router.run(event.httpMethod, event.path, event.body, callback);
};