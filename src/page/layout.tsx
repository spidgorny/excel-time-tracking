import { DateState, SetDate } from '../state/DateState';
import { Entries } from '../state/entries';
import { DayProvider } from '../state/DayProvider';
import { Header } from '../components/Header';
import moment from 'moment';
import RouterSwitch from '../router-switch';
import KeyNav from '../components/key-nav';
import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { DayTimeline } from '../components/DayTimeline';

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
					<DayTimeline date={props.date} setDate={props.setDate} />
					<RouterSwitch
						date={props.date}
						setDate={props.setDate}
						dayData={props.dayData}
						dayProvider={props.dayProvider}
					/>
				</div>
			</main>
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
							<div>
								<kbd>Ins</kbd>: new line
							</div>
							<div>
								<kbd>Ctrl-Enter</kbd>:save
							</div>
							<div>
								<kbd>Ctrl-Backspace</kbd>: remove
							</div>
						</Col>
						<Col>
							<div>
								<kbd>Ctrl-C</kbd>, <kbd>Ctrl-V</kbd>: clipboard
							</div>
							<div>
								<kbd>Ctrl-S</kbd>: Download backup (json)
							</div>
						</Col>
					</Row>
				</div>
			</footer>
		</>
	);
}
