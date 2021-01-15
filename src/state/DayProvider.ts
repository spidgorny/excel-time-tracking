import { AppStateBase } from './AppStateBase';
import { DaysState } from './DaysState';
import moment from 'moment';
import React from 'react';

interface State {
	rate: number;
}

export class DayProvider extends React.Component<
	{
		date: Date;
		children: (day: DaysState, dayProvider: DayProvider) => JSX.Element;
	},
	State
> {
	storage: AppStateBase;

	dayStateCache: {
		[key: string]: DaysState;
	} = {};

	// @ts-ignore
	state: State = {};

	constructor(props: any) {
		super(props);
		(window as any)['state'] = this;
		this.storage = new AppStateBase();
		this.state.rate = this.storage.fetch('rate', 50);
	}

	getDay(date: Date) {
		const ymd = moment(date).format('YYYY-MM-DD');
		if (ymd in this.dayStateCache) {
			return this.dayStateCache[ymd];
		}
		let daysState = new DaysState(date);
		// daysState.subscribe(this.notify.bind(this));
		this.dayStateCache[ymd] = daysState;
		return daysState;
	}

	setRate(rate: number) {
		this.setState({
			rate,
		});
	}

	// getCurrentEntries() {
	// 	const ymd = moment(this.date).format('YYYY-MM-DD');
	// 	console.log("getCurrentEntries", ymd);
	// return this.getDay(this.date);
	// }

	render() {
		return this.props.children(this.getDay(this.props.date), this);
	}
}
