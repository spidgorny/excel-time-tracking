import { Entries } from '../state/entries';
import { DayProvider } from '../state/DayProvider';
import { DayChart } from '../components/DayChart';
import { DayTable } from '../table/DayTable';
import Delayed from '../components/delayed';
import { ExtractWeekData } from '../stats/extract-week-data';
import moment from 'moment';
import { WeekTotal } from '../stats/WeekTotal';
import { MonthTotal } from '../stats/MonthTotal';
import React from 'react';
import ClipboardHandler from '../table/clipboard-handler';

export default function MainPage(props: {
	date: Date;
	setDate: (date: Date) => void;
	dayData: Entries;
	appState: DayProvider;
}) {
	return (
		<>
			<DayChart workEntries={props.dayData.state.entries} />
			<DayTable
				date={props.date}
				day={props.dayData}
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
			<ClipboardHandler day={props.dayData} />
		</>
	);
}
