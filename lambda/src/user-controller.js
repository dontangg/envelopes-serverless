
class UserController {
	static async getUser(req) {
		let responseBody = req;
		responseBody.route = "Get a user";

		const response = {
			statusCode: 200,
			body: JSON.stringify(responseBody),
		};
		return response;
	}
}

module.exports = UserController;
