import { IoPencilSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CircleProgress } from "../../../components/_reusables";

const DailyProgressSection = () => {
	const isDailyProgressTileVisible = useSelector(
		(state: any) => state.pomodoroTimer.isDailyProgressTileVisible
	);
	const showStopWatchTile = useSelector(
		(state: any) => state.pomodoroTimer.showStopWatchTile
	);
	const dailyGoal = useSelector(
		(state: any) => state.pomodoroTimer.dailyGoal
	);
	const completedFocus = useSelector(
		(state: any) => state.pomodoroTimer.completedFocus
	);

	// const percent =
	// 	completedFocus >= dailyGoal ? 100 : (completedFocus * 100) / dailyGoal;
	const percent = 20;

	return (
		<section
			className={`daily-progress-section daily-progress-tile ${
				isDailyProgressTileVisible ? "" : "hide-tile"
			} ${showStopWatchTile ? "" : "move"}`}
		>
			<div className="section-header">
				<h1>Daily progress</h1>

				<div className="tile-actions">
					<button className="icon-container">
						<IoPencilSharp />
					</button>
				</div>
			</div>

			<div className="section-main">
				<div>
					<div className="yesterday progress-container">
						<h2>Yesterday</h2>

						<div className="time">
							<p>0</p>
							<p>minutes</p>
						</div>
					</div>
					<div className="daily">
						<CircleProgress
							percent={percent}
							circleWidth={"100%"}
							progressColor={"green"}
						>
							<div className="progress-container">
								<h2>Daily goal</h2>

								<div className="time">
									<p>{dailyGoal}</p>
									<p>minutes</p>
								</div>
							</div>
						</CircleProgress>
					</div>
					<div className="yesterday progress-container">
						<h2>Streak</h2>

						<div className="time">
							<p>0</p>
							<p>days</p>
						</div>
					</div>
				</div>
				<p>Completed: {completedFocus} minutes</p>
			</div>
		</section>
	);
};

export default DailyProgressSection;
