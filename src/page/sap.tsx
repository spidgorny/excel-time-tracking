import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { Entries } from '../state/entries';
import { Earnings } from '../components/Earnings';
import { humanTime } from '../functions';

interface IReportProps {
	date: Date;
	getDay: (date: Date) => Entries;
}

interface IReportState {}

export class SAP extends React.Component<IReportProps, IReportState> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	render() {
		let startOfWeek = moment(this.props.date).startOf('isoWeek'); // start with monday
		const days = Array.from(new Array(7), (x, i) =>
			moment(startOfWeek).add(i, 'days'),
		);
		// console.log(days.map((m) => m.format('YYYY-MM-DD')));

		const dataMap: Record<string, number> = {};
		for (let date of days) {
			const dayRepo: Entries = this.props.getDay(date.toDate());
			const hours = dayRepo.sumHours ? dayRepo.sumHours + 1 : 0;
			dataMap[date.format('YYYY-MM-DD')] = hours;
		}

		return (
			<>
				<h3>#{startOfWeek.week()}</h3>
				<Table as="table">
					{Object.entries(dataMap).map(([date, sumHours]) => (
						<col
							key={date}
							style={{
								background:
									moment(this.props.date).format(
										'YYYY-MM-DD',
									) === date
										? '#abc'
										: [7, 6].includes(
												moment(date).isoWeekday(),
										  )
										? '#eee'
										: 'inherit',
							}}
						/>
					))}
					<thead>
						<tr>
							{Object.entries(dataMap).map(([date, sumHours]) => (
								<td key={date}>{moment(date).format('ddd')}</td>
							))}
						</tr>
						<tr>
							{Object.entries(dataMap).map(([date, sumHours]) => (
								<td key={date}>{date}</td>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{Object.entries(dataMap).map(([date, sumHours]) => {
								if (!sumHours) {
									return <td />;
								}
								const startTime = 9; // 09:00
								const beforeLunch =
									sumHours > 6
										? '13:00'
										: humanTime(startTime + sumHours);
								const afterLunch1 =
									sumHours > 6 ? humanTime(14) : null;
								const afterLunch2 =
									sumHours > 6
										? humanTime(14 + sumHours - 4)
										: null;
								return (
									<td key={date}>
										<div>
											{humanTime(startTime)} -{' '}
											{beforeLunch}
										</div>
										<div>
											{afterLunch1} - {afterLunch2}
										</div>
									</td>
								);
							})}
						</tr>
					</tbody>
					<tfoot>
						<tr>
							{Object.entries(dataMap).map(([date, sumHours]) => (
								<td className="">
									&Sigma; {humanTime(sumHours)}
								</td>
							))}
						</tr>
					</tfoot>
				</Table>
			</>
		);
	}
}
