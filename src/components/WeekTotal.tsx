import React from "react";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import moment from "moment";
import {Earnings} from "./Earnings";

const findHashtags = require('find-hashtags');

export class WeekTotal extends React.Component<{
	date: Date;
}, {}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	get dateRange() {
		const dateRange = [];
		const monday = moment(this.props.date).startOf('week');
		for (let i = 0; i < 7; i++) {
			const dayState = this.context.getDay(monday.clone().add(i, 'days').toDate());
			dateRange.push(dayState);
		}
		return dateRange;
	}

	get duration() {
		let sum = moment.duration(0);
		for (const dayState of this.dateRange) {
			sum.add(dayState.sumTime);
		}
		return sum;
	}

	get sumTime() {
		return this.duration.asHours().toFixed(2);
	}

	get sumMoney() {
		const hours = this.duration.asHours();
		return (<Earnings hours={hours}/>);
	}

	get hashtags() {
		const tagTimes: any = {};
		for (const dayState of this.dateRange) {
			for (const te of dayState.entries) {
				const tags = findHashtags(te.comment);
				for (const tag of tags) {
					if (!(tag in tagTimes)) {
						tagTimes[tag] = 0;
					}
					tagTimes[tag] += te.duration.asHours();
				}
			}
		}
		return tagTimes;
	}

	get title() {
		return <h5>Week #{moment(this.props.date).isoWeek()} total</h5>;
	}

	render() {
		const hashtags = this.hashtags;
		return (
			<div className="card w-100 ml-2 mr-2">
				<div className="jumbotron p-3">
					<h1 className="display-4 text-center">{this.sumTime}h</h1>
					<h3 className="lead text-right">{this.sumMoney}</h3>
				</div>
				<div className="card-body">
					{this.title}
				</div>
				<ul className="list-group list-group-flush">
					{Object.keys(hashtags).map(tag => (
						<li className="list-group-item d-flex justify-content-between" key={tag}>
							{tag}
							<span className="badge badge-primary badge-pill">
									{hashtags[tag]}h
								</span>
						</li>
					))}
				</ul>
				</div>
		);
	}
}
