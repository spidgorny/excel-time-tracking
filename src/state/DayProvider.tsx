import { Storage } from './Storage';
import { Entries } from './entries';
import React from 'react';
import moment from 'moment';

interface Props {
	date: Date;
	children: (day: Entries, dayProvider: DayProvider) => JSX.Element;
}

interface State {
	rate: number;
}

export class DayProvider extends React.Component<Props, State> {
	storage: Storage;

	// @ts-ignore
	state: State = {};

	constructor(props: any) {
		super(props);
		this.storage = new Storage();
		this.state.rate = this.storage.fetch('rate', 50);
	}

	setRate(rate: number) {
		this.setState({
			rate,
		});
	}

	/// read-only for reports, changes will not be saved
	getDay(date: Date) {
		const ds = new Entries({
			date,
			children: (data: Entries) => {
				return <></>;
			},
		});
		return ds;
	}

	render() {
		console.warn('DayProvider', moment(this.props.date).toISOString());
		return (
			<Entries date={this.props.date}>
				{(dayData: Entries) => {
					console.log(dayData.state.entries);
					return this.props.children(dayData, this);
				}}
			</Entries>
		);
	}
}
