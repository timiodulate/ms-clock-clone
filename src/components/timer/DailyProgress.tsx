import { IoPencilSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CircleProgress } from "../_reusables/CircleProgress";

const DailyProgressSection = () => {
	const showStopWatchTile = useSelector(
		(state: any) => state.pomodoroTimer.showStopWatchTile
	);

	return (
		<section
			className={`daily-progress-section ${
				showStopWatchTile ? "" : "move"
			}`}
		>
			<div className="section-header">
				<h1>Daily progress</h1>

				<button className="icon-container">
					<IoPencilSharp />
				</button>
			</div>

			<div className="section-main">
				<div className="yesterday progress-container">
					<h2>Yesterday</h2>

					<div className="time">
						<p>0</p>
						<p>minutes</p>
					</div>
				</div>
				<div className="daily">
					<CircleProgress
						percent={0}
						circleWidth={"150px"}
						progressColor={"#227ded"}
					>
						<div className="progress-container">
							<h2>Daily goal</h2>

							<div className="time">
								<p>0</p>
								<p>hour</p>
							</div>
						</div>
					</CircleProgress>

					<p>Completed: 0 minutes</p>
				</div>
				<div className="yesterday progress-container">
					<h2>Streak</h2>

					<div className="time">
						<p>0</p>
						<p>days</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DailyProgressSection;
