import React, { Component } from "react";

class AccountPage extends Component {
	state = {
		email: 'myemail@gmail.com',
		bank: 'zions_bank',
		bankUsername: 'MyUsername',
		bankAccountId: 'MyAccountId',
		bankSecretQuestions: [
			{ question: 'What is your hair color?', answer: 'Fulvous' },
		],
		password: '',
		passwordConfirm: '',
		passwordIsValid: true,
	};

	onChangeBank = (e) => {
		this.setState({
			bank: e.target.value
		});
	};

	onChangeTextField = (fieldName) => {
		return (e) => {
			this.state[fieldName] = e.target.value;
			this.setState(this.state);
		};
	};

	onAddSecretQuestion = (e) => {
		e.preventDefault();
		this.state.bankSecretQuestions.push({ question: '', answer: '' });
		this.setState({
			bankSecretQuestions: this.state.bankSecretQuestions
		});
	};

	onRemoveQuestion = (index) => {
		return (e) => {
			e.preventDefault();
			this.state.bankSecretQuestions.splice(index, 1);
			this.setState({
				bankSecretQuestions: this.state.bankSecretQuestions
			});
		};
	};

	onChangeQuestion = (index, fieldName) => {
		return (e) => {
			this.state.bankSecretQuestions[index][fieldName] = e.target.value;
			this.setState({
				bankSecretQuestions: this.state.bankSecretQuestions
			});
		};
	};

	save = (e) => {
		e.preventDefault();

		const { password, passwordConfirm } = this.state;
		let allowSave = true;
		let passwordIsValid = true;

		if (password !== passwordConfirm) {
			allowSave = false;
			passwordIsValid = false;
		}

		this.setState({
			passwordIsValid
		});

		if (allowSave) {
			// Save the stuff
		}

	}

	render() {
		let account = this.state;

		return (
			<main className="container-fluid">

				<h1 className="display-4 py-md-3">Account</h1>

				<form>
					<div className="form-group row">
						<label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-3">
							<input onChange={this.onChangeTextField('email')} type="email" className="form-control" id="inputEmail" placeholder="email" value={account.email} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
						<div className="col-sm-3">
							<input onChange={this.onChangeTextField('password')} value={account.password} type="password" className={`form-control ${account.passwordIsValid ? '' : 'is-invalid'}`} id="inputPassword" placeholder="password" />
							<small className="form-text text-muted">
								Passwords left blank will not be modified.
							</small>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirm password</label>
						<div className="col-sm-3">
							<input onChange={this.onChangeTextField('passwordConfirm')} value={account.passwordConfirm} type="password" className={`form-control ${account.passwordIsValid ? '' : 'is-invalid'}`} id="inputConfirmPassword" placeholder="password" />
							<div className="invalid-feedback">
								Passwords don't match
							</div>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="selectBank" className="col-sm-2 col-form-label">Bank</label>
						<div className="col-sm-3">
							<select onChange={this.onChangeBank} className="form-control" id="selectBank" value={account.bank}>
								<option>choose&hellip;</option>
								<option value="zions_bank">Zions Bank</option>
								<option value="uccu">UCCU</option>
							</select>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputBankAccountId" className="col-sm-2 col-form-label">Bank account ID</label>
						<div className="col-sm-3">
							<input onChange={this.onChangeTextField('bankAccountId')} type="text" className="form-control" id="inputBankAccountId" placeholder="bank account id" value={account.bankAccountId} />
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Bank secret questions</label>

						<div className="col-sm-10">
							{account.bankSecretQuestions.map((qa, index) => {
								return (
									<div key={index} className="row mb-3">
										<div className="col-sm-4">
											<input onChange={this.onChangeQuestion(index, 'question')} type="text" name={`question[${index}]`} value={qa.question} placeholder="Question" className="form-control" />
										</div>
										<div className="col-sm-3">
											<input onChange={this.onChangeQuestion(index, 'answer')} type="text" name={`answer[${index}]`} value={qa.answer} placeholder="Answer" className="form-control" />
										</div>
										<button onClick={this.onRemoveQuestion(index)} className="btn btn-link" title="Remove this question and its answer"><span className="fas fa-trash"></span></button>
									</div>
								);
							})}

							<button onClick={this.onAddSecretQuestion} type="button" className="btn btn-secondary"><span className="fas fa-plus"></span> New Question</button>
						</div>


					</div>
					<button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
				</form>
			</main>
		);
	}
}

export default AccountPage;