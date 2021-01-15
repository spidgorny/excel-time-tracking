import React, { useState, useEffect } from 'react';

type Props = {
	children: React.ReactNode;
	waitBeforeShow?: number;
};

// https://stackoverflow.com/questions/30803440/delayed-rendering-of-react-components
const Delayed = ({ children, waitBeforeShow = 500 }: Props): JSX.Element => {
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsShown(true);
		}, waitBeforeShow);
	}, [waitBeforeShow]);

	return (isShown ? children : null) as JSX.Element;
};

export default Delayed;
