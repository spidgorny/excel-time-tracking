import React from "react";
import {Link} from "react-router-dom";
// @ts-ignore
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from "moment";
import {GlobalContext} from "../state/GlobalContext";
import {AppState} from "../state/AppState";

interface IHeaderProps {
	date: moment.Moment;
}

export class Header extends React.Component<IHeaderProps, {
	focused: boolean;
}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	state = {
		focused: false,
	};

	isOutsideRange(date: moment.Moment) {
		if (date.isAfter(moment())) {
			return true;
		}
		return false;
	}

	isDayHighlighted(date: moment.Moment) {
		const dayState = this.context.getDay(date.toDate());
		return dayState.entries.length > 0;
	}

	render() {
		return (
			<header className="mb-3">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<h3 className="navbar-brand">
						<a href=".">excel-time-tracking</a>
					</h3>
					<SingleDatePicker
						date={this.props.date} // momentPropTypes.momentObj or null
						onDateChange={(date: moment.Moment) => this.setDate(date)} // PropTypes.func.isRequired
						focused={this.state.focused} // PropTypes.bool
						onFocusChange={(x: any) => this.setState({focused: x.focused})} // PropTypes.func.isRequired
						id="your_unique_id" // PropTypes.string.isRequired,
						isOutsideRange={this.isOutsideRange.bind(this)}
						isDayHighlighted={this.isDayHighlighted.bind(this)}
					/>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
									data-target="#navbarNav"
									aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>
					<div className="collapse navbar-collapse justify-content-between" id="navbarNav">
						<div/>
						<div className="navbar-nav">
							<Link className="nav-link active" to=".">Home</Link>
							<a className="nav-link" href="/logout" onClick={this.logout.bind(this)}>Logout</a>
						</div>
					</div>
				</nav>
			</header>
		);
	}


	logout(e: React.MouseEvent) {

	}

	setDate(date: moment.Moment) {
		console.log(date);
	}

}
