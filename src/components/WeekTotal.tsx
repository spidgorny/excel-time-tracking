import React from "react";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import moment from "moment";
import {Earnings} from "./Earnings";

export class WeekTotal extends React.Component<{
	date: Date;
}, {}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	get duration() {
		let sum = moment.duration(0);
		const monday = moment(this.props.date).startOf('week');
		for (let i = 0; i < 7; i++) {
			const dayState = this.context.getDay(monday.clone().add(i, 'days').toDate());
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

	render() {
		return (
			<div className="d-flex justify-content-between">
				<div className="card" style={{width: '18rem'}}>
					<div className="jumbotron p-3">
						<h1 className="display-4 text-center">{this.sumTime}h</h1>
						<h3 className="lead text-right">{this.sumMoney}</h3>
					</div>
					<div className="card-body">
						<h5>Week #{moment(this.props.date).isoWeek()} total</h5>
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Cras justo odio</li>
						<li className="list-group-item">Dapibus ac facilisis in</li>
						<li className="list-group-item">Vestibulum at eros</li>
					</ul>
				</div>
			</div>
		);
	}
}
