import React from "react";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";
import {TimeEntry} from "../model/TimeEntry";


import moment from "moment";
import "./DayTimeline.scss";

interface IDayTimelineState {
}
interface IDayTimelineProps {
	date: Date;
	setDate: (date: Date) => void;
	workEntries: TimeEntry[];
}
export class DayTimeline extends React.Component<IDayTimelineProps, IDayTimelineState> {

  // static contextType = GlobalContext;
  // @ts-ignore
  // context: AppState;
  context: undefined;

	state: IDayTimelineState = {};
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
		return (
			<div className="mb-3" style={{position: "relative", height: '1.55em', border: "solid 1px silver"}}>
				<div style={{position: "absolute", top: 0, left: 0, width: '100%'}}>
					<div className="d-flex justify-content-between">
						{Array.from(new Array(24), (x, i) => i).map(hr => {
							return <div key={hr} style={{
								borderRight: "solid 1px silver",
								color: "silver",
								flex: "1 1 0px",
								height: '1.5em',
								textAlign: "center"
							}}>
								{hr % 2 == 0 ? hr : null}
							</div>;
						})}
					</div>
				</div>
				<div style={{position: "absolute", top: 0, left: 0, width: '100%'}}>
					{this.props.workEntries.map(entry => {
						const start = entry.getStartMoment();
						const end = entry.getEndMoment();
						const duration = end.diff(start, 'minutes');
						const width = duration / 24 / 60 * 100;

						const mmtMidnight = start.clone().startOf('day');
						const offset = start.diff(mmtMidnight, 'minutes') / 24 / 60 * 100;
						return <div key={entry.start} style={{
							background: "#009ACD",
							height: '1.5em',
							width: width + '%',
							position: 'absolute',
							left: offset + '%',
							top: 0,
							opacity: 0.5,
						}}/>
				})}
			</div>
			</div>
		);
	}

  dayClick(e: React.MouseEvent, date: moment.Moment) {
    e.preventDefault();
    // this.context.setDate(date.toDate());
    this.props.setDate(date.toDate());
  }
}
