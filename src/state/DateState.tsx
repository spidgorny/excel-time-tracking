import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { Storage } from './Storage';

interface State {
	date: Date;
}

export type SetDate = (date: Date) => void;

interface Props {
	children: (
		date: Date,
		setDate: SetDate,
		dateState: DateState,
	) => JSX.Element;
}

export class DateState extends React.Component<
	PropsWithChildren<Props>,
	State
> {
	storage: Storage;

	state: State = {
		date: new Date(),
	};

	constructor(props: any) {
		super(props);
		this.storage = new Storage();
		this.state.date = this.storage.fetch('date', this.state.date);
	}

	setDate(date: Date) {
		console.log('setDate', moment(date).toISOString());
		this.storage.update('date', date);
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
		console.log('DateState render', moment(this.state.date).toISOString());
		return (
			<React.Fragment key={this.state.date.toString()}>
				{this.props.children(
					this.state.date,
					this.setDate.bind(this),
					this,
				)}
			</React.Fragment>
		);
	}
}
