import React from 'react';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { Entries } from '../state/entries';

interface IReportProps {
	date: Date;
	getDay: (date: Date) => Entries;
}

interface IReportState {}

export class Report extends React.Component<IReportProps, IReportState> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	state: IReportState = {};

	render() {
		let daysInMonth = moment(this.props.date).daysInMonth();
		const days = Array.from(new Array(daysInMonth), (x, i) => i + 1);
		//console.log(days);
		return (
			<div>
				{days.map((day) => {
					const date = moment(this.props.date)
						.startOf('month')
						.date(day);
					let dayRepo = this.props.getDay(date.toDate());
					return (
						<>
							<h3 key={day}>
								{date.format('YYYY-MM-DD')}
								{dayRepo.sumTime.asHours() === 0
									? null
									: ': ' +
									  dayRepo.sumTime.asHours().toFixed(2) +
									  ' h'}
							</h3>
							<Table as="table">
								<tbody>
									{dayRepo.state.entries.map((entry) => {
										return (
											<tr>
												<td>{entry.start}</td>
												<td>{entry.end}</td>
												<td>
													{entry.duration
														.asHours()
														.toFixed(2)}{' '}
													h
												</td>
												<td>{entry.comment}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</>
					);
				})}
			</div>
		);
	}
}
