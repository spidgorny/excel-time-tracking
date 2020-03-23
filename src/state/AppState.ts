import {AppStateBase} from "./AppStateBase";
import {DaysState} from "./DaysState";
import moment from "moment";

export class AppState extends AppStateBase {

	date: Date = new Date();
	rate: number;
	dayStateCache: {
		[key: string]: DaysState;
	} = {};

	constructor() {
		super();
		(window as any)['state'] = this;
		this.rate = this.fetch('rate', 50);
	}

	getDay(date: Date) {
		const ymd = moment(date).format('YYYY-MM-DD');
		if (ymd in this.dayStateCache) {
			return this.dayStateCache[ymd];
		}
		let daysState = new DaysState(date);
		daysState.subscribe(this.notify.bind(this));
		this.dayStateCache[ymd] = daysState;
		return daysState;
	}

}

