import { Entries } from '../state/entries';
import { DayProvider } from '../state/DayProvider';
import { DayPicker } from '../components/DayPicker';
import { DayTimeline } from '../components/DayTimeline';
import { DayChart } from '../components/DayChart';
import { DayTable } from '../table/DayTable';
import Delayed from '../components/delayed';
import { ExtractWeekData } from '../stats/extract-week-data';
import moment from 'moment';
import { WeekTotal } from '../stats/WeekTotal';
import { MonthTotal } from '../stats/MonthTotal';
import React from 'react';

export default function MainPage(props: {
	date: Date;
	setDate: (date: Date) => void;
	day: Entries;
	appState: DayProvider;
}) {
	return (
		<>
			<DayPicker date={props.date} setDate={props.setDate} />
			<DayTimeline date={props.date} setDate={props.setDate} />
			<DayChart workEntries={props.day.state.entries} />
			<DayTable
				date={props.date}
				day={props.day}
				appState={props.appState}
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
						monday={moment(props.date).startOf('week')}
						dayProvider={props.appState}
					>
						{(dateRange) => (
							<WeekTotal
								date={props.date}
								dateRange={dateRange}
							/>
						)}
					</ExtractWeekData>
					<ExtractWeekData
						monday={moment(props.date).startOf('month')}
						dayProvider={props.appState}
					>
						{(dateRange) => (
							<MonthTotal
								date={props.date}
								dateRange={dateRange}
							/>
						)}
					</ExtractWeekData>
				</Delayed>
			</div>
		</>
	);
}
