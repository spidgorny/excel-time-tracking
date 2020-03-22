import {AppStateBase} from "./AppStateBase";
import {DaysState} from "./DaysState";

export class AppState extends AppStateBase {

	rate: number;

	constructor() {
		super();
		(window as any)['state'] = this;
		this.rate = this.fetch('rate', 50);
	}

	getDay(date: Date) {
		return new DaysState(date);
	}

}

