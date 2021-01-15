import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { DayProvider } from './state/DayProvider';
import { Header } from './components/Header';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import KeyNav from './components/key-nav';
import { DateState, SetDate } from './state/DateState';
import { DayPicker } from './components/DayPicker';
import ClipboardHandler from './components/clipboard-handler';
import { DaysState } from './state/DaysState';
import RouterSwitch from './router-switch';

export const history = createBrowserHistory();
export var DateContext = React.createContext(new Date());

function Layout(props: {
	date: Date;
	day: DaysState;
	setDate: SetDate;
	dayProvider: DayProvider;
	dateState: DateState;
}) {
	return (
		<>
			<Header
				date={moment(props.date)}
				day={props.day}
				setDate={props.setDate}
			/>
			<main role="main" className="container-fluid">
				<div className="h-100">
					<DayPicker date={props.date} setDate={props.setDate} />
					<RouterSwitch
						date={props.date}
						setDate={props.setDate}
						day={props.day}
						dayProvider={props.dayProvider}
					/>
				</div>
			</main>
			<ClipboardHandler day={props.day} />
			<KeyNav
				incDate={props.dateState.incDate.bind(props.dateState)}
				decDate={props.dateState.decDate.bind(props.dateState)}
			/>
			<footer className="container-fluid mt-3 pt-2 border-top">
				<div className="inner">
					<div>
						&copy; 2021{' '}
						<a href="https://github.com/spidgorny/">Slawa</a>
					</div>
					<Row>
						<Col>
							<kbd>Ins</kbd>: new line, <kbd>Ctrl-Enter</kbd>:
							save, <kbd>Ctrl-Backspace</kbd>: remove
						</Col>
						<Col>
							<kbd>Ctrl-C</kbd>, <kbd>Ctrl-V</kbd>: clipboard
						</Col>
					</Row>
				</div>
			</footer>
		</>
	);
}

export class App extends React.Component<any, any> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	state: {} = {};

	render() {
		return (
			<DateState>
				{(date: Date, setDate: SetDate, dateState: DateState) => (
					<DayProvider date={date}>
						{(day: DaysState, dayProvider: DayProvider) => (
							<Router history={history}>
								<Layout
									date={date}
									day={day}
									setDate={setDate}
									dayProvider={dayProvider}
									dateState={dateState}
								/>
							</Router>
						)}
					</DayProvider>
				)}
			</DateState>
		);
	}
}

export default App;
