import React, { FormEvent } from "react";
import moment from "moment";
import { ITimeEntryRowProps, TimeEntryRow } from "./TimeEntryRow";
import { FaPlay, FaStop } from "react-icons/fa";
import { Col, Form, Row } from "react-bootstrap";

// interface ITimeEntryRowProps {
// 	date: Date;
// 	timeEntry: TimeEntry;
// 	onChange: (e: React.ChangeEvent) => void;
// 	makeEditable: (e: Event, yesOrNo: boolean) => void;
// }

export class TimeEntryEdit extends TimeEntryRow {
  timer: any;
  formRef: React.RefObject<HTMLFormElement>;
  textInput: React.RefObject<HTMLInputElement>;

  constructor(props: ITimeEntryRowProps) {
    super(props);
    console.log("TimeEntryEdit.constructor");
    this.formRef = React.createRef();
    this.textInput = React.createRef();
    // for removeEventListener
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  get endOutput() {
    return moment().format("HH:mm:ss");
  }

  keydownHandler(e: KeyboardEvent) {
    // console.log(e.key, e.ctrlKey, e.metaKey);
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      this.submit();
    }
    if (e.key === "Backspace" && e.ctrlKey) {
      e.preventDefault();
      this.props.remove();
    }
  }

  componentDidMount(): void {
    console.log("addEventListener");
    document.addEventListener("keydown", this.keydownHandler);
    this.textInput?.current?.focus();
  }

  componentWillUnmount(): void {
    console.log("removeEventListener");
    document.removeEventListener("keydown", this.keydownHandler);
  }

  submit(e?: FormEvent) {
    e && e.preventDefault();
    console.log("formRef", this.formRef.current);
    this.formRef.current && this.props.onChange(this.formRef.current);
    this.props.makeEditable(false);
  }

  render() {
    return (
      <Form ref={this.formRef} onSubmit={this.submit.bind(this)}>
        <Row className="timeEntryRow">
          <Col>
            <input
              type="time"
              name="start"
              form="form1"
              defaultValue={this.startValue}
              // onChange={this.props.onChange}
              className="form-control"
              ref={this.textInput}
            />
          </Col>
          <Col>
            <div className="d-flex">
              {this.endValue ? (
                <>
                  <input
                    type="time"
                    name="end"
                    form="form1"
                    defaultValue={this.endValue}
                    // onChange={this.props.onChange}
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
          </Col>
          <Col className="text-right">
            <output>{this.duration}</output>
          </Col>
          <Col className="text-right">
            <output>{this.earnings}</output>
          </Col>
          <Col>
            <textarea
              name="comment"
              placeholder="comment"
              className="form-control"
              form="form1"
              // onChange={this.props.onChange}
              defaultValue={this.props.timeEntry.comment}
            />
          </Col>
        </Row>
      </Form>
    );
  }

  play(e: React.MouseEvent) {
    e.preventDefault();
    this.props.timeEntry.end = undefined;
    // const dayStorage = this.context.getDay(this.props.date);
    const dayStorage = this.props.day;
    dayStorage.updateOne(this.props.timeEntry);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.forceUpdate(), 1000);
  }

  stop(e: React.MouseEvent) {
    e.preventDefault();
    this.props.timeEntry.end = moment().format("HH:mm");
    // const dayStorage = this.context.getDay(this.props.date);
    const dayStorage = this.props.day;
    dayStorage.updateOne(this.props.timeEntry);
    this.stopTimer();
    this.props.makeEditable(false);
  }

  stopTimer() {
    this.timer && clearInterval(this.timer);
  }
}
