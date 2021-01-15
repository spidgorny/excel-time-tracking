import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppState } from './state/AppState';
import { Header } from './components/Header';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import KeyNav from './components/key-nav';
import { DateState, SetDate } from './state/DateState';
import { DayPicker } from './components/DayPicker';

export const history = createBrowserHistory();
const appState = new AppState();
export var DateContext = React.createContext(new Date());

export class App extends React.Component<any, any> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	state: {
		appState: AppState;
		hash: string;
	} = {
		appState,
		hash: appState.hash(),
	};

	componentDidMount(): void {
		// this.context.subscribe(this.forceUpdate.bind(this));
		this.state.appState.subscribe(() => {
			const hash = appState.hash();
			// console.log(hash);
			this.setState({
				hash,
			});
		});
	}

	render() {
		return (
			<DateState>
				{(date: Date, setDate: SetDate, dateState: DateState) => (
					<Router history={history}>
						<Header
							date={moment(date)}
							day={appState.getDay(date)}
							setDate={setDate}
						/>
						<main role="main" className="container-fluid">
							<div className="h-100">
								<DayPicker date={date} setDate={setDate} />
								{/*<RouterSwitch/>*/}
							</div>
						</main>
						{/*<KeyHandler appState={this.state.appState} />*/}
						<KeyNav
							incDate={dateState.incDate.bind(dateState)}
							decDate={dateState.decDate.bind(dateState)}
						/>
						<footer className="container-fluid mt-3 pt-2 border-top">
							<div className="inner">
								<div>
									&copy; 2021{' '}
									<a href="https://github.com/spidgorny/">
										Slawa
									</a>
								</div>
								<Row>
									<Col>
										<kbd>Ins</kbd>: new line,{' '}
										<kbd>Ctrl-Enter</kbd>: save,{' '}
										<kbd>Ctrl-Backspace</kbd>: remove
									</Col>
									<Col>
										<kbd>Ctrl-C</kbd>, <kbd>Ctrl-V</kbd>:
										clipboard
									</Col>
								</Row>
							</div>
						</footer>
					</Router>
				)}
			</DateState>
		);
	}
}

export default App;
