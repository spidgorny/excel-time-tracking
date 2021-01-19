import { Route, Switch } from 'react-router-dom';
import { Report } from './page/Report';
import React from 'react';
import { SetDate } from './state/DateState';
import { DayProvider } from './state/DayProvider';
import { Entries } from './state/entries';
import MainPage from './page/main-page';
import { SAP } from './page/sap';

interface Props {
	date: Date;
	setDate: SetDate;
	dayData: Entries;
	dayProvider: DayProvider;
}

export default function RouterSwitch(props: Props) {
	const date = props.date;
	const setDate = props.setDate;
	return (
		<Switch>
			<Route exact path="/">
				<MainPage
					date={date}
					setDate={setDate}
					dayData={props.dayData}
					appState={props.dayProvider}
				/>
			</Route>
			<Route path="/report">
				<Report
					date={date}
					getDay={props.dayProvider.getDay.bind(props.dayProvider)}
				/>
			</Route>
			<Route path="/sap">
				<SAP
					date={date}
					getDay={props.dayProvider.getDay.bind(props.dayProvider)}
				/>
			</Route>
		</Switch>
	);
}
