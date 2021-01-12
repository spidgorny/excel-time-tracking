import React from "react";
import { TimeEntry } from "../model/TimeEntry";
import moment from "moment";
import { GlobalContext } from "../state/GlobalContext";
import { AppState } from "../state/AppState";
import { Earnings } from "./Earnings";
import { Col, Row } from "react-bootstrap";

interface ITimeEntryRowProps {
  date: Date;
  timeEntry: TimeEntry;
  onChange: (e: React.ChangeEvent) => void;
  makeEditable: (yesOrNo: boolean) => void;
  remove: () => void;
}

export class TimeEntryRow extends React.Component<ITimeEntryRowProps> {
  static contextType = GlobalContext;
  // @ts-ignore
  context: AppState;

  get startValue() {
    if (this.props.timeEntry.start) {
      return this.props.timeEntry.start;
    }
    return moment().format("HH:mm");
  }

  get endValue() {
    if (this.props.timeEntry.end) {
      return this.props.timeEntry.end;
    }
    return "";
  }

  get duration() {
    const dur = this.props.timeEntry.duration;
    return (
      dur.hours().toString().padStart(2, "0") +
      ":" +
      dur.minutes().toString().padStart(2, "0")
    );
  }

  get earnings() {
    const hours = this.props.timeEntry.duration.asHours();
    return <Earnings hours={hours} />;
  }

  render() {
    return (
      <>
        <Row>
          <Col onClick={(e: React.MouseEvent) => this.props.makeEditable(true)}>
            {this.startValue}
          </Col>
          <Col onClick={(e: React.MouseEvent) => this.props.makeEditable(true)}>
            {this.endValue}
          </Col>
          <Col className="text-right">{this.duration}</Col>
          <Col className="text-right">{this.earnings}</Col>
          <Col onClick={(e: React.MouseEvent) => this.props.makeEditable(true)}>
            {this.props.timeEntry.comment}
          </Col>
        </Row>
      </>
    );
  }
}
