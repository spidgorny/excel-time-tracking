import React from "react";
import {TimeEntry} from "../model/TimeEntry";
import moment from "moment";
import {GlobalContext} from "../state/GlobalContext";
import {AppState} from "../state/AppState";
import {Earnings} from "./Earnings";

interface ITimeEntryRowProps {
	date: Date;
	timeEntry: TimeEntry;
	onChange: (e: React.ChangeEvent) => void;
	makeEditable: (e: Event, yesOrNo: boolean) => void;
}

export class TimeEntryRow extends React.Component<ITimeEntryRowProps> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

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
		return dur.hours().toString().padStart(2, '0') + ':' + dur.minutes().toString().padStart(2, '0');
	}

	get earnings() {
		const hours = this.props.timeEntry.duration.asHours();
		return (<Earnings hours={hours}/>);
	}

	render() {
		return (<tbody>
		<tr>
			<td onClick={e => this.props.makeEditable(e as unknown as Event, true)}>
				{this.startValue}
			</td>
			<td onClick={e => this.props.makeEditable(e as unknown as Event, true)}>
				{this.endValue}
			</td>
			<td className="text-right">
				{this.duration}
			</td>
			<td className="text-right">
				{this.earnings}
			</td>
		</tr>
		{this.props.timeEntry.comment ?
			<tr>
				<td colSpan={6}>
					{this.props.timeEntry.comment}
				</td>
			</tr>
			: null}
		</tbody>);
	}
}
