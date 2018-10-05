import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/AccountPage";
import FillPage from "./pages/FillPage";
import ManagePage from "./pages/ManagePage";
import RulesPage from "./pages/RulesPage";
import EnvelopePage from "./pages/EnvelopePage";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<Header />

					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/envelopes/fill" component={FillPage} />
						<Route exact path="/envelopes/manage" component={ManagePage} />
						<Route exact path="/rules" component={RulesPage} />
						<Route exact path="/account" component={AccountPage} />
						<Route exact path="/envelopes/:id" component={EnvelopePage} />
					</Switch>

					<Footer />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;