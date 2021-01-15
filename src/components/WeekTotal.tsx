import React from 'react';
import moment from 'moment';
import { Earnings } from './Earnings';
import { DaysState } from '../state/DaysState';
// @ts-ignore
import debounceRender from 'react-debounce-render';

const findHashtags = require('find-hashtags');

interface Props {
	date: Date;
	dateRange: DaysState[];
}

export class WeekTotalComponent extends React.PureComponent<Props, {}> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	get duration() {
		let sum = moment.duration(0);
		for (const dayState of this.props.dateRange) {
			sum.add(dayState.sumTime);
		}
		return sum;
	}

	get sumHours() {
		return this.duration.asHours().toFixed(2);
	}

	get sumTime() {
		let hh = this.duration.get('hours');
		let mm = this.duration.get('minutes');
		return (
			hh.toString().padStart(2, '0') +
			':' +
			mm.toString().padStart(2, '0')
		);
	}

	get sumMoney() {
		const hours = this.duration.asHours();
		// TODO: rate
		return <Earnings hours={hours} rate={50} />;
	}

	get hashtags() {
		const tagTimes: { [key: string]: number } = {};
		for (const dayState of this.props.dateRange) {
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
		const sorted = Object.entries(tagTimes).sort(
			(a: [string, number], b: [string, number]) => {
				return (b[1] as number) - a[1]; // value
			},
		);
		return Object.fromEntries(sorted);
	}

	get title() {
		return (
			<h5 style={{ paddingTop: 0 }}>
				Week #{moment(this.props.date).isoWeek()} total
			</h5>
		);
	}

	render() {
		const hashtags = this.hashtags;
		return (
			<div className="card w-100">
				<div className="jumbotron p-3">
					<h1 className="display-4 text-center">{this.sumHours}h</h1>
					<h3 className="lead left">{this.sumTime}</h3>
					<h3 className="lead text-right">{this.sumMoney}</h3>
				</div>
				<div className="card-body">{this.title}</div>
				<ul className="list-group list-group-flush">
					{Object.keys(hashtags).map((tag) => (
						<li
							className="list-group-item d-flex justify-content-between"
							key={tag}
						>
							{tag}
							<span className="badge badge-primary badge-pill">
								{hashtags[tag].toFixed(2)}h
							</span>
						</li>
					))}
				</ul>
				<div className="text-muted">{Math.random()}</div>
			</div>
		);
	}
}

// export const WeekTotal = debounceRender(WeekTotalComponent);
export const WeekTotal = WeekTotalComponent;
