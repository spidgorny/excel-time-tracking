import React from "react";
import { AppState } from "../state/AppState";
import { GlobalContext } from "../state/GlobalContext";
import moment from "moment";
import Table from "react-bootstrap/Table";

interface IReportProps {}

interface IReportState {}

export class Report extends React.Component<IReportProps, IReportState> {
  static contextType = GlobalContext;
  // @ts-ignore
  context: AppState;

  state: IReportState = {};

  render() {
    let daysInMonth = moment(this.context.date).daysInMonth();
    const days = Array.from(new Array(daysInMonth), (x, i) => i + 1);
    //console.log(days);
    return (
      <div>
        {days.map((day) => {
          const date = moment(this.context.date).startOf("month").date(day);
          let dayRepo = this.context.getDay(date.toDate());
          return (
            <>
              <h3 key={day}>
                {date.format("YYYY-MM-DD")}
                {dayRepo.sumTime.asHours() === 0
                  ? null
                  : ": " + dayRepo.sumTime.asHours().toFixed(2) + " h"}
              </h3>
              <Table as="table">
                <tbody>
                  {dayRepo.entries.map((entry) => {
                    return (
                      <tr>
                        <td>{entry.start}</td>
                        <td>{entry.end}</td>
                        <td>{entry.duration.asHours().toFixed(2)} h</td>
                        <td>{entry.comment}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          );
        })}
      </div>
    );
  }
}
