import React from 'react';
import { DayProvider } from '../state/DayProvider';
import { GlobalContext } from '../state/GlobalContext';

const currencies = require('country-currency');

interface Props {
	rate: number;
	hours: number;
}

export class Earnings extends React.Component<Props, {}> {
	static contextType = GlobalContext;
	// @ts-ignore
	context: DayProvider;

	render() {
		const byCountry = currencies.byCountry();
		let countryCode = navigator.language.substr(3);
		const currency = byCountry.get(countryCode);
		// console.log(countryCode, currency);
		const rate = this.props.rate;

		const amount = this.props.hours * rate;
		const result = new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency,
		}).format(amount);
		return <span onClick={this.askPrice.bind(this)}>{result}</span>;
	}

	askPrice() {
		const price = prompt('Price per Hour?');
		if (!price) {
			return;
		}
		const iPrice = parseFloat(price);
		if (!iPrice) {
			return;
		}
		this.context.setRate(iPrice);
	}
}
