import { useCallback, useEffect } from 'react';

export default function KeyNav(props: {
	incDate: () => void;
	decDate: () => void;
}) {
	const escFunction = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft' && event.ctrlKey) {
				console.log('Ctrl-Left');
				props.decDate();
			} else if (event.key === 'ArrowRight' && event.ctrlKey) {
				props.incDate();
			} else if (event.key && event.key !== 'Control') {
				// console.log(
				//   event.ctrlKey ? "Ctrl" : "",
				//   event.altKey ? "Alt" : "",
				//   event.shiftKey ? "Shift" : "",
				//   event.key
				// );
			}
		},
		[props],
	);

	useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [props, escFunction]);

	return <></>;
}
