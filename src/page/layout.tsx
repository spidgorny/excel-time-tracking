import { DateState, SetDate } from '../state/DateState';
import { Entries } from '../state/entries';
import { DayProvider } from '../state/DayProvider';
import { Header } from '../components/Header';
import moment from 'moment';
import RouterSwitch from '../router-switch';
import ClipboardHandler from '../table/clipboard-handler';
import KeyNav from '../components/key-nav';
import { Col, Row } from 'react-bootstrap';
import React from 'react';

export default function Layout(props: {
	date: Date;
	setDate: SetDate;
	dayData: Entries;
	dayProvider: DayProvider;
	dateState: DateState;
}) {
	return (
		<>
			<Header
				date={moment(props.date)}
				day={props.dayData}
				setDate={props.setDate}
			/>
			<main role="main" className="container-fluid">
				<div className="h-100">
					<RouterSwitch
						date={props.date}
						setDate={props.setDate}
						dayData={props.dayData}
						dayProvider={props.dayProvider}
					/>
				</div>
			</main>
			<ClipboardHandler day={props.dayData} />
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
