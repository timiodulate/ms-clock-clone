const TrackFocusSection = () => {
	const percent = 50;

	return (
		<main className="components-section">
			<CircleProgress
				percent={percent}
				circleWidth={"220px"}
			></CircleProgress>
		</main>
	);
};

export default TrackFocusSection;

interface circleProgress {
	circleWidth?: any;
	percent?: any;
	content?: any;
	children?;
}

const CircleProgress = ({ circleWidth, percent, children }: circleProgress) => {
	const deg = (360 / 100) * percent;

	const style = {
		"--circle-width": circleWidth ? circleWidth : "200px",
		"--content-color": "red",
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
