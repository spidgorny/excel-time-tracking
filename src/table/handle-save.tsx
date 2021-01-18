import { DayProvider } from '../state/DayProvider';
import { useCallback, useEffect } from 'react';
import moment from 'moment';
import { TimeEntry } from '../model/TimeEntry';

/// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
function downloadObjectAsJson(exportObj: object, exportName: string) {
	const dataStr =
		'data:text/json;charset=utf-8,' +
		encodeURIComponent(JSON.stringify(exportObj, null, 2));
	const downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', exportName + '.json');
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

export default function HandleSave(props: { dayProvider: DayProvider }) {
	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 's' && e.ctrlKey) {
			e.preventDefault();
			// console.log('Ctrl-S');
			const year = 2020;
			const yearDates: Date[] = [];
			let start = moment().year(year).startOf('year');
			// console.log('start', start.toISOString());
			const end = moment(start).add(1, 'year');
			// console.log('end', end.toISOString());
			// console.log('isBefore', start.isBefore(end));
			while (start.isBefore(end)) {
				yearDates.push(start.toDate());
				start = start.add(1, 'day');
			}
			console.log('yearDates', yearDates.length);
			const data: Record<string, TimeEntry[]> = {};
			for (const date of yearDates) {
				const entries = props.dayProvider.getDay(date);
				if (entries.state.entries.length) {
					data[
						moment(date).format('YYYY-MM-DD')
					] = entries.state.entries.slice();
				}
			}
			// console.log(data);
			downloadObjectAsJson(
				{
					signature: 'excel-time-tracking',
					year: year,
					data,
				},
				'excel-time-tracking-' + year,
			);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return <></>;
}
