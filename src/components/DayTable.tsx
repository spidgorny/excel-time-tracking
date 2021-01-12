import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { AppState } from "../state/AppState";
import { TimeEntry } from "../model/TimeEntry";
import { TimeEntryRow } from "./TimeEntryRow";
import moment from "moment";
import { TimeEntryEdit } from "./TimeEntryEdit";
import { Earnings } from "./Earnings";
import { Col, Container, Row } from "react-bootstrap";
import { DaysState } from "../state/DaysState";
import { inputElementsToMap } from "../functions";

interface Props {
  date: Date;
  day: DaysState;
  appState: AppState; // for subscribe/unsubscribe
}

interface IDayTableState {
  entries: TimeEntry[];
  editable: boolean[];
}

export class DayTable extends React.Component<Props, IDayTableState> {
  // static contextType = GlobalContext;
  // @ts-ignore
  // context: AppState;
  context: undefined;

  state = {
    entries: [],
    editable: [],
  };

  sub: number = -1;

  componentDidMount(): void {
    this.fetch();
    document.addEventListener("keydown", (e) => this.keydownHandler(e));
    this.subscribe();
  }

  subscribe() {
    this.sub = this.props.day.subscribe(
      () => this.props.appState.notify(),
      this.props.date.toString()
    );
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", (e) => this.keydownHandler(e));
    this.unsubscribe();
  }

