import React from "react";
import moment from "moment";
import { WeekTotalComponent } from "./WeekTotal";
// @ts-ignore
// import debounceRender from "react-debounce-render";

export class MonthTotalComponent extends WeekTotalComponent {
  get dateRange() {
    const dateRange = [];
    const monday = moment(this.props.date).startOf("month");
    for (let i = 0; i < monday.daysInMonth(); i++) {
      const dayState = this.props.appState.getDay(
        monday.clone().add(i, "days").toDate()
      );
      dateRange.push(dayState);
    }
    // console.log(dateRange.length);
    return dateRange;
  }

  get title() {
    let month = moment(this.props.date);
    return <h5>Month {month.format("YYYY-MM")} total</h5>;
  }
}

// export const MonthTotal = debounceRender(MonthTotalComponent);
export const MonthTotal = MonthTotalComponent;
