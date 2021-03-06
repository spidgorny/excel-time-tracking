import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { DayProvider } from '../state/DayProvider';
import { TimeEntry } from '../model/TimeEntry';
import { TimeEntryRow } from './TimeEntryRow';
import moment from 'moment';
import { TimeEntryEdit } from './TimeEntryEdit';
import { Earnings } from '../components/Earnings';
import { Col, Container, Row } from 'react-bootstrap';
import { Entries } from '../state/entries';
import { inputElementsToMap } from '../functions';

interface Props {
	date: Date;
	day: Entries;
	appState: DayProvider; // for subscribe/unsubscribe
}

interface IDayTableState {
	entries: TimeEntry[];
	editable: boolean[];
}

export class DayTable extends React.Component<Props, IDayTableState> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	state = {
		entries: [],
		editable: [],
	};

	constructor(props: Props) {
		super(props);
		this.keydownHandler = this.keydownHandler.bind(this);
	}

	componentDidMount(): void {
		this.fetch();
		document.addEventListener('keydown', this.keydownHandler);
	}

	componentWillUnmount(): void {
		document.removeEventListener('keydown', this.keydownHandler);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.date !== this.props.date) {
			this.fetch();
		}
	}

	fetch() {
		// const dayState = this.context.getDay(this.props.date);
		const dayState = this.props.day;
		const entries = dayState.state.entries;
		// console.log('componentDidMount', entries);
		this.setState(
			{
				entries,
			},
			() => {
				if (this.state.entries.length === 0) {
					// this.addRow(null);
				}
			},
		);
	}

	keydownHandler(e: KeyboardEvent) {
		// console.log(e.key, e.ctrlKey, e.metaKey);
		if (e.key === 'Insert') {
			// @ts-ignore
			this.addRow((e as unknown) as Event);
		}
		if (e.key === 'Escape') {
			// console.log(e.key);
			this.setState({
				editable: [],
			});
		}
	}

	render() {
		// console.log('DayTable.render', this.props.date);
		return (
			<Container fluid={true} id="timeTable" className="py-3">
				<Row
					className="border-top"
					style={{
						color: '#495057',
						backgroundColor: '#e9ecef',
						borderColor: '#dee2e6',
					}}
				>
					<Col>Start Time</Col>
					<Col className="text-right">End Time</Col>
					<Col className="text-right">Duration</Col>
					<Col className="text-right">Earnings</Col>
					<Col>Comment</Col>
				</Row>
				{this.state.entries.map((te: TimeEntry, index: number) =>
					te.end && !this.state.editable[index] ? (
						<TimeEntryRow
							date={this.props.date}
							timeEntry={te}
							key={index}
							day={this.props.day}
							onChange={(form) => this.onChange(form, index)}
							makeEditable={(yesNo) =>
								this.makeEditable(index, yesNo)
							}
							remove={() => {}}
						/>
					) : (
						<TimeEntryEdit
							date={this.props.date}
							timeEntry={te}
							key={index}
							day={this.props.day}
							onChange={(form) => this.onChange(form, index)}
							makeEditable={(yesNo) =>
								this.makeEditable(index, yesNo)
							}
							remove={this.remove.bind(this, index, te)}
						/>
					),
				)}
				<Row
					className="tfoot-light"
					style={{
						color: '#495057',
						backgroundColor: '#e9ecef',
						borderColor: '#dee2e6',
					}}
				>
					<Col>
						<a href="/addRow" onClick={this.addRow.bind(this)}>
							<FaPlus />
						</a>
					</Col>
					{/*<Col>*/}
					{/*{moment(this.props.date).isSame(moment(), "day") ? (*/}
					{/*  <a href="/addPlay" onClick={this.addPlay.bind(this)}>*/}
					{/*    <FaPlay />*/}
					{/*  </a>*/}
					{/*) : null}*/}
					{/*</Col>*/}
					<Col className="text-right">
						&Sigma; {this.props.day.sumTimeString}
					</Col>
					<Col className="text-right">
						{this.props.day.sumHoursString} h
					</Col>
					<Col className="text-right">
						<Earnings hours={this.props.day.sumHours} rate={50} />
					</Col>
					<Col />
				</Row>
			</Container>
		);
	}

	onChange(form: HTMLFormElement, index: number) {
		console.log('onChange', index, form);
		if (form === null) {
			return;
		}
		// @ts-ignore
		const eElements = form.querySelectorAll(
			'input, textarea',
		) as NodeListOf<HTMLInputElement>;
		const values = inputElementsToMap(eElements);
		// console.log(index, values);
		const entries: TimeEntry[] = this.state.entries;
		entries[index] = new TimeEntry(values);
		this.setState({
			entries,
		});
		// const dayState = this.context.getDay(this.props.date);
		const dayState = this.props.day;
		dayState.updateEntries(this.state.entries);
	}

	addRow(e: React.MouseEvent | null) {
		if (e) {
			e.preventDefault();
		}
		const entries: TimeEntry[] = this.state.entries;

		if (entries.length > 0) {
			const lastEntry = entries[entries.length - 1];
			lastEntry.finish();
		}
		entries.push(
			new TimeEntry({
				start: moment().subtract(1, 'hour').format('HH:mm'),
				end: moment().format('HH:mm'),
			}),
		); // add current entry to the list

		const index = entries.length - 1;
		const editable = this.state.editable;
		// @ts-ignore
		editable[index] = true;

		this.setState(
			{
				entries,
				editable,
			},
			() => {
				// const dayState = this.context.getDay(this.props.date);
				const dayState = this.props.day;
				dayState.updateEntries(entries);
			},
		);
	}

	addPlay(e: React.MouseEvent | null) {
		if (e) {
			e.preventDefault();
		}
		const entries: TimeEntry[] = this.state.entries;

		if (entries.length > 0) {
			const lastEntry = entries[entries.length - 1];
			lastEntry.finish();
		}
		entries.push(
			new TimeEntry({
				start: moment().format('HH:mm'),
			}),
		); // add current entry to the list
		this.setState(
			{
				entries,
			},
			() => {
				// this.context.getDay(this.props.date).updateEntries(entries);
				// const dayState = this.context.getDay(this.props.date);
				const dayState = this.props.day;
				dayState.updateEntries(entries);
			},
		);
	}

	makeEditable(index: number, yesNo: boolean) {
		const editable = this.state.editable;
		// @ts-ignore
		editable[index] = yesNo;
		this.setState({
			editable,
		});
	}

	remove(index: number, te: TimeEntry) {
		// this.context.getCurrentEntries().remove(index);
		// const dayState = this.context.getDay(this.props.date);
		console.log('removing', index);
		const dayState = this.props.day;
		dayState.remove(index);
	}
}
