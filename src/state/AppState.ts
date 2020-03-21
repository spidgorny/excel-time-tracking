import {AppStateBase} from "./AppStateBase";
import {DaysState} from "./DaysState";

export class AppState extends AppStateBase {

	constructor() {
		super();
		(window as any)['state'] = this;
	}

	getDay(date: Date) {
		return new DaysState(date);
	}

}

