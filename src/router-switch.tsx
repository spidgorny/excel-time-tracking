import { Route, Switch } from 'react-router-dom';
import { DayPicker } from './components/DayPicker';
import { DayTimeline } from './components/DayTimeline';
import { DayChart } from './components/DayChart';
import { GlobalContext } from './state/GlobalContext';
import { DayTable } from './components/DayTable';
import { WeekTotal } from './components/WeekTotal';
import { MonthTotal } from './components/MonthTotal';
import { Report } from './page/Report';
import React from 'react';
import { SetDate } from './state/DateState';
import { DayProvider } from './state/DayProvider';
import { DaysState } from './state/DaysState';
import Delayed from './components/delayed';
import moment from 'moment';
import { ExtractWeekData } from './stats/extract-week-data';

interface Props {
	date: Date;
	setDate: SetDate;
	day: DaysState;
	dayProvider: DayProvider;
}

export default function RouterSwitch(props: Props) {
	const date = props.date;
	const setDate = props.setDate;
	return (
		<Switch>
			<Route exact path="/">
				<DayPicker date={date} setDate={setDate} />
				<DayTimeline date={date} setDate={setDate} />
				<DayChart workEntries={props.day.entries} />
				<DayTable
					date={date}
					day={props.day}
					appState={props.dayProvider}
				/>
				<div
					className="d-flex justify-content-between"
					style={{
						gap: 12,
					}}
				>
					{/*<SlowComponentSameProps*/}
					{/*	prop={moment().hour() + ':' + moment().minute()}*/}
					{/*/>*/}
					<Delayed>
						<ExtractWeekData
							monday={moment(date).startOf('week')}
							dayProvider={props.dayProvider}
						>
							{(dateRange) => (
								<WeekTotal date={date} dateRange={dateRange} />
							)}
						</ExtractWeekData>
						<ExtractWeekData
							monday={moment(date).startOf('month')}
							dayProvider={props.dayProvider}
						>
							{(dateRange) => (
								<MonthTotal date={date} dateRange={dateRange} />
							)}
						</ExtractWeekData>
					</Delayed>
				</div>
			</Route>
			<Route path="/report">
				<GlobalContext.Provider value={props.dayProvider}>
					<Report
						date={date}
						getDay={props.dayProvider.getDay.bind(
							props.dayProvider,
						)}
					/>
				</GlobalContext.Provider>
			</Route>
		</Switch>
	);
}
