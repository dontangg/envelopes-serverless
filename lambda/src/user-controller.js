'use strict';

const cryptoHelper = require('./crypto-helper');
const db = require('db');


class UserController {

	static async signIn(req) {
		let { username, password } = JSON.parse(req.body);

		let user = await db.User.findByEmail(username);
		if (user) {
			let passwordHash = await cryptoHelper.hashPassword(password, user.passwordSalt);

			if (passwordHash === user.passwordDigest) {
				let finalEncrypted = cryptoHelper.encrypt(user.id);

				return {
					statusCode: 200,
					headers: { "Set-Cookie": `SID=${finalEncrypted}; Secure; HttpOnly` },
					body: '',
				};
			}
		}

		return {
			statusCode: 400,
			headers: { "Set-Cookie": 'SID=; Max-Age:0' },
			body: '',
		};
	}

	static async signOut(req) {
		return {
			statusCode: 200,
			headers: { "Set-Cookie": 'SID=; Max-Age:0' },
			body: '',
		};
	}


	static async getUser(req) {
		let user = await db.User.get(req.routeParams.id);

		if (!user) {
			return { statusCode: 404 };
		}

		delete user.passwordDigest;
		delete user.bankPasswordCipher;
		delete user.passwordSalt;

		return { statusCode: 200, body: JSON.stringify(user) };
	}

	static async saveUser(req) {
		let user = JSON.parse(req.body);

		if (user.password) {
			user.passwordSalt = cryptoHelper.generatePasswordSalt();
			user.passwordDigest = await cryptoHelper.hashPassword(user.password, user.passwordSalt);
		}

		await db.User.save(user);

		return { statusCode: 200, body: JSON.stringify({ id: user.id }) };
	}
}

module.exports = UserController;
