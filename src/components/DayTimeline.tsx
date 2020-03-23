import React from "react";
import moment from "moment";
import './DayTimeline.scss';
import {GlobalContext} from "../state/GlobalContext";
import {AppState} from "../state/AppState";

export class DayTimeline extends React.Component<{
	date: Date;
}, {}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	render() {
		const days = [];
		const today = moment(this.props.date);
		for (let i = -10; i <= 10; i++) {
			days.push(today.clone().add(i, 'days'));
		}
		return (
			<div className="d-flex justify-content-center mb-3">
				{days.map(day => {
					const isWeekend = [6, 7].includes(day.isoWeekday()) ? 'weekend' : '';
					const isToday = day.isSame(this.props.date, 'day') ? 'today' : '';
					let dayBox = <div
						className={"dayBox border text-center align-baseline " + [isWeekend, isToday].join(' ')}>
						{day.format('DD')}
					</div>;
					if (day.isSame(this.props.date, 'day')) {
						return dayBox;
					}
					return (
						<a href={'/day/' + day.format('YYYY-MM-DD')} onClick={(e) => this.dayClick(e, day)}
						   style={{textDecoration: 'none'}}>
							{dayBox}
						</a>
					);
				})}
			</div>
		);
	}

	dayClick(e: React.MouseEvent, date: moment.Moment) {
		e.preventDefault();
		this.context.setDate(date.toDate());
	}

}
