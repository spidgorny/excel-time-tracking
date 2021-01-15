import { AppStateBase } from './AppStateBase';
import { DaysState } from './DaysState';
import moment from 'moment';

export class AppState extends AppStateBase {
	rate: number;
	dayStateCache: {
		[key: string]: DaysState;
	} = {};

	constructor() {
		super();
		(window as any)['state'] = this;
		this.rate = this.fetch('rate', 50);
	}

	hash() {
		return [
			// this.date.toString(),
			this.rate,
			...Object.values(this.dayStateCache).map((e) => e.hash()),
		].join('.');
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
		this.rate = rate;
		this.update('rate', this.rate);
		this.notify();
	}

	// getCurrentEntries() {
	// 	const ymd = moment(this.date).format('YYYY-MM-DD');
	// 	console.log("getCurrentEntries", ymd);
	// return this.getDay(this.date);
	// }
}
