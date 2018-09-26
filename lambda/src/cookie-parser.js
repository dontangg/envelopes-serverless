'use strict';

// NOTE: this doesn't currently support the HTTP/2 spec that allows multiple cookie headers
// https://tools.ietf.org/html/rfc7540#section-8.1.2.5

module.exports = function(req) {

	req.cookies = {};

	if (!req.headers)
		return;

	let cookieStr = req.headers["Cookie"];
	if (!cookieStr)
		return;

	let params = cookieStr.split(';');
	for (let i = 0; i < params.length; i++) {
		let param = params[i].trim();
		if (!param)
			continue;

		let equalsIndex = param.indexOf('=');
		if (equalsIndex === -1) {
			req.cookies[param] = null;
		} else {
			let cookieName = param.substring(0, equalsIndex).trim();
			let cookieValue = param.substring(equalsIndex + 1).trim();

			req.cookies[cookieName] = cookieValue;
		}
	}

};