import { POJO } from "./POJO";
import moment from "moment";

export class TimeEntry extends POJO {
  // @ts-ignore
  start: string;
  end: string | undefined;
  comment: string | undefined;

  constructor(props: any = {}) {
    super(props);
    Object.assign(this, props);
  }

  get duration() {
    const start = this.getStartMoment();
    const end = this.getEndMoment();
    const dur = moment.duration(end.diff(start));
    return dur;
  }

  getStartMoment() {
    const date = new Date();
    const [hr, min] = this.start.split(":");
    const iHr = parseInt(hr, 10);
    const iMin = parseInt(min, 10);
    const from = moment(date).hours(iHr).minutes(iMin);
    return from;
  }

  // returns now() if no end time specified
  getEndMoment() {
    const date = new Date();
    if (!this.end) {
      const now = new Date();
      return moment(date).hours(now.getHours()).minutes(now.getMinutes());
    }
    const [hr, min] = this.end.split(":");
    const iHr = parseInt(hr, 10);
    const iMin = parseInt(min, 10);
    const till = moment(date).hours(iHr).minutes(iMin);
    return till;
  }

  finish() {
    if (!this.end) {
      this.end = moment().format("HH:mm");
    }
  }

  hash() {
    return [this.start, this.end, this.comment].join(".");
  }
}
