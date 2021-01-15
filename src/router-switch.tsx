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

export default function RouterSwitch(props: { date: Date; setDate: SetDate }) {
	const date = props.date;
	const setDate = props.setDate;
	return <></>;
	/*
		<Switch>
			<Route exact path="/">
				<DayPicker date={date} setDate={setDate} />
				<DayTimeline date={date} setDate={setDate} />
				<DayChart
					workEntries={
						this.state.appState.getCurrentEntries().entries
					}
				/>
				<GlobalContext.Provider value={appState}>
					<DayTable
						date={date}
						day={this.state.appState.getDay(date)}
						appState={this.state.appState}
					/>
					<div
						className="d-flex justify-content-between"
						style={{
							gap: 12,
						}}
					>
						<WeekTotal date={date} appState={this.state.appState} />
						<MonthTotal
							date={date}
							appState={this.state.appState}
						/>
					</div>
				</GlobalContext.Provider>
			</Route>
			<Route path="/report">
				<GlobalContext.Provider value={appState}>
					<Report
						date={date}
						getDay={appState.getDay.bind(appState)}
					/>
				</GlobalContext.Provider>
			</Route>
		</Switch>
	);
*/
}
