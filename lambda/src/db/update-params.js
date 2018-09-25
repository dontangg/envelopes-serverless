'use strict';

class UpdateParams {
	constructor(tableName, key) {
		this.tableName = tableName;
		this.key = key;
		this.updateExpression = '';
		this.attributeNames = {};
		this.attributeValues = {};
	}

	addProperties(obj, attributes) {
		for (let i = 0; i < attributes.length; i++) {
			let propName = attributes[i];
			this.addProperty(propName, obj);
		}
	}

	addProperty(objPropName, obj) {
		if (obj[objPropName] === undefined)
			return;

		let exprPropName = '#' + objPropName;
		let exprValueName = ':new_' + objPropName;

		this.updateExpression += this.updateExpression === '' ? 'SET ' : ', ';
		this.updateExpression += exprPropName + ' = ' + exprValueName;
		this.attributeNames[exprPropName] = objPropName;
		this.attributeValues[exprValueName] = obj[objPropName];
	}

	isEmpty() {
		return this.updateExpression === '';
	}

	toJson() {
		return {
			TableName: this.tableName,
			Key: this.key,
			UpdateExpression: this.updateExpression,
			ExpressionAttributeNames: this.attributeNames,
			ExpressionAttributeValues: this.attributeValues,
		};
	}
}

module.exports = UpdateParams;