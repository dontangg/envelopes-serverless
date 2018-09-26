'use strict';

class Router {
	constructor() {
		this.handlers = {
			"GET": [],
			"POST": [],
		};
	}

	get(routePath, handler) {
		this.handlers["GET"].push({routePath, handler});
	}

	post(routePath, handler) {
		this.handlers["POST"].push({routePath, handler});
	}

	async run(req) {

		for (let i = 0; i < this.handlers[req.method].length; i++) {
			let {routePath, handler} = this.handlers[req.method][i];

			// Named groups are not supported in node.js 8, but they are in 10
			//let matchInfo = new RegExp(routePath.replace(/:([^/]+)/g, "(?<$1>[^/]+)")).exec(req.path);
			//'/user/1234/test/44/qwerty'.match(new RegExp('/user/:id/test/:id2'.replace(/:[^/]+/g, '([^/?]+)') + '(?:\\?|$)'))

			let requestMatches = req.path.match(new RegExp(routePath.replace(/:[^/]+/g, '([^/?]+)') + '(?:\\?|$)'));
			if (requestMatches) {
				let routeParams = {};

				let routeParamNames = routePath.match(/:[^/]+/g);
				if (routeParamNames) {
					for (let i = 1; i < requestMatches.length; i++) {
						let paramName = routeParamNames[i - 1].substr(1);
						routeParams[paramName] = requestMatches[i];
					}
				}

				req.routeParams = routeParams;
				return handler(req);
			}
		}

		return { statusCode: 404, body: JSON.stringify({ 'message': 'Not Found' }) };
	}
}

module.exports = Router;