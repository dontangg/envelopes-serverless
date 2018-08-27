import React, { Component } from "react";

class Header extends Component {
	state = {
		visibleForResponsive: false
	};

	toggleVisibleForResponsive = () => {
		this.setState({ visibleForResponsive: !this.state.visibleForResponsive });
	}

	render() {
		/*
		TODO:
		  * Bind 'active' item to the current tab
		  * Make the links work with React Router to actually change the URL
		*/
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/">Envelopes</a>
				<button className="navbar-toggler" type="button" onClick={this.toggleVisibleForResponsive}>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={`collapse navbar-collapse ${this.state.visibleForResponsive ? 'show' : ''}`}>
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active"><a className="nav-link" href="/">Dashboard</a></li>
						<li className="nav-item"><a className="nav-link" href="/rules">Rules</a></li>
						<li className="nav-item"><a className="nav-link" href="/envelopes/fill">Fill Envelopes</a></li>
						<li className="nav-item"><a className="nav-link" href="/envelopes/manage">Manage Envelopes</a></li>
					</ul>

					<ul className="navbar-nav">
						<li className="nav-item"><a className="nav-link" href="/users/1/edit">robert.don.wilson@gmail.com</a></li>
						<li className="nav-item"><a className="nav-link" href="/sign_out">Log Out</a></li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;