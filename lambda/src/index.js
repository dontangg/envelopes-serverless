let Router = require('./router');
let router = new Router();
let UserController = require('./user-controller');

router.get('/user/:id', UserController.getUser);

exports.handler = async function(event, context, callback) {
	return router.run(event.httpMethod, event.path, event.body);
};