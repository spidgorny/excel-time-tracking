import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { AppStateBase } from './AppStateBase';

interface State {
	date: Date;
}

export type SetDate = (date: Date) => void;

export class DateState extends React.Component<
	PropsWithChildren<{
		children: (
			date: Date,
			setDate: SetDate,
			dateState: DateState,
		) => JSX.Element;
	}>,
	State
> {
	storage: AppStateBase;

	state: State = {
		date: new Date(),
	};

	constructor(props: any) {
		super(props);
		this.storage = new AppStateBase();
		this.state.date = this.storage.fetch('date', this.state.date);
	}

	setDate(date: Date) {
		// console.log("setDate", date);
		this.setState({
			date,
		});
	}

	incDate() {
		this.setDate(moment(this.state.date).add(1, 'day').toDate());
	}

	decDate() {
		this.setDate(moment(this.state.date).subtract(1, 'day').toDate());
	}

	render() {
		return this.props.children(
			this.state.date,
			this.setDate.bind(this),
			this,
		);
	}
}
