import { useCallback, useEffect, useState } from 'react';
import { TimeEntry } from '../model/TimeEntry';
import { Entries } from '../state/entries';

export default function ClipboardHandler(props: { day: Entries }) {
	const [clipboard, setClipboard] = useState([] as TimeEntry[]);

	const escFunction = useCallback(
		(event: KeyboardEvent) => {
			if (event.key.toLowerCase() === 'c' && event.ctrlKey) {
				console.log('Ctrl-C');
				let timeEntries = props.day.state.entries;
				setClipboard(timeEntries.slice());
				console.log(timeEntries, clipboard);
			} else if (event.key.toLowerCase() === 'v' && event.ctrlKey) {
				console.log('Ctrl-V');
				if (!clipboard) {
					console.log('clipboard is empty');
					return;
				}
				if (props.day.state.entries.length) {
					// throw new Error("Overwriting is dangerous");
					console.warn('Overwriting is dangerous');
					return;
				}
				console.log(clipboard);
				props.day.updateEntries(clipboard.slice());
			} else if (event.key && event.key !== 'Control') {
				// console.log(
				//   event.ctrlKey ? "Ctrl" : "",
				//   event.altKey ? "Alt" : "",
				//   event.shiftKey ? "Shift" : "",
				//   event.key
				// );
			}
		},
		[props.day, clipboard],
	);

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [props.day, clipboard, escFunction]);

	return <></>;
}
