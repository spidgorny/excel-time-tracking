import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { DayProvider } from './state/DayProvider';
import { DateState, SetDate } from './state/DateState';
import { Entries } from './state/entries';
import Layout from './page/layout';
import HandleSave from './table/handle-save';

export const history = createBrowserHistory();
export var DateContext = React.createContext(new Date());

export class App extends React.Component<any, any> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	state: {} = {};

	render() {
		return (
			<DateState>
				{(date: Date, setDate: SetDate, dateState: DateState) => (
					<DayProvider date={date}>
						{(day: Entries, dayProvider: DayProvider) => (
							<Router history={history}>
								<Layout
									date={date}
									dayData={day}
									setDate={setDate}
									dayProvider={dayProvider}
									dateState={dateState}
								/>
								<HandleSave dayProvider={dayProvider} />
							</Router>
						)}
					</DayProvider>
				)}
			</DateState>
		);
	}
}

export default App;
