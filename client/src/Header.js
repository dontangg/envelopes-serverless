import React, { Component } from "react";
import { Link, Route } from 'react-router-dom';

class Header extends Component {
	state = {
		visibleForResponsive: false
	};

	toggleVisibleForResponsive = () => {
		this.setState({ visibleForResponsive: !this.state.visibleForResponsive });
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">Envelopes</Link>
				<button className="navbar-toggler" type="button" onClick={this.toggleVisibleForResponsive}>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={`collapse navbar-collapse ${this.state.visibleForResponsive ? 'show' : ''}`}>
					<ul className="navbar-nav mr-auto">
						<NavLink to="/" label="Dashboard" activeOnlyWhenExact />
						<NavLink to="/rules" label="Rules" />
						<NavLink to="/envelopes/fill" label="Fill Envelopes" />
						<NavLink to="/envelopes/manage" label="Manage Envelopes" />
					</ul>

					<ul className="navbar-nav">
						<NavLink to="/account" label="robert.don.wilson@gmail.com" />
						<li className="nav-item"><Link className="nav-link" to="/sign_out">Log Out</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
}

const NavLink = ({ label, to, activeOnlyWhenExact }) => (
	<Route
		path={to}
		exact={activeOnlyWhenExact}
		children={({ match }) => (
			<li className={`nav-item ${match ? "active" : ""}`}><Link className="nav-link" to={to}>{label}</Link></li>
		)}
	/>
);

export default Header;