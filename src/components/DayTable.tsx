import React from "react";
import Table from "react-bootstrap/Table";
import {FaStop, FaPlay, FaPlus} from "react-icons/fa";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import {TimeEntry} from "../model/TimeEntry";
import {TimeEntryRow} from "./TimeEntryRow";
import moment from "moment";

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
		this.setState({
			entries: this.context.getDay(this.state.date).entries,
		});
		if (this.state.entries.length === 0) {
			this.addRow(null);
		}
	}

	render() {
		console.log(this.state.entries.length);
		return (
			<Table>
				<thead>
				<tr>
					<th>Start Time</th>
					<th>End Time</th>
					<th className="text-right">Duration</th>
					<th className="text-right">Earnings</th>
				</tr>
				</thead>
				<tbody>
				{this.state.entries.map((te: TimeEntry, index: number) =>
					<TimeEntryRow date={this.state.date}
												timeEntry={te} key={index}
												onChange={e => this.onChange(e, index)}/>)}
				</tbody>
				<tfoot>
				<tr>
					<td>
						<a href="/addRow" onClick={this.addRow.bind(this)}>
							<FaPlus/>
						</a>
					</td>
					<td>
						<a href="/start">
								<FaPlay/>
							</a>
						<a href="/stop" className="pl-3">
							<FaStop/>
						</a>
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
		let eElements = input.closest('tr').querySelectorAll('input, textarea');
		let aElements = Array.from(eElements) as HTMLInputElement[];
		const valueSet = aElements.map((el: HTMLInputElement | HTMLTextAreaElement) => {
			// console.log(el);
			if (el.name) {
				return {[el.name]: el.value};
			}
		});
		const values = valueSet.reduce((acc, pair) => {
			return Object.assign(acc, pair);
		}, {});
		console.log(index, values);
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

		if (entries.length) {
			const lastEntry = entries[entries.length];
			lastEntry.finish();
		}
		entries.push(new TimeEntry({
			start: moment().format('HH:mm'),
		}));	// add current entry to the list
		this.setState({
			entries,
		})
	}

}
