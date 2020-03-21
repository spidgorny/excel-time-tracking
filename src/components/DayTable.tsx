import React from "react";
import Table from "react-bootstrap/Table";

export class DayTable extends React.Component<{}, {}> {

	render() {
		return (
			<div>
				<Table>
					<thead>
					<tr>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Duration</th>
						<th>Earnings</th>
						<th>Comment</th>
					</tr>
					</thead>
					<tbody>

					</tbody>
				</Table>
			</div>
		);
	}
}
