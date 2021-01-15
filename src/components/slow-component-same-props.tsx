import React from 'react';

function mySlowFunction(baseNumber: number) {
	console.time('mySlowFunction');
	let result = 0;
	for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
		result += Math.atan(i) * Math.tan(i);
	}
	console.timeEnd('mySlowFunction');
	return result;
}

function SlowComponentSameProps1({ prop }: { prop: string }) {
	console.time('SlowComponentSameProps ' + prop);
	mySlowFunction(10);
	console.timeEnd('SlowComponentSameProps ' + prop);

	return <>{prop}</>;
}

export const SlowComponentSameProps = React.memo(SlowComponentSameProps1);
