
class UserController {
	static getUser(req, callback) {
		let responseBody = req;
		responseBody.route = "Get a user";

		const response = {
			statusCode: 200,
			body: JSON.stringify(responseBody),
		};
		callback(null, response);
	}
}

module.exports = UserController;
