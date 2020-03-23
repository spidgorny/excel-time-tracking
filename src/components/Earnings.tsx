import React from "react";
import {AppState} from "../state/AppState";
import {GlobalContext} from "../state/GlobalContext";

const currencies = require('country-currency');

export class Earnings extends React.Component<{
	hours: number;
}, {}> {

	static contextType = GlobalContext;
	// @ts-ignore
	context: AppState;

	render() {
		const byCountry = currencies.byCountry();
		let countryCode = navigator.language.substr(3);
		const currency = byCountry.get(countryCode);
		// console.log(countryCode, currency);
		const rate = this.context.rate;

		const amount = this.props.hours * rate;
		const result = new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency,
		}).format(amount);
		return (
			<>
				{result}
			</>
		);
	}
}
