import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import {FaStop, FaPlay, FaPlus} from "react-icons/fa";
import moment from "moment";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import {TimeEntry} from "../model/TimeEntry";

export class DayTable extends React.Component<{}, {
	date: Date;
	entries: TimeEntry[];
}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	state = {
		date: new Date(),
		entries: [],
	};

	get startValue() {
		return moment().format('HH:mm');
	}

	get endValue() {
		return '';
	}

	get duration() {
		return '01:23';
	}

	get earnings() {
		return 123 + '$';
	}

	render() {
		return (
			<Form onSubmit={this.onSubmit.bind(this)}>
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
					<tr>
						<td>
							<input type="time" name="start"
										 value={this.startValue}
										 onChange={e => this.onChange(e, 'start')}
										 className="form-control"/>
						</td>
						<td className="d-flex">
							<input type="time" name="end"
										 value={this.endValue}
										 onChange={e => this.onChange(e, 'end')}
										 className="form-control"/>
						</td>
						<td className="text-right">
							<output>
								{this.duration}
							</output>
						</td>
						<td className="text-right">
							<output>
								{this.earnings}
							</output>
						</td>
					</tr>
					<tr>
						<td colSpan={6}>
								<textarea name="comment" className="form-control"
													onChange={e => this.onChange(e, 'comment')}></textarea>
						</td>
					</tr>
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
			</Form>
		);
	}

	onChange(e: React.ChangeEvent, field: string) {
		this.onSubmit(e);
	}

	onSubmit(e: React.FormEvent) {
		e.preventDefault();
		// console.log(e.target);
		const input = e.target as HTMLInputElement;
		if (input === null) {
			return;
		}
		// @ts-ignore
		let aElements: HTMLInputElement[] = Array.from(input.form.elements);
		const valueSet = aElements.map((el: HTMLInputElement | HTMLTextAreaElement) => {
			// console.log(el);
			if (el.name) {
				return {[el.name]: el.value};
			}
		});
		const values = valueSet.reduce((acc, pair) => {
			return Object.assign(acc, pair);
		}, {});
		console.log(values);
		this.context.getDay(this.state.date)
			.updateEntries(this.state.entries);
	}

	addRow(e: React.MouseEvent) {
		e.preventDefault();

	}

}
