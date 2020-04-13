import React from "react";
import {Link, withRouter} from "react-router-dom";
// @ts-ignore
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from "moment";
import {GlobalContext} from "../state/GlobalContext";
import {AppState} from "../state/AppState";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {RouteComponentProps} from "react-router";

interface IHeaderProps extends RouteComponentProps {
	date: moment.Moment;
}

class HeaderClass extends React.Component<IHeaderProps, {
	focused: boolean;
}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	state = {
		focused: false,
	};

	isOutsideRange(date: moment.Moment) {
		if (date.isAfter(moment().endOf('day'))) {
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
				<Navbar className="navbar navbar-expand-lg navbar-light bg-light">
					<Navbar.Brand className="navbar-brand">
						<a href=".">excel-time-tracking</a>
					</Navbar.Brand>
					<SingleDatePicker
						date={this.props.date} // momentPropTypes.momentObj or null
						onDateChange={(date: moment.Moment) => this.setDate(date)} // PropTypes.func.isRequired
						focused={this.state.focused} // PropTypes.bool
						onFocusChange={(x: any) => this.setState({focused: x.focused})} // PropTypes.func.isRequired
						id="your_unique_id" // PropTypes.string.isRequired,
						isOutsideRange={this.isOutsideRange.bind(this)}
						isDayHighlighted={this.isDayHighlighted.bind(this)}
						initialVisibleMonth={() => moment().endOf('month')}
					/>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
									data-target="#navbarNav"
									aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>
					<Navbar.Collapse className="collapse navbar-collapse justify-content-between" id="navbarNav">
						<div/>
						<div className="navbar-nav">
							<Link className={['nav-link', this.props.location.pathname === '/' ? 'active' : ''].join(' ')}
										to="/">Home</Link>
							<Link className={['nav-link', this.props.location.pathname === '/report' ? 'active' : ''].join(' ')}
										to="/report">Report</Link>
						</div>
					</Navbar.Collapse>
				</Navbar>
			</header>
		);
	}

	setDate(date: moment.Moment) {
		console.log(date);
		this.context.setDate(date.toDate());
	}

}

export var Header = withRouter(HeaderClass);
