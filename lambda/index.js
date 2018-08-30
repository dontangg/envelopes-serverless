exports.handler = (event, context, callback) => {
	// TODO implement
	let o = {
		message: "Hi!",
		event,
		context,
	};
	const response = {
		statusCode: 200,
		body: JSON.stringify(o)
	};
	callback(null, response);
};