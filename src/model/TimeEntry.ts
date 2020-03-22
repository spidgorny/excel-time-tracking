import {POJO} from "./POJO";
import moment from "moment";

export class TimeEntry extends POJO {

	// @ts-ignore
	start: string;
	// @ts-ignore
	end: string;
	comment: string | undefined;

	constructor(props: any = {}) {
		super(props);
		Object.assign(this, props);
	}

	getStartMoment(date: Date) {
		const [hr, min] = this.start.split(':');
		const iHr = parseInt(hr, 10);
		const iMin = parseInt(min, 10);
		const from = moment(date).hours(iHr).minutes(iMin);
		return from;
	}

	getEndMoment(date: Date) {
		if (!this.end) {
			const now = new Date();
			return moment(date).hours(now.getHours()).minutes(now.getMinutes());
		}
		const [hr, min] = this.end.split(':');
		const iHr = parseInt(hr, 10);
		const iMin = parseInt(min, 10);
		const till = moment(date).hours(iHr).minutes(iMin);
		return till;
	}

	finish() {
		if (!this.end) {
			this.end = moment().format('HH:mm');
		}
	}

}
