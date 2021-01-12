import React from "react";
import moment from "moment";
import "./DayTimeline.scss";
import { GlobalContext } from "../state/GlobalContext";
import { AppState } from "../state/AppState";

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

export class DayTimeline extends React.Component<Props, {}> {
  // static contextType = GlobalContext;
  // @ts-ignore
  // context: AppState;
  context: undefined;

  componentDidMount(): void {
    document.addEventListener("keydown", (e) => this.keydownHandler(e));
  }

  keydownHandler(e: KeyboardEvent) {
    //console.log(e.key, e.ctrlKey, e.metaKey);
    const ctrl = (e.ctrlKey || e.metaKey) && e.shiftKey;
    if (ctrl && e.key === "ArrowLeft") {
      // @ts-ignore
      this.dayClick(
        (e as unknown) as React.MouseEvent,
        moment(this.props.date).subtract("1", "day")
      );
    }
    if (ctrl && e.key === "ArrowRight") {
      // @ts-ignore
      this.dayClick(
        (e as unknown) as React.MouseEvent,
        moment(this.props.date).add("1", "day")
      );
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", (e) => this.keydownHandler(e));
  }

  render() {
    const days = [];
    const today = moment(this.props.date);
    for (let i = -10; i <= 10; i++) {
      days.push(today.clone().add(i, "days"));
    }
    return (
      <div className="d-flex justify-content-center mb-3">
        {days.map((day) => {
          const isWeekend = [6, 7].includes(day.isoWeekday()) ? "weekend" : "";
          const isToday = day.isSame(this.props.date, "day") ? "today" : "";
          let dayBox = (
            <div
              className={
                "dayBox border text-center align-baseline " +
                [isWeekend, isToday].join(" ")
              }
              key={day.toISOString()}
            >
              {day.format("DD")}
            </div>
          );
          if (day.isSame(this.props.date, "day")) {
            return dayBox;
          }
          return (
            <a
              href={"/day/" + day.format("YYYY-MM-DD")}
              onClick={(e) => this.dayClick(e, day)}
              style={{ textDecoration: "none" }}
              key={day.toISOString()}
            >
              {dayBox}
            </a>
          );
        })}
      </div>
    );
  }

  dayClick(e: React.MouseEvent, date: moment.Moment) {
    e.preventDefault();
    // this.context.setDate(date.toDate());
    this.props.setDate(date.toDate());
  }
}