  unsubscribe() {
    this.sub &&
      this.props.appState.unsubscribe(this.sub, this.props.date.toString());
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.date !== this.props.date) {
      this.unsubscribe();
      this.fetch();
      this.subscribe();
    }
  }

  get sumHours() {
    // const dayState = this.context.getDay(this.props.date);
    const dayState = this.props.day;
    return dayState.sumTime.asHours().toFixed(2);
  }

  get sumTime() {
    // const dayState = this.context.getDay(this.props.date);
    const dayState = this.props.day;
    const duration = dayState.sumTime;
    let hh = duration.get("hours");
    let mm = duration.get("minutes");
    return (
      hh.toString().padStart(2, "0") + ":" + mm.toString().padStart(2, "0")
    );
  }

  get sumMoney() {
    // const dayState = this.context.getDay(this.props.date);
    const dayState = this.props.day;
    const hours = dayState.sumTime.asHours();
    return <Earnings hours={hours} />;
  }

  fetch() {
    // const dayState = this.context.getDay(this.props.date);
    const dayState = this.props.day;
    const entries = dayState.entries;
    // console.log('componentDidMount', entries);
    this.setState(
      {
        entries,
      },
      () => {
        if (this.state.entries.length === 0) {
          // this.addRow(null);
        }
      }
    );
  }

  keydownHandler(e: KeyboardEvent) {
    // console.log(e.key, e.ctrlKey, e.metaKey);
    if (e.key === "Insert") {
      // @ts-ignore
      this.addRow((e as unknown) as Event);
    }
  }

  render() {
    // console.log('DayTable.render', this.props.date);
    return (
      <Container fluid={true} id="timeTable" className="py-3">
        <Row
          className="border-top"
          style={{
            color: "#495057",
            backgroundColor: "#e9ecef",
            borderColor: "#dee2e6",
          }}
        >
          <Col>Start Time</Col>
          <Col className="text-right">End Time</Col>
          <Col className="text-right">Duration</Col>
          <Col className="text-right">Earnings</Col>
          <Col>Comment</Col>
        </Row>
        {this.state.entries.map((te: TimeEntry, index: number) =>
          te.end && !this.state.editable[index] ? (
            <TimeEntryRow
              date={this.props.date}
              timeEntry={te}
              key={index}
              day={this.props.day}
              onChange={(form) => this.onChange(form, index)}
              makeEditable={(yesNo) => this.makeEditable(index, yesNo)}
              remove={() => {}}
            />
          ) : (
            <TimeEntryEdit
              date={this.props.date}
              timeEntry={te}
              key={index}
              day={this.props.day}
              onChange={(form) => this.onChange(form, index)}
              makeEditable={(yesNo) => this.makeEditable(index, yesNo)}
              remove={this.remove.bind(this, index, te)}
            />
          )
        )}
        {!this.state.entries.length ? (
          <Row>
            <Col className="col-4">
              <a
                href="/start"
                className="btn btn-primary"
                onClick={this.startWorking.bind(this)}
              >
                <FaPlay />
              </a>
            </Col>
            <Col />
            <Col />
            <Col />
          </Row>
        ) : null}
        <Row
          className="tfoot-light"
          style={{
            color: "#495057",
            backgroundColor: "#e9ecef",
            borderColor: "#dee2e6",
          }}
        >
          <Col>
            <a href="/addRow" onClick={this.addRow.bind(this)}>
              <FaPlus />
            </a>
          </Col>
          {/*<Col>*/}
          {/*{moment(this.props.date).isSame(moment(), "day") ? (*/}
          {/*  <a href="/addPlay" onClick={this.addPlay.bind(this)}>*/}
          {/*    <FaPlay />*/}
          {/*  </a>*/}
          {/*) : null}*/}
          {/*</Col>*/}
          <Col className="text-right">&Sigma; {this.sumTime}</Col>
          <Col className="text-right">{this.sumHours} h</Col>
          <Col className="text-right">{this.sumMoney}</Col>
          <Col />
        </Row>
      </Container>
    );
  }

  startWorking(e: React.MouseEvent) {
    this.addRow(e);
  }

  onChange(form: HTMLFormElement, index: number) {
    console.log("onChange", index, form);
    if (form === null) {
      return;
    }
    // @ts-ignore
    const eElements = form.querySelectorAll(
      "input, textarea"
    ) as NodeListOf<HTMLInputElement>;
    const values = inputElementsToMap(eElements);
    // console.log(index, values);
    const entries: TimeEntry[] = this.state.entries;
    entries[index] = new TimeEntry(values);
    this.setState({
      entries,
    });
    // const dayState = this.context.getDay(this.props.date);
    const dayState = this.props.day;
    dayState.updateEntries(this.state.entries);
  }

  addRow(e: React.MouseEvent | null) {
    if (e) {
      e.preventDefault();
    }
    const entries: TimeEntry[] = this.state.entries;

    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      lastEntry.finish();
    }
    entries.push(
      new TimeEntry({
        start: moment().subtract(1, "hour").format("HH:mm"),
        end: moment().format("HH:mm"),
      })
    ); // add current entry to the list

    const index = entries.length - 1;
    const editable = this.state.editable;
    // @ts-ignore
    editable[index] = true;

    this.setState(
      {
        entries,
        editable,
      },
      () => {
        // const dayState = this.context.getDay(this.props.date);
        const dayState = this.props.day;
        dayState.updateEntries(entries);
      }
    );
  }

  addPlay(e: React.MouseEvent | null) {
    if (e) {
      e.preventDefault();
    }
    const entries: TimeEntry[] = this.state.entries;

    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      lastEntry.finish();
    }
    entries.push(
      new TimeEntry({
        start: moment().format("HH:mm"),
      })
    ); // add current entry to the list
    this.setState(
      {
        entries,
      },
      () => {
        // this.context.getDay(this.props.date).updateEntries(entries);
        // const dayState = this.context.getDay(this.props.date);
        const dayState = this.props.day;
        dayState.updateEntries(entries);
      }
    );
  }

  makeEditable(index: number, yesNo: boolean) {
    const editable = this.state.editable;
    // @ts-ignore
    editable[index] = yesNo;
    this.setState({
      editable,
    });
  }

  remove(index: number, te: TimeEntry) {
    // this.context.getCurrentEntries().remove(index);
    // const dayState = this.context.getDay(this.props.date);
    const dayState = this.props.day;
    dayState.remove(index);
  }
}
