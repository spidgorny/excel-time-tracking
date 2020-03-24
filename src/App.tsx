import React from 'react';
import './App.css';
import {DayTable} from "./components/DayTable";
import {Router} from "react-router-dom";
import {createBrowserHistory} from 'history';
import {GlobalContext} from "./state/GlobalContext";
import {AppState} from "./state/AppState";
import {Header} from "./components/Header";
import moment from "moment";
import {DayTimeline} from "./components/DayTimeline";
import {WeekTotal} from "./components/WeekTotal";
import {MonthTotal} from "./components/MonthTotal";

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
				<Header date={moment(this.context.date)}/>
				<main role="main" className="container-fluid">
					<div className="h-100">
						<DayTimeline date={this.context.date}/>
						<DayTable date={this.context.date}/>
						<div className="d-flex justify-content-between">
							<WeekTotal date={this.context.date}/>
							<MonthTotal date={this.context.date}/>
						</div>
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


}

export default App;
