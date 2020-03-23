import {AppStateBase} from "./AppStateBase";
import moment from "moment";
import {TimeEntry} from "../model/TimeEntry";

export class DaysState extends AppStateBase {

	date: Date;
	entries: TimeEntry[];

	constructor(date: Date) {
		super();
		this.date = date;
		this.entries = this.fetch(this.key, [])
			.map((el: any) => new TimeEntry(el))
			.filter((el: TimeEntry) => el.start);
	}

	get key() {
		const ymd = moment(this.date).format('YYYY-MM-DD');
		return 'date.' + ymd + '.entries';
	}

	updateEntries(entries: TimeEntry[]) {
		super.update(this.key, entries);
		this.notify();
	}

	updateOne(timeEntry: TimeEntry) {
		const index = this.entries.findIndex((el => el === timeEntry));
		if (index === -1) {
			console.error('index in updateOne not found');
			return;
		}
		this.entries[index] = timeEntry;
		this.updateEntries(this.entries);
		console.log('updateOne', timeEntry);
		this.notify();
	}

	get sumTime(): moment.Duration {
		const sum = this.entries.reduce((acc: moment.Duration, te: TimeEntry) => te.duration.add(acc), moment.duration(0));
		return sum;
	}

}
