// TODO: Show save success

const requestAccount = () => ({
	type: 'REQUEST_ACCOUNT',
});
const requestAccountFailed = (message) => ({
	type: 'REQUEST_ACCOUNT_FAILED',
	message,
});
const receiveAccount = (account) => ({
	type: 'RECEIVE_ACCOUNT',
	account,
});

export const fetchAccount = () => {
	return (dispatch, getState) => {
		if (getState().account.isFetching)
			return Promise.resolve();

		dispatch(requestAccount());
		return fetch('https://envelopesapi.thewilsonpad.com/user', { credentials: 'include' })
			.then(response => {
				if (!response.ok) {
					return dispatch(requestAccountFailed('Unable to retrieve account details'));
				}

				return response.json().then(json => dispatch(receiveAccount(json)));
			});
	};
};

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


const requestAccountSave = () => ({
	type: 'REQUEST_ACCOUNT_SAVE',
});
const requestAccountSaveFailed = (message) => ({
	type: 'REQUEST_ACCOUNT_SAVE_FAILED',
	message,
});
const receiveAccountSave = () => ({
	type: 'RECEIVE_ACCOUNT_SAVE'
});

export const saveAccount = () => {
	return (dispatch, getState) => {
		let state = getState().account;
		if (state.isSaving || !state.passwordIsValid)
			return Promise.resolve();

		let account = {
			email: state.email,
			bankId: state.bankId,
			bankUsername: state.bankUsername,
			bankPassword: state.bankPassword,
			bankAccountId: state.bankAccountId,
			bankSecretQuestions: state.bankSecretQuestions,
			password: state.password,
		};

		dispatch(requestAccountSave());
		return fetch('https://envelopesapi.thewilsonpad.com/user', { credentials: 'include', method: 'POST', body: JSON.stringify(account) })
			.then(response => {
				if (!response.ok) {
					return dispatch(requestAccountSaveFailed('Unable to save account details'));
				}

				return dispatch(receiveAccountSave());
			});
	};
};
