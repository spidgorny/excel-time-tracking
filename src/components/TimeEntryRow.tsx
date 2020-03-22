import React from "react";
import {TimeEntry} from "../model/TimeEntry";
import moment from "moment";

interface ITimeEntryRowProps {
	date: Date;
	timeEntry: TimeEntry;
	onChange: (e: React.ChangeEvent) => void;
}

export class TimeEntryRow extends React.Component<ITimeEntryRowProps> {

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

	get dur() {
		const dur = moment.duration(this.props.timeEntry.getStartMoment(this.props.date)
			.diff(this.props.timeEntry.getEndMoment(this.props.date)));
		return dur;
	}

	get duration() {
		const dur = this.dur;
		return dur.hours() + ':' + dur.minutes();
	}

	get earnings() {
		return 123 + '$';
	}

	render() {
		return <>
			<tr>
				<td>
					<input type="time" name="start" form="form1"
								 value={this.startValue}
								 onChange={this.props.onChange}
								 className="form-control"/>
				</td>
				<td className="d-flex">
					<input type="time" name="end" form="form1"
								 value={this.endValue}
								 onChange={this.props.onChange}
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
							<textarea name="comment" className="form-control" form="form1"
												onChange={this.props.onChange}/>
				</td>
			</tr>
		</>;
	}
}
