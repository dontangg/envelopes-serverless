'use strict';

const cryptoHelper = require('./crypto-helper');

module.exports = function(req) {
	if (req.method === 'POST' && req.path === '/sign_in')
		return true;

	if (!req.cookies || !req.cookies['SID'])
		return false;

	try {
		req.userId = cryptoHelper.decrypt(req.cookies['SID']);
	} catch(err) {
		console.log('Unable to decrypt SID cookie');
		console.log(err);
		return false;
	}

	return true;
};