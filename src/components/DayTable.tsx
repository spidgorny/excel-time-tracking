import React from "react";
import Table from "react-bootstrap/Table";
import {FaStop, FaPlay, FaPlus} from "react-icons/fa";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import {TimeEntry} from "../model/TimeEntry";
import {TimeEntryRow} from "./TimeEntryRow";
import moment from "moment";
import {TimeEntryEdit} from "./TimeEntryEdit";

const currencies = require('country-currency');

interface IDayTableState {
	date: Date;
	entries: TimeEntry[];
	// oneMore?: TimeEntry;
}

export class DayTable extends React.Component<{}, IDayTableState> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	state = {
		date: new Date(),
		entries: [],
		// oneMore: undefined,
	};

	componentDidMount(): void {
		const entries = this.context.getDay(this.state.date).entries;
		// console.log('componentDidMount', entries);
		this.setState({
			entries,
		}, () => {
			if (this.state.entries.length === 0) {
				this.addRow(null);
			}
		});
	}

	get sumTime() {
		const dayState = this.context.getDay(this.state.date);
		return dayState.sumTime.asHours().toFixed(2);
	}

	get sumMoney() {
		const dayState = this.context.getDay(this.state.date);
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

	render() {
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
						<TimeEntryRow date={this.state.date}
													timeEntry={te} key={index}
													onChange={e => this.onChange(e, index)}/>
						:
						<TimeEntryEdit date={this.state.date}
													 timeEntry={te} key={index}
													 onChange={e => this.onChange(e, index)}/>
				)}
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
		this.context.getDay(this.state.date)
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
			this.context.getDay(this.state.date).updateEntries(entries);
		});
	}

}
