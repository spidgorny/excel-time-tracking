import {AppStateBase} from "./AppStateBase";
import moment from "moment";
import {TimeEntry} from "../model/TimeEntry";

export class DaysState extends AppStateBase {

	date: Date;
	entries: TimeEntry[];

	constructor(date: Date) {
		super();
		this.date = date;
		this.entries = this.fetch(this.key);
	}

	get key() {
		const ymd = moment(this.date).format('YYYY-MM-DD');
		return 'date.' + ymd + '.entries';
	}

	updateEntries(entries: TimeEntry[]) {
		super.update(this.key, entries);
	}

}
