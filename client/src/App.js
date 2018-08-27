import React, { Component } from "react";
import Header from "./Header";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<main className="container-fluid">
					<h1> Dashboard </h1>
				</main>
			</React.Fragment>
		);
	}
}

export default App;