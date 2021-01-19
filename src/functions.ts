import moment, { Duration } from 'moment';

export function inputElementsToMap(eElements: NodeListOf<HTMLInputElement>) {
	const aElements = Array.from(eElements) as HTMLInputElement[];
	const valueSet = aElements.map(
		(el: HTMLInputElement | HTMLTextAreaElement) => {
			// console.log(el);
			if (el.name) {
				return { [el.name]: el.value };
			}
			return {};
		},
	);
	const values = valueSet.reduce((acc, pair) => {
		return Object.assign(acc, pair);
	}, {});
	return values;
}

export function humanTime(input: Duration | number) {
	let duration: Duration;
	if (typeof input === 'object') {
		duration = input;
	} else {
		duration = moment.duration(input, 'hours');
	}
	let hh = duration.get('hours');
	let mm = duration.get('minutes');
	return (
		hh.toString().padStart(2, '0') + ':' + mm.toString().padStart(2, '0')
	);
}
