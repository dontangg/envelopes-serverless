import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAccount, changeAccountField, addAccountQuestion, changeAccountQuestion, removeAccountQuestion, saveAccount } from '../actions';
import Loader from "../components/Loader";

class AccountPage extends Component {

	componentDidMount() {
		this.props.onDidMount();
	}

	onChangeTextField = (fieldName) => {
		return (e) => {
			this.props.onFieldChange(fieldName, e.target.value);
		};
	};

	onRemoveQuestion = (index) => {
		return (e) => {
			e.preventDefault();
			this.props.onRemoveQuestion(index);
		};
	};

	save = (e) => {
		e.preventDefault();
		this.props.onSaveAccount();
	}

	render() {
		return (
			<main className="container-fluid">
				<h1 className="display-4 py-md-3">Account</h1>

				{ this.props.error && (
					<div className="alert alert-danger" role="alert">
						{this.props.error}
					</div>
				) }

				{ this.props.isFetching && (<Loader />) }

				{ this.props.email && this.accountForm() }

			</main>
		);
	}

	accountForm() {
		return (
			<form>
				<div className="form-group row">
					<label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
					<div className="col-sm-3">
						<input onChange={(e) => { this.props.onFieldChange('email', e.target.value); }} type="email" className="form-control" id="inputEmail" placeholder="email" value={this.props.email} />
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
					<div className="col-sm-3">
						<input onChange={(e) => { this.props.onFieldChange('password', e.target.value); }} value={this.props.password} type="password" className={`form-control ${this.props.passwordIsValid ? '' : 'is-invalid'}`} id="inputPassword" placeholder="password" />
						<small className="form-text text-muted">
							Passwords left blank will not be modified.
						</small>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirm password</label>
					<div className="col-sm-3">
						<input onChange={(e) => { this.props.onFieldChange('passwordConfirm', e.target.value); }} value={this.props.passwordConfirm} type="password" className={`form-control ${this.props.passwordIsValid ? '' : 'is-invalid'}`} id="inputConfirmPassword" placeholder="password" />
						<div className="invalid-feedback">
							Passwords don't match
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="selectBank" className="col-sm-2 col-form-label">Bank</label>
					<div className="col-sm-3">
						<select onChange={(e) => { this.props.onFieldChange('bankId', e.target.value); }} className="form-control" id="selectBank" value={this.props.bankId}>
							<option>choose&hellip;</option>
							<option value="zions_bank">Zions Bank</option>
							<option value="uccu">UCCU</option>
						</select>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="inputBankUsername" className="col-sm-2 col-form-label">Bank username</label>
					<div className="col-sm-3">
						<input onChange={(e) => { this.props.onFieldChange('bankUsername', e.target.value); }} type="text" className="form-control" id="inputBankUsername" placeholder="bank username" value={this.props.bankUsername} />
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="inputBankPassword" className="col-sm-2 col-form-label">Bank password</label>
					<div className="col-sm-3">
						<input onChange={this.onChangeTextField('bankPassword')} type="password" className="form-control" id="inputBankPassword" placeholder="password" value={this.props.bankPassword} />
						<small className="form-text text-muted">
							Passwords left blank will not be modified.
						</small>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="inputBankAccountId" className="col-sm-2 col-form-label">Bank account ID</label>
					<div className="col-sm-3">
						<input onChange={(e) => { this.props.onFieldChange('bankAccountId', e.target.value); }} type="text" className="form-control" id="inputBankAccountId" placeholder="bank account id" value={this.props.bankAccountId} />
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label">Bank secret questions</label>

					<div className="col-sm-10">
						{this.props.bankSecretQuestions.map((qa, index) => {
							return (
								<div key={index} className="row mb-3">
									<div className="col-sm-4">
										<input onChange={(e) => this.props.onChangeQuestion(index, 'question', e.target.value)} type="text" name={`question[${index}]`} value={qa.question} placeholder="Question" className="form-control" />
									</div>
									<div className="col-sm-3">
										<input onChange={(e) => this.props.onChangeQuestion(index, 'answer', e.target.value)} type="text" name={`answer[${index}]`} value={qa.answer} placeholder="Answer" className="form-control" />
									</div>
									<button onClick={this.onRemoveQuestion(index)} className="btn btn-link" title="Remove this question and its answer"><span className="fas fa-trash"></span></button>
								</div>
							);
						})}

						<button onClick={() => this.props.onAddQuestion()} type="button" className="btn btn-secondary"><span className="fas fa-plus"></span> New Question</button>
					</div>


				</div>
				{this.props.isSaving ? (
					<button type="submit" className="btn btn-primary" disabled><i className="fas fa-sync-alt fas-sync-animate"></i> Saving...</button>
				) : (
					<button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
				)}

			</form>
		);
	}
}

/*
AccountPage.propTypes = {
	account: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onTodoClick: PropTypes.func.isRequired
};
*/

export default connect(
	state => state.account,
	dispatch => ({
		onDidMount: () => { dispatch(fetchAccount()) },
		onFieldChange: (fieldName, value) => { dispatch(changeAccountField(fieldName, value)) },
		onAddQuestion: () => { dispatch(addAccountQuestion()) },
		onRemoveQuestion: (index) => { dispatch(removeAccountQuestion(index)) },
		onChangeQuestion: (index, fieldName, value) => { dispatch(changeAccountQuestion(index, fieldName, value)) },
		onSaveAccount: () => { dispatch(saveAccount()) },
	})
)(AccountPage);