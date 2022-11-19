import CircleProgress from "js-circle-progress";

interface circleProgress {
	circleWidth?: any;
	percent?: any;
	content?: any;
	progressColor?: any;
	children?;
}

import { useEffect } from "react";

const CircleProgress3 = ({
	circleWidth,
	percent,
	children,
	progressColor,
}: circleProgress) => {
	useEffect(() => {
		const cp = new CircleProgress(".circle-progress-3", {
			value: 50,
			max: 100,
		});
	}, []);

	const deg = (360 / 100) * percent;

	const style = {
		"--circle-width": circleWidth ? circleWidth : "200px",
		"--content-color": "black",
		"--progress-color": progressColor ? progressColor : "red",
		"--clr": "#04fc43",
		"--num": 85,
	} as React.CSSProperties;

	return <div className="circle-progress-3"></div>;
};
export { CircleProgress3 };
