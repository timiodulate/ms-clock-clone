import { BsFillStopCircleFill } from "react-icons/bs";

const TrackFocusSection = ({
	updatePageState,
	updateState,
	sessionTime,
	currentSession,
	focusTime,
	totalBreakMin,
}: any) => {
	const percent =
		((sessionTime.min * 60 + sessionTime.secs) * 100) / (focusTime * 60);

	return (
		<section className="track-focus-section">
			<div>
				<CircleProgress
					percent={percent}
					circleWidth={"220px"}
					progressColor={"#227ded"}
				>
					<div>
						{sessionTime.min.toString().length == 2
							? sessionTime.min
							: "0" + sessionTime.min}
						:
						{sessionTime.secs.toString().length == 2
							? sessionTime.secs
							: "0" + sessionTime.secs}
					</div>
				</CircleProgress>

				<span
					onClick={() => {
						updateState("startFocus", false);
						updateState("currentSession", "focus");
						updatePageState("startStopwatch", false);
					}}
				>
					<BsFillStopCircleFill />
				</span>

				<p>
					Next:{" "}
					<b>
						{currentSession != "focus"
							? `${focusTime} mins focus`
							: `${totalBreakMin} mins break`}
					</b>
				</p>
			</div>

			{/* <div>
				<div>
					<h2>Total Time Used</h2>
				</div>
				<div>
					<h2>Total Focus Time</h2>
					<div>
						<div>{focusMin}</div>
						<div>{focusSecs}</div>
					</div>
				</div>
				<div>
					<h2>Total Break Time</h2>
					<div></div>
				</div>
				<div>
					<h2>Total Pauses Time</h2>
					<div></div>
				</div>
			</div> */}
		</section>
	);
};

export default TrackFocusSection;

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
		"--content-color": "red",
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
