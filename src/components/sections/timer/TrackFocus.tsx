import { BsFillStopCircleFill } from "react-icons/bs";

const TrackFocusSection = ({
	sessionTime,
	updateState,
	currentSession,
	focusTime,
	totalBreakMin,
}: any) => {
	return (
		<section className="track-focus-section">
			<div>
				<div>
					{sessionTime.min.toString().length == 2
						? sessionTime.min
						: "0" + sessionTime.min}
					:
					{sessionTime.secs.toString().length == 2
						? sessionTime.secs
						: "0" + sessionTime.secs}
				</div>

				<span
					onClick={() => {
						updateState("startFocus", false);
						updateState("currentSession", "focus");
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
