import { Moment } from 'moment';
import React from 'react';
import { DayProvider } from '../state/DayProvider';
import { Entries } from '../state/entries';

function ExtractWeekData1({
	monday,
	dayProvider,
	children,
}: {
	monday: Moment;
	dayProvider: DayProvider;
	children: (dateRange: Entries[]) => JSX.Element;
}) {
	function dateRange() {
		const dateRange = [];
		for (let i = 0; i < 7; i++) {
			const dayState = dayProvider.getDay(
				monday.clone().add(i, 'days').toDate(),
			);
			dateRange.push(dayState);
		}
		return dateRange;
	}

	return children(dateRange());
}

export const ExtractWeekData = React.memo(
	ExtractWeekData1,
	(a, b) => a.monday.toISOString() === b.monday.toISOString(),
);
