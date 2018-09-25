'use strict';

const crypto = require('crypto');

module.exports = {
	generatePasswordSalt: function() {
		return crypto.randomBytes(128).toString('base64');
	},

	hashPassword: async function(password, salt) {
		const iterations = 10000;
		const keylen = 256;
		let passwordHash = await new Promise((resolve, reject) => {
			crypto.pbkdf2(password, salt, iterations, keylen, 'sha512', function(err, derivedKey) {
				err ? reject(err) : resolve(derivedKey.toString('hex'));
			});
		});

		return passwordHash;
	},

	encrypt: function(str) {
		let iv = crypto.randomBytes(16); // The initialization vector length is always 16 for AES encryption
		let cipher = crypto.createCipheriv('aes256', process.env.ENCRYPTION_KEY, iv);
		let encrypted = cipher.update(str);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		let finalEncrypted = iv.toString('hex') + ':' + encrypted.toString('hex');

		return finalEncrypted;
	},

	decrypt: function(encryptedString) {
		let textParts = encryptedString.split(':');
		let iv = new Buffer(textParts.shift(), 'hex');
		let encryptedText = new Buffer(textParts.join(':'), 'hex');
		let decipher = crypto.createDecipheriv('aes256', new Buffer(process.env.ENCRYPTION_KEY), iv);
		let decrypted = decipher.update(encryptedText);

		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	},
};