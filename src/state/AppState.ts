import { AppStateBase } from "./AppStateBase";
import { DaysState } from "./DaysState";
import moment from "moment";

export class AppState extends AppStateBase {
  date: Date = new Date();
  rate: number;
  dayStateCache: {
    [key: string]: DaysState;
  } = {};

  constructor() {
    super();
    (window as any)["state"] = this;
    this.date = this.fetch("date", this.date);
    this.rate = this.fetch("rate", 50);
  }

  setDate(date: Date) {
    this.date = date;
    this.update("date", this.date);
    this.notify();
  }

  incDate() {
    this.setDate(moment(this.date).add(1, "day").toDate());
  }

  decDate() {
    this.setDate(moment(this.date).subtract(1, "day").toDate());
  }

  getDay(date: Date) {
    const ymd = moment(date).format("YYYY-MM-DD");
    if (ymd in this.dayStateCache) {
      return this.dayStateCache[ymd];
    }
    let daysState = new DaysState(date);
    daysState.subscribe(this.notify.bind(this));
    this.dayStateCache[ymd] = daysState;
    return daysState;
  }

  getCurrentEntries() {
    const ymd = moment(this.date).format("YYYY-MM-DD");
    console.log("getCurrentEntries", ymd);
    return this.getDay(this.date);
  }
}
