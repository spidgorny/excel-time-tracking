import { Storage } from './Storage';
import moment from 'moment';
import { TimeEntry } from '../model/TimeEntry';
import React from 'react';

interface Props {
	date: Date;
	children: (dayData: Entries) => JSX.Element;
}

interface State {
	entries: TimeEntry[];
}

export class Entries extends React.Component<Props, State> {
	storage: Storage;

	constructor(props: Props) {
		super(props);
		this.storage = new Storage();
		console.time('DaysState ' + this.key);
		const entries = this.storage
			.fetch(this.key, [])
			.map((el: any) => new TimeEntry(el))
			.filter((el: TimeEntry) => el.start);
		console.timeEnd('DaysState ' + this.key);
		// @ts-ignore
		// noinspection JSConstantReassignment
		this.state = {
			entries,
		};
	}

	get key() {
		const ymd = moment(this.props.date).format('YYYY-MM-DD');
		return 'date.' + ymd + '.entries';
	}

	get sumTime(): moment.Duration {
		const sum = this.state.entries.reduce(
			(acc: moment.Duration, te: TimeEntry) => te.duration.add(acc),
			moment.duration(0),
		);
		return sum;
	}

	updateEntries(entries: TimeEntry[]) {
		console.time('DayState WRITE ' + this.key);
		this.storage.update(this.key, entries);
		console.timeEnd('DayState WRITE ' + this.key);
		this.setState({
			entries,
		});
	}

	updateOne(timeEntry: TimeEntry) {
		let timeEntries = this.state.entries;
		const index = timeEntries.findIndex((el) => el === timeEntry);
		if (index === -1) {
			console.error('index in updateOne not found');
			return;
		}
		timeEntries[index] = timeEntry;
		this.updateEntries(timeEntries);
	}

	remove(index: number) {
		this.state.entries.splice(index, 1);
		this.storage.update(this.key, this.state.entries);
		this.setState({
			entries: this.state.entries,
		});
	}

	hash() {
		return [
			this.props.date,
			...this.state.entries.map((e) => e.hash()),
		].join('.');
	}

	render() {
		return this.props.children(this);
	}
}
