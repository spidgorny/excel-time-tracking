import React from "react";
import Table from "react-bootstrap/Table";
import {FaPlay, FaPlus} from "react-icons/fa";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import {TimeEntry} from "../model/TimeEntry";
import {TimeEntryRow} from "./TimeEntryRow";
import moment from "moment";
import {TimeEntryEdit} from "./TimeEntryEdit";

const currencies = require('country-currency');

interface IDayTableState {
	entries: TimeEntry[];
	// oneMore?: TimeEntry;
}

export class DayTable extends React.Component<{
	date: Date;
}, IDayTableState> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	state = {
		entries: [],
		// oneMore: undefined,
	};

	get sumTime() {
		const dayState = this.context.getDay(this.props.date);
		return dayState.sumTime.asHours().toFixed(2);
	}

	get sumMoney() {
		const dayState = this.context.getDay(this.props.date);
		const byCountry = currencies.byCountry();
		let countryCode = navigator.language.substr(3);
		const currency = byCountry.get(countryCode);
		// console.log(countryCode, currency);
		const rate = this.context.rate;

		const hours = dayState.sumTime.asHours();
		const amount = hours * rate;
		return new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency,
			currencyDisplay: 'symbol',
		}).format(amount);
	}

	componentDidMount(): void {
		this.fetch();
	}

	fetch() {
		const entries = this.context.getDay(this.props.date).entries;
		// console.log('componentDidMount', entries);
		this.setState({
			entries,
		}, () => {
			if (this.state.entries.length === 0) {
				// this.addRow(null);
			}
		});
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.date !== this.props.date) {
			this.fetch();
		}
	}

	render() {
		console.log('DayTable.render', this.props.date);
		return (
			<Table>
				<thead className="thead-light">
				<tr>
					<th>Start Time</th>
					<th>End Time</th>
					<th className="text-right">Duration</th>
					<th className="text-right">Earnings</th>
				</tr>
				</thead>
				{this.state.entries.map((te: TimeEntry, index: number) =>
					te.end ?
						<TimeEntryRow date={this.props.date}
													timeEntry={te} key={index}
													onChange={e => this.onChange(e, index)}/>
						:
						<TimeEntryEdit date={this.props.date}
													 timeEntry={te} key={index}
													 onChange={e => this.onChange(e, index)}/>
				)}
				{!this.state.entries.length ?
					<tbody>
					<tr>
						<td colSpan={4}>
							<a href="/start" className="btn btn-primary"
								 onClick={this.startWorking.bind(this)}>
								<FaPlay/>
							</a>
						</td>
					</tr>
					</tbody>
					: null}
				<tfoot className="tfoot-light" style={{
					color: '#495057',
					backgroundColor: '#e9ecef',
					borderColor: '#dee2e6',
				}}>
				<tr>
					<td colSpan={2}>
						<a href="/addRow" onClick={this.addRow.bind(this)}>
							<FaPlus/>
						</a>
					</td>
					<td className="text-right">
						{this.sumTime} h
					</td>
					<td className="text-right">
						{this.sumMoney}
					</td>
				</tr>
				</tfoot>
			</Table>
		);
	}

	startWorking(e: React.MouseEvent) {
		this.addRow(e);
	}

	onChange(e: React.ChangeEvent, index: number) {
		e.preventDefault();
		// console.log(e.target);
		const input = e.target as HTMLInputElement;
		if (input === null) {
			return;
		}
		// @ts-ignore
		const eElements = input.closest('.timeEntryRow').querySelectorAll('input, textarea');
		const aElements = Array.from(eElements) as HTMLInputElement[];
		const valueSet = aElements.map((el: HTMLInputElement | HTMLTextAreaElement) => {
			// console.log(el);
			if (el.name) {
				return {[el.name]: el.value};
			}
			return {};
		});
		const values = valueSet.reduce((acc, pair) => {
			return Object.assign(acc, pair);
		}, {});
		// console.log(index, values);
		const entries: TimeEntry[] = this.state.entries;
		entries[index] = new TimeEntry(values);
		this.setState({
			entries,
		});
		this.context.getDay(this.props.date)
			.updateEntries(this.state.entries);
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
		entries.push(new TimeEntry({
			start: moment().format('HH:mm'),
		}));	// add current entry to the list
		this.setState({
			entries,
		}, () => {
			this.context.getDay(this.props.date).updateEntries(entries);
		});
	}

}