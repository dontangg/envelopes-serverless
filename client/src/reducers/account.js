const initialState = {
	email: 'NEWmyemail@gmail.com',
	bank: 'zions_bank',
	bankUsername: 'MyUsername',
	bankPassword: '',
	bankAccountId: 'MyAccountId',
	bankSecretQuestions: [
		{ question: 'What is your hair color?', answer: 'Fulvous' },
	],
	password: '',
	passwordConfirm: '',
	passwordIsValid: true,
};

const account = (state = initialState, action) => {

	let newState = {};

	switch(action.type) {
		case 'CHANGE_ACCOUNT_FIELD':
			newState[action.fieldName] = action.text;
			return { ...state, ...newState };
		case 'CHANGE_ACCOUNT_QUESTION':
			newState.bankSecretQuestions = [];
			for (let i = 0; i < state.bankSecretQuestions.length; i++) {
				let thisQuestion = state.bankSecretQuestions[i];
				if (i === action.index) {
					thisQuestion = {...thisQuestion};
					thisQuestion[action.fieldName] = action.text;
				}

				newState.bankSecretQuestions.push(thisQuestion);
			}
			return { ...state, ...newState };
		case 'ADD_ACCOUNT_QUESTION':
			newState.bankSecretQuestions = [...state.bankSecretQuestions];
			newState.bankSecretQuestions.push({ question:'', answer:'' });
			return { ...state, ...newState };
		case 'REMOVE_ACCOUNT_QUESTION':
			newState.bankSecretQuestions = [...state.bankSecretQuestions];
			newState.bankSecretQuestions.splice(action.index, 1);
			return { ...state, ...newState };
		case 'SAVE_ACCOUNT_FIELD':
			let passwordIsValid = true;

			if (state.password !== state.passwordConfirm) {
				passwordIsValid = false;
			}

			// DO THE SAVE

			return { ...state, passwordIsValid };
		default:
			return state;
	}
};

export default account;