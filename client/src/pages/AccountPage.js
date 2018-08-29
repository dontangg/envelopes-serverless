import React, { Component } from "react";

class AccountPage extends Component {
	save() {

	}

	render() {
		return (
			<main className="container-fluid">

				<h1 className="display-4 py-md-3">Account</h1>

				<form>
					<div className="form-group row">
						<label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-3">
							<input type="email" className="form-control" id="inputEmail" placeholder="email" />
						</div>
					</div>
					<div className="form-group row">
						<label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
						<div className="col-sm-3">
							<input type="password" className="form-control" id="inputPassword" placeholder="password" />
							<small className="form-text text-muted">
								Passwords left blank will not be modified.
							</small>
						</div>
					</div>
					<div className="form-group row">
						<label for="inputConfirmPassword" className="col-sm-2 col-form-label">Confirm password</label>
						<div className="col-sm-3">
							<input type="password" className="form-control" id="inputConfirmPassword" placeholder="password" />
						</div>
					</div>
					<div className="form-group row">
						<label for="selectBank" className="col-sm-2 col-form-label">Bank</label>
						<div className="col-sm-3">
							<select class="form-control" id="selectBank">
								<option selected>choose&hellip;</option>
								<option value="1">Zions Bank</option>
								<option value="2">UCCU</option>
							</select>
						</div>
					</div>
					<div className="form-group row">
						<label for="inputBankAccountId" className="col-sm-2 col-form-label">Bank account ID</label>
						<div className="col-sm-3">
							<input type="text" className="form-control" id="inputBankAccountId" placeholder="bank account id" />
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Bank secret questions</label>

						<div className="col-sm-10">
							<div className="row mb-3">
								<div className="col-sm-4">
									<input type="text" name="question[0]" id="question_0" value="" placeholder="Question" className="form-control" />
								</div>
								<div className="col-sm-3">
									<input type="text" name="answer[0]" id="answer_0" value="" placeholder="Answer" className="form-control" />
								</div>
								<button className="destroy btn btn-link" title="Remove this question and its answer"><span className="glyphicon glyphicon-trash"></span></button>
							</div>

							<button type="button" className="btn btn-secondary"><span className="glyphicon glyphicon-plus"></span> New Question</button>
						</div>


					</div>
					<button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
				</form>
			</main>
		);
	}
}

export default AccountPage;