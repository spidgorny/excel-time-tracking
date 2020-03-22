import React from 'react';
import './App.css';
import {DayTable} from "./components/DayTable";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {GlobalContext} from "./state/GlobalContext";
import {AppState} from "./state/AppState";

export const history = createBrowserHistory();

export class App extends React.Component<any, any> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	componentDidMount(): void {
		this.context.subscribe(this.forceUpdate.bind(this));
	}

	render() {
		return (
			<Router history={history}>
				<header className="mb-3">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<h3 className="navbar-brand">
							<a href=".">excel-time-tracking</a>
						</h3>
						<button className="navbar-toggler" type="button" data-toggle="collapse"
								data-target="#navbarNav"
								aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"/>
						</button>
						<div className="collapse navbar-collapse justify-content-between" id="navbarNav">
							<div/>
							<div className="navbar-nav">
								<Link className="nav-link active" to=".">Home</Link>
								<a className="nav-link" href="/logout" onClick={this.logout.bind(this)}>Logout</a>
							</div>
						</div>
					</nav>
				</header>
				<main role="main" className="container-fluid">
					<div className="h-100">
						<Switch>
							<Route path="/" exact component={DayTable}/>
						</Switch>
					</div>
				</main>
				<footer className="container-fluid">
					<div className="inner">
						&copy; 2020 <a href="https://github.com/spidgorny/">Slawa</a>
					</div>
				</footer>
			</Router>
		);
	}

	logout(e: React.MouseEvent) {

	}

}

export default App;
