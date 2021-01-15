import moment, { Moment } from 'moment';
import React from 'react';
import { DayProvider } from '../state/DayProvider';
import { DaysState } from '../state/DaysState';

function ExtractMonthData1({
	theFirst,
	dayProvider,
	children,
}: {
	theFirst: Moment;
	dayProvider: DayProvider;
	children: (dateRange: DaysState[]) => JSX.Element;
}) {
	function dateRange() {
		const dateRange = [];
		for (let i = 0; i < theFirst.daysInMonth(); i++) {
			const dayState = dayProvider.getDay(
				theFirst.clone().add(i, 'days').toDate(),
			);
			dateRange.push(dayState);
		}
		// console.log(dateRange.length);
		return dateRange;
	}

	return children(dateRange());
}

export const ExtractMonthData = React.memo(
	ExtractMonthData1,
	(a, b) => a.theFirst.toISOString() === b.theFirst.toISOString(),
);
