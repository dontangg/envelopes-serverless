class Router {
	constructor() {
		this.handlers = {
			"GET": [],
			"POST": [],
			"404": (req, callback) => callback(null, { statusCode: 404, body: 'Not Found' }),
		};
	}

	get(routePath, handler) {
		this.handlers["GET"].push({routePath, handler});
	}

	post(routePath, handler) {
		this.handlers["POST"].push({routePath, handler});
	}

	notFound(handler) {
		this.handlers["404"] = handler;
	}

	run(method, path, body, callback) {

		let req = { path };
		if (body) req.body = body;

		for (let i = 0; i < this.handlers[method].length; i++) {
			let {routePath, handler} = this.handlers[method][i];

			// Named groups are not supported in node.js 8, but they are in 10
			//let matchInfo = new RegExp(routePath.replace(/:([^/]+)/, "(?<$1>[^/]+)")).exec(path);
			//'/user/1234/test/44/qwerty'.match(new RegExp('/user/:id/test/:id2'.replace(/:[^/]+/g, '([^/?]+)') + '(?:\\?|$)'))

			let requestMatches = path.match(new RegExp(routePath.replace(/:[^/]+/g, '([^/?]+)') + '(?:\\?|$)'));
			if (requestMatches) {
				let routeParamNames = routePath.match(/:[^/]+/g).map(name => name.substr(1));
				let routeParams = {};
				for (let i = 1; i < requestMatches.length; i++) {
					routeParams[routeParamNames[i - 1]] = requestMatches[i];
				}

				req.routeParams = routeParams;
				handler(req, callback);
				return;
			}
		}

		this.handlers["404"](req, callback);
	}
}

module.exports = Router;