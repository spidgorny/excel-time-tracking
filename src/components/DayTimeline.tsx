import React from 'react';
import moment from 'moment';
import './DayTimeline.scss';

interface Props {
	date: Date;
	setDate: (date: Date) => void;
}

export class DayTimeline extends React.Component<Props, {}> {
	// static contextType = GlobalContext;
	// @ts-ignore
	// context: AppState;
	context: undefined;

	myInput: any;

	constructor(props: any) {
		super(props);
		this.myInput = React.createRef();
	}

	get range() {
		if (this.myInput.current) {
			return Math.round(this.myInput.current.offsetWidth / 32 / 2) - 1;
		}
		return 10;
	}

	keydownHandler(e: KeyboardEvent) {
		//console.log(e.key, e.ctrlKey, e.metaKey);
		const ctrl = (e.ctrlKey || e.metaKey) && e.shiftKey;
		if (ctrl && e.key === 'ArrowLeft') {
			// @ts-ignore
			this.dayClick(
				(e as unknown) as React.MouseEvent,
				moment(this.props.date).subtract('1', 'day'),
			);
		}
		if (ctrl && e.key === 'ArrowRight') {
			// @ts-ignore
			this.dayClick(
				(e as unknown) as React.MouseEvent,
				moment(this.props.date).add('1', 'day'),
			);
		}
	}

	componentDidMount(): void {
		document.addEventListener('keydown', this.keydownHandler.bind(this));
		console.log('width', this.myInput.current.offsetWidth, 'rerender');
		if (this.myInput.current) {
			window.addEventListener('resize', this.handleResize.bind(this));
		}

		this.forceUpdate(); // width calculated - re-render with dates
	}

	componentWillUnmount(): void {
		document.removeEventListener('keydown', this.keydownHandler.bind(this));
		window.removeEventListener('resize', this.handleResize.bind(this));
	}

	handleResize() {
		console.log('resize');
		this.forceUpdate();
	}

	render() {
		const days = [];
		const today = moment(this.props.date);
		for (let i = -this.range; i <= this.range; i++) {
			days.push(today.clone().add(i, 'days'));
		}

		if (!this.myInput.current) {
			return (
				<div
					className="d-flex justify-content-center mb-3"
					ref={this.myInput}
				/>
			);
		}

		return (
			<div
				className="d-flex justify-content-center mb-3"
				ref={this.myInput}
			>
				{days.map((day) => {
					const isWeekend = [6, 7].includes(day.isoWeekday())
						? 'weekend'
						: '';
					const isToday = day.isSame(this.props.date, 'day')
						? 'today'
						: '';
					let dayBox = (
						<div
							className={
								'dayBox border text-center align-baseline ' +
								[isWeekend, isToday].join(' ')
							}
							key={day.toISOString()}
						>
							{day.format('DD')}
						</div>
					);
					if (day.isSame(this.props.date, 'day')) {
						return dayBox;
					}
					return (
						<a
							href={'/day/' + day.format('YYYY-MM-DD')}
							onClick={(e) => this.dayClick(e, day)}
							style={{ textDecoration: 'none' }}
							key={day.toISOString()}
						>
							{dayBox}
						</a>
					);
				})}
			</div>
		);
	}

	dayClick(e: React.MouseEvent, date: moment.Moment) {
		e.preventDefault();
		this.props.setDate(date.toDate());
	}
}
