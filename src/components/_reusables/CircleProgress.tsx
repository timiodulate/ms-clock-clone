interface circleProgress {
	circleWidth?: any;
	percent?: any;
	content?: any;
	progressColor?: any;
	children?;
}

const CircleProgress = ({
	circleWidth,
	percent,
	children,
	progressColor,
}: circleProgress) => {
	const deg = (360 / 100) * percent;

	const style = {
		"--circle-width": circleWidth ? circleWidth : "200px",
		"--content-color": "black",
		"--progress-color": progressColor ? progressColor : "red",
	} as React.CSSProperties;

	return (
		<div className="circle-wrap" style={style}>
			<div className="circle">
				<div
					className="mask full"
					style={{ transform: `rotate(${deg / 2}deg)` }}
				>
					<div
						className="fill"
						style={{ transform: `rotate(${deg / 2}deg)` }}
					></div>
				</div>

				<div className="mask half">
					<div
						className="fill"
						style={{ transform: `rotate(${deg / 2}deg)` }}
					></div>
				</div>

				<div className="inside-circle">
					<span className="content">{children}</span>
				</div>
			</div>
		</div>
	);
};
export { CircleProgress };
