import React from "react";
import {TimeEntry} from "../model/TimeEntry";
import moment from "moment";
import {GlobalContext} from "../state/GlobalContext";
import {AppState} from "../state/AppState";
import {TimeEntryRow} from "./TimeEntryRow";
import {FaStop} from "react-icons/fa";

const currencies = require('country-currency');

interface ITimeEntryRowProps {
	date: Date;
	timeEntry: TimeEntry;
	onChange: (e: React.ChangeEvent) => void;
}

export class TimeEntryEdit extends TimeEntryRow {

	timer: any;

	get endOutput() {
		return moment().format('HH:mm:ss');
	}

	componentDidMount(): void {
		this.timer = setInterval(() => this.forceUpdate(), 1000);
	}

	componentWillUnmount(): void {
		clearInterval(this.timer);
	}

	render() {
		return <tbody className="timeEntryRow">
		<tr>
			<td>
				<input type="time" name="start" form="form1"
							 value={this.startValue}
							 onChange={this.props.onChange}
							 className="form-control"/>
			</td>
			<td className="d-flex">
				{this.endValue ?
					<input type="time" name="end" form="form1"
								 value={this.endValue}
								 onChange={this.props.onChange}
								 className="form-control"/>
					:
					<>
						<output>
							{this.endOutput}
						</output>
						<a href="/stop" className="pl-3">
							<FaStop/>
						</a>
					</>
				}
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
						<textarea name="comment" className="form-control" form="form1"
											onChange={this.props.onChange}
											value={this.props.timeEntry.comment}/>
			</td>
		</tr>
		</tbody>;
	}
}
