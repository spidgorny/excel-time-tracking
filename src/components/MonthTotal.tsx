import React from 'react';
import moment from 'moment';
import { WeekTotalComponent } from './WeekTotal';
// @ts-ignore
// import debounceRender from 'react-debounce-render';

export class MonthTotalComponent extends WeekTotalComponent {
	get title() {
		let month = moment(this.props.date);
		return <h5>Month {month.format('YYYY-MM')} total</h5>;
	}
}

// export const MonthTotal = debounceRender(MonthTotalComponent);
export const MonthTotal = React.memo(MonthTotalComponent);
