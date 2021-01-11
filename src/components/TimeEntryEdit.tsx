import React from "react";
// import {TimeEntry} from "../model/TimeEntry";
import moment from "moment";
import { TimeEntryRow } from "./TimeEntryRow";
import { FaPlay, FaStop } from "react-icons/fa";

// interface ITimeEntryRowProps {
// 	date: Date;
// 	timeEntry: TimeEntry;
// 	onChange: (e: React.ChangeEvent) => void;
// 	makeEditable: (e: Event, yesOrNo: boolean) => void;
// }

export class TimeEntryEdit extends TimeEntryRow {
  timer: any;
  textInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
  }

  get endOutput() {
    return moment().format("HH:mm:ss");
  }

  keydownHandler(e: KeyboardEvent) {
    // console.log(e.key, e.ctrlKey, e.metaKey);
    if (e.key === "Enter" && e.ctrlKey) {
      this.props.makeEditable(e, false);
    }
  }

  componentDidMount(): void {
    this.timer = setInterval(() => this.forceUpdate(), 1000);
    document.addEventListener("keydown", (e) => this.keydownHandler(e));
    this.textInput?.current?.focus();
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
    document.removeEventListener("keydown", (e) => this.keydownHandler(e));
  }

  render() {
    return (
      <tbody className="timeEntryRow">
        <tr>
          <td>
            <input
              type="time"
              name="start"
              form="form1"
              value={this.startValue}
              onChange={this.props.onChange}
              className="form-control"
              ref={this.textInput}
            />
          </td>
          <td>
            <div className="d-flex">
              {this.endValue ? (
                <>
                  <input
                    type="time"
                    name="end"
                    form="form1"
                    value={this.endValue}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                  <a
                    href="/play"
                    className="pl-3"
                    onClick={this.play.bind(this)}
                  >
                    <FaPlay />
                  </a>
                </>
              ) : (
                <>
                  <output>{this.endOutput}</output>
                  <a
                    href="/stop"
                    className="pl-3"
                    onClick={this.stop.bind(this)}
                  >
                    <FaStop />
                  </a>
                </>
              )}
            </div>
          </td>
          <td className="text-right">
            <output>{this.duration}</output>
          </td>
          <td className="text-right">
            <output>{this.earnings}</output>
          </td>
        </tr>
        <tr>
          <td colSpan={6}>
            <textarea
              name="comment"
              placeholder="comment"
              className="form-control"
              form="form1"
              onChange={this.props.onChange}
              value={this.props.timeEntry.comment}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  play(e: React.MouseEvent) {
    e.preventDefault();
    this.props.timeEntry.end = undefined;
    const dayStorage = this.context.getDay(this.props.date);
    dayStorage.updateOne(this.props.timeEntry);
  }

  stop(e: React.MouseEvent) {
    e.preventDefault();
    this.props.timeEntry.end = moment().format("HH:mm");
    const dayStorage = this.context.getDay(this.props.date);
    dayStorage.updateOne(this.props.timeEntry);
  }
}
