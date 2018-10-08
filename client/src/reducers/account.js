const initialState = {
	error: '',
	isFetching: false,
	isSaving: false,
	email: '',
	bankId: '',
	bankUsername: '',
	bankPassword: '',
	bankAccountId: '',
	bankSecretQuestions: [], // { question: '', answer: '' },
	password: '',
	passwordConfirm: '',
	passwordIsValid: true,
};

const account = (state = initialState, action) => {

	let updatedStateFields = {};

	// console.log(action);

	switch(action.type) {
		case 'REQUEST_ACCOUNT':
			return { ...state, isFetching: true };
		case 'REQUEST_ACCOUNT_FAILED':
			return { ...state, isFetching: false, error: action.message };
		case 'RECEIVE_ACCOUNT':
			return {
				...state,
				...action.account,
				error: '',
				isFetching: false,
				isSaving: false,
				bankPassword: '',
				password: '',
				passwordConfirm: '',
				passwordIsValid: true,
			};
		case 'CHANGE_ACCOUNT_FIELD':
			updatedStateFields[action.fieldName] = action.text;

			let newState = { ...state, ...updatedStateFields };
			newState.passwordIsValid = newState.password === newState.passwordConfirm;

			return newState;
		case 'CHANGE_ACCOUNT_QUESTION':
			updatedStateFields.bankSecretQuestions = [];
			for (let i = 0; i < state.bankSecretQuestions.length; i++) {
				let thisQuestion = state.bankSecretQuestions[i];
				if (i === action.index) {
					thisQuestion = {...thisQuestion};
					thisQuestion[action.fieldName] = action.text;
				}

				updatedStateFields.bankSecretQuestions.push(thisQuestion);
			}
			return { ...state, ...updatedStateFields };
		case 'ADD_ACCOUNT_QUESTION':
			updatedStateFields.bankSecretQuestions = [...state.bankSecretQuestions];
			updatedStateFields.bankSecretQuestions.push({ question:'', answer:'' });
			return { ...state, ...updatedStateFields };
		case 'REMOVE_ACCOUNT_QUESTION':
			updatedStateFields.bankSecretQuestions = [...state.bankSecretQuestions];
			updatedStateFields.bankSecretQuestions.splice(action.index, 1);
			return { ...state, ...updatedStateFields };
		case 'REQUEST_ACCOUNT_SAVE':
			return { ...state, isSaving: true };
		case 'REQUEST_ACCOUNT_SAVE_FAILED':
			return { ...state, isSaving: false, error: action.message };
		case 'RECEIVE_ACCOUNT_SAVE':
			return { ...state, isSaving: false };
		default:
			return state;
	}
};

export default account;