import React from "react";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import moment from "moment";
import {Earnings} from "./Earnings";
import {WeekTotal} from "./WeekTotal";

export class MonthTotal extends WeekTotal {

	get dateRange() {
		const dateRange = [];
		const monday = moment(this.props.date).startOf('month');
		for (let i = 0; i < monday.daysInMonth(); i++) {
			const dayState = this.context.getDay(monday.clone().add(i, 'days').toDate());
			dateRange.push(dayState);
		}
		console.log(dateRange.length);
		return dateRange;
	}

	get title() {
		let month = moment(this.props.date);
		return <h5>Month {month.format('YYYY-MM')} total</h5>;
	}

}
