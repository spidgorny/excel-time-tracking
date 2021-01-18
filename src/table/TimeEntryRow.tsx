import React from 'react';
import { TimeEntry } from '../model/TimeEntry';
import moment from 'moment';
import { Earnings } from '../components/Earnings';
import { Col, Row } from 'react-bootstrap';
import { Entries } from '../state/entries';

export interface ITimeEntryRowProps {
	date: Date;
	day: Entries;
	timeEntry: TimeEntry;
	onChange: (e: HTMLFormElement) => void;
	makeEditable: (yesOrNo: boolean) => void;
	remove: () => void;
}

export class TimeEntryRow extends React.Component<ITimeEntryRowProps> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	get startValue() {
		if (this.props.timeEntry.start) {
			return this.props.timeEntry.start;
		}
		return moment().format('HH:mm');
	}

	get endValue() {
		if (this.props.timeEntry.end) {
			return this.props.timeEntry.end;
		}
		return '';
	}

	get duration() {
		const dur = this.props.timeEntry.duration;
		return (
			dur.hours().toString().padStart(2, '0') +
			':' +
			dur.minutes().toString().padStart(2, '0')
		);
	}

	get earnings() {
		const hours = this.props.timeEntry.duration.asHours();
		// TODO: rate
		return <Earnings hours={hours} rate={50} />;
	}

	render() {
		return (
			<>
				<Row>
					<Col onClick={() => this.props.makeEditable(true)}>
						{this.startValue}
					</Col>
					<Col
						className="text-right"
						onClick={() => this.props.makeEditable(true)}
					>
						{this.endValue}
					</Col>
					<Col className="text-right">{this.duration}</Col>
					<Col className="text-right">{this.earnings}</Col>
					<Col onClick={() => this.props.makeEditable(true)}>
						{this.props.timeEntry.comment}
					</Col>
				</Row>
			</>
		);
	}
}
