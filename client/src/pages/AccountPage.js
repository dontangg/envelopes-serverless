import React, { Component } from "react";

class AccountPage extends Component {
	state = {
		email: 'myemail@gmail.com',
		bank: 'zions_bank',
		bankUsername: 'MyUsername',
		bankAccountId: 'MyAccountId',
		bankSecretQuestions: [
			{ question: 'What is your hair color?', answer: 'Fulvous' }
		]
	};

	changeBank = (e) => {
		this.setState({
			bank: e.target.value
		});
	};

	changeTextField = (fieldName) => {
		return (e) => {
			this.state[fieldName] = e.target.value;
			this.setState(this.state);
		};
	};

	addSecretQuestion = (e) => {
		e.preventDefault();
		this.state.bankSecretQuestions.push({ question: '', answer: '' });
		this.setState({
			bankSecretQuestions: this.state.bankSecretQuestions
		});
	};

	removeQuestion = (index) => {
		return (e) => {
			e.preventDefault();
			this.state.bankSecretQuestions.splice(index, 1);
			this.setState({
				bankSecretQuestions: this.state.bankSecretQuestions
			});
		};
	};

	changeQuestion = (index, fieldName) => {
		return (e) => {
			this.state.bankSecretQuestions[index][fieldName] = e.target.value;
			this.setState({
				bankSecretQuestions: this.state.bankSecretQuestions
			});
		};
	};

	save() {

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
							<input onChange={this.changeTextField('email')} type="email" className="form-control" id="inputEmail" placeholder="email" value={account.email} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
						<div className="col-sm-3">
							<input type="password" className="form-control" id="inputPassword" placeholder="password" />
							<small className="form-text text-muted">
								Passwords left blank will not be modified.
							</small>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirm password</label>
						<div className="col-sm-3">
							<input type="password" className="form-control" id="inputConfirmPassword" placeholder="password" />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="selectBank" className="col-sm-2 col-form-label">Bank</label>
						<div className="col-sm-3">
							<select onChange={this.changeBank} className="form-control" id="selectBank" value={account.bank}>
								<option>choose&hellip;</option>
								<option value="zions_bank">Zions Bank</option>
								<option value="uccu">UCCU</option>
							</select>
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputBankAccountId" className="col-sm-2 col-form-label">Bank account ID</label>
						<div className="col-sm-3">
							<input onChange={this.changeTextField('bankAccountId')} type="text" className="form-control" id="inputBankAccountId" placeholder="bank account id" value={account.bankAccountId} />
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Bank secret questions</label>

						<div className="col-sm-10">
							{account.bankSecretQuestions.map((qa, index) => {
								return (
									<div key={index} className="row mb-3">
										<div className="col-sm-4">
											<input onChange={this.changeQuestion(index, 'question')} type="text" name={`question[${index}]`} value={qa.question} placeholder="Question" className="form-control" />
										</div>
										<div className="col-sm-3">
											<input onChange={this.changeQuestion(index, 'answer')} type="text" name={`answer[${index}]`} value={qa.answer} placeholder="Answer" className="form-control" />
										</div>
										<button onClick={this.removeQuestion(index)} className="destroy btn btn-link" title="Remove this question and its answer"><span className="glyphicon glyphicon-trash"></span></button>
									</div>
								);
							})}

							<button onClick={this.addSecretQuestion} type="button" className="btn btn-secondary"><span className="glyphicon glyphicon-plus"></span> New Question</button>
						</div>


					</div>
					<button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
				</form>
			</main>
		);
	}
}

export default AccountPage;