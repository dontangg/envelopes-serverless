
export const changeAccountField = (fieldName, text) => ({
	type: 'CHANGE_ACCOUNT_FIELD',
	fieldName,
	text,
});

export const addAccountQuestion = () => ({
	type: 'ADD_ACCOUNT_QUESTION'
});

export const removeAccountQuestion = (index) => ({
	type: 'REMOVE_ACCOUNT_QUESTION',
	index,
});

export const changeAccountQuestion = (index, fieldName, text) => ({
	type: 'CHANGE_ACCOUNT_QUESTION',
	index,
	fieldName,
	text,
});

export const saveAccount = () => ({
	type: 'SAVE_ACCOUNT_FIELD',
});
