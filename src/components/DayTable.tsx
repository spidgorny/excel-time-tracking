import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { AppState } from "../state/AppState";
import { GlobalContext } from "../state/GlobalContext";
import { TimeEntry } from "../model/TimeEntry";
import { TimeEntryRow } from "./TimeEntryRow";
import moment from "moment";
import { TimeEntryEdit } from "./TimeEntryEdit";
import { Earnings } from "./Earnings";
import { Col, Container, Row } from "react-bootstrap";

interface IDayTableState {
  entries: TimeEntry[];
  editable: boolean[];
}

export class DayTable extends React.Component<
  {
    date: Date;
  },
  IDayTableState
> {
  static contextType = GlobalContext;
  // @ts-ignore
  context: AppState;

  state = {
    entries: [],
    editable: [],
  };

  get sumTime() {
    const dayState = this.context.getDay(this.props.date);
    return dayState.sumTime.asHours().toFixed(2);
  }

  get sumMoney() {
    const dayState = this.context.getDay(this.props.date);
    const hours = dayState.sumTime.asHours();
    return <Earnings hours={hours} />;
  }

  componentDidMount(): void {
    this.fetch();
    document.addEventListener("keydown", (e) => this.keydownHandler(e));
  }

  fetch() {
    const entries = this.context.getDay(this.props.date).entries;
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

  componentDidUpdate(prevProps: any) {
    if (prevProps.date !== this.props.date) {
      this.fetch();
    }
  }

  keydownHandler(e: KeyboardEvent) {
    // console.log(e.key, e.ctrlKey, e.metaKey);
    if (e.key === "Insert") {
      // @ts-ignore
      this.addRow((e as unknown) as Event);
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", (e) => this.keydownHandler(e));
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
          <Col>End Time</Col>
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
              onChange={(e) => this.onChange(e, index)}
              makeEditable={(e, yesNo) => this.makeEditable(e, index, yesNo)}
              remove={() => {}}
            />
          ) : (
            <TimeEntryEdit
              date={this.props.date}
              timeEntry={te}
              key={index}
              onChange={(e) => this.onChange(e, index)}
              makeEditable={(e, yesNo) => this.makeEditable(e, index, yesNo)}
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
          <Col>
            {moment(this.props.date).isSame(moment(), "day") ? (
              <a href="/addPlay" onClick={this.addPlay.bind(this)}>
                <FaPlay />
              </a>
            ) : null}
          </Col>
          <Col className="text-right">{this.sumTime} h</Col>
          <Col className="text-right">{this.sumMoney}</Col>
          <Col />
        </Row>
      </Container>
    );
  }

  startWorking(e: React.MouseEvent) {
    this.addRow(e);
  }

  onChange(e: React.ChangeEvent, index: number) {
    e.preventDefault();
    // console.log(e.target);
    const input = e.target as HTMLInputElement;
    if (input === null) {
      return;
    }
    // @ts-ignore
    const eElements = input
      .closest(".timeEntryRow")
      .querySelectorAll("input, textarea");
    const aElements = Array.from(eElements) as HTMLInputElement[];
    const valueSet = aElements.map(
      (el: HTMLInputElement | HTMLTextAreaElement) => {
        // console.log(el);
        if (el.name) {
          return { [el.name]: el.value };
        }
        return {};
      }
    );
    const values = valueSet.reduce((acc, pair) => {
      return Object.assign(acc, pair);
    }, {});
    // console.log(index, values);
    const entries: TimeEntry[] = this.state.entries;
    entries[index] = new TimeEntry(values);
    this.setState({
      entries,
    });
    this.context.getDay(this.props.date).updateEntries(this.state.entries);
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
        this.context.getDay(this.props.date).updateEntries(entries);
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
        this.context.getDay(this.props.date).updateEntries(entries);
      }
    );
  }

  makeEditable(e: Event, index: number, yesNo: boolean) {
    const editable = this.state.editable;
    // @ts-ignore
    editable[index] = yesNo;
    this.setState({
      editable,
    });
  }

  remove(index: number, te: TimeEntry) {
    this.context.getCurrentEntries().remove(index);
  }
}
