'use strict';

const AWS = require('aws-sdk');
const UpdateParams = require('./update-params');

let dynamodb = new AWS.DynamoDB.DocumentClient();

let promisifyWithParams = function(funcName, params) {
	return new Promise((resolve, reject) => {
		dynamodb[funcName](params, (err, data) => {
			err ? reject(err) : resolve(data);
		});
	});
};

let generateId = function() {
	return Math.random().toString(36).substr(2) + Date.now().toString(36);
};


class User {
	constructor() {
		this.tableName = 'Envelopes-UserItems';
		this.attributes = [ 'email', 'passwordDigest', 'passwordSalt', 'bankId', 'bankUsername', 'bankPasswordCipher', 'bankSecretQuestions', 'bankAccountId', 'transactionsImportedAt', 'transactionsImportInProgress' ];
	}

	mapUserFromDb(user) {
		user.id = user.userId;
		delete user.userId;
		delete user.Type_Key;

		return user;
	}

	async get(userId) {
		let response = await promisifyWithParams('get', {
			TableName: this.tableName,
			Key: { 'userId': userId, 'Type_Key': 'User' },
		});

		if (!response || !response.Item) {
			return null;
		}

		return this.mapUserFromDb(response.Item);
	}

	async findByEmail(email) {
		let response = await promisifyWithParams('scan', {
			TableName: this.tableName,
			FilterExpression: "email = :email",
			ExpressionAttributeValues: { ":email": email },
		});

		if (!response || !response.Items || response.Count === 0 || response.Items.length === 0)
			return null;

		return this.mapUserFromDb(response.Items[0]);
	}

	async save(user) {
		if (!user.id) {
			user.id = generateId();
		}

		let params = new UpdateParams(this.tableName, { 'userId': user.id, 'Type_Key': 'User' });

		params.addProperties(user, this.attributes);

		if (params.isEmpty())
			return;

		return promisifyWithParams('update', params.toJson());
	}
}

module.exports = {
	User: new User(),
};