import { BiCheck } from "react-icons/bi";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { TiTime } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
	setBreakSession,
	setFocusSession,
	toggleDailyProgressTile,
	toggleTodoTile,
} from "../../src/clock/features/pomodoroSlice";
import PomodoroLayout from "../../src/components/timer/PomodoroLayout";
import CSelect from "../../src/components/_reusables/CSelect";
import CToggle from "../../src/components/_reusables/CToggle";
import { useVisibility } from "../../src/utils/useVisibility";

const IndexPage = () => {
	const { isVisible, toggle } = useVisibility();

	const dispatch = useDispatch();

	const focusCount = useSelector(
		(state: any) => state.pomodoroTimer.focusSession.count
	);
	const breakDuration = useSelector(
		(state: any) => state.pomodoroTimer.breakSession.time
	);
	const isTodoTileVisible = useSelector(
		(state: any) => state.pomodoroTimer.isTodoTileVisible
	);
	const isDailyProgressTileVisible = useSelector(
		(state: any) => state.pomodoroTimer.isDailyProgressTileVisible
	);

	const setFocusSessionCount = (count) => {
		dispatch(setFocusSession({ count: count }));
	};
	const setBreakPeriodDuration = (time) => {
		dispatch(setBreakSession({ time: time }));
	};

	const focusCountOptions = [
		{ "1": 1 },
		{ "2": 2 },
		{ "3": 3 },
		{ "4": 4 },
		{ "5": 5 },
		{ "6": 6 },
		{ "7": 7 },
		{ "8": 8 },
		{ "9": 9 },
	];
	const breakDurationOptions = [
		{
			"5 minutes": 5,
		},
		{ "10 minutes": 10 },
		{ "15 minutes": 15 },
	];

	return (
		<PomodoroLayout>
			<main className="settings-page">
				<h1>Settings</h1>

				<div className="sections-container">
					<div className="settings-sections-container">
						<section className="focus-settings">
							<h2>Focus sessions</h2>

							<div className="settings-container">
								<div className="setting-container">
									<div className="primary-setting">
										<span
											className="icon-container"
											id="icon"
										>
											<TiTime />
										</span>
										<div id="details">
											<h3>Focus periods</h3>
											<p>
												Adjust the count of focus time,
												or breaks as fit your needs.
											</p>
										</div>
										<button
											className="icon-container dropdown-toggle"
											id="toggler"
											onClick={toggle}
										>
											{isVisible ? (
												<BsCaretUp />
											) : (
												<BsCaretDown />
											)}
										</button>
									</div>
									<div
										className={`secondary-settings ${
											isVisible ? "show" : ""
										}`}
									>
										<div>
											<div id="details">
												<h3>Focus session count</h3>
											</div>
											<CSelect
												name="counts"
												id="actions"
												onChange={(e) =>
													setFocusSessionCount(
														e.target.value
													)
												}
												defaultValue={focusCount}
												data={focusCountOptions}
											/>
										</div>
										<div>
											<div id="details">
												<h3>Break period duration</h3>
											</div>
											<CSelect
												name="break-duration"
												id="actions"
												onChange={(e) =>
													setBreakPeriodDuration(
														e.target.value
													)
												}
												defaultValue={breakDuration}
												data={breakDurationOptions}
											/>
										</div>
									</div>
								</div>

								<div className="setting-container">
									<div className="primary-setting">
										<span
											className="icon-container"
											id="icon"
										>
											<BiCheck />
										</span>

										<div id="details">
											<h3>To Do</h3>
											<p>
												Show tile in the focus session
												experience
											</p>
										</div>

										<CToggle
											onChange={() => {
												dispatch(toggleTodoTile());
											}}
											checked={isTodoTileVisible}
										>
											{isTodoTileVisible ? "On" : "Off"}
										</CToggle>
									</div>
								</div>
								<div className="setting-container">
									<div className="primary-setting">
										<span
											className="icon-container"
											id="icon"
										>
											<BiCheck />
										</span>

										<div id="details">
											<h3>Daily Progress</h3>
											<p>
												Show tile in the focus session
												experience
											</p>
										</div>

										<CToggle
											onChange={() => {
												dispatch(
													toggleDailyProgressTile()
												);
											}}
											checked={isDailyProgressTileVisible}
										>
											{isDailyProgressTileVisible
												? "On"
												: "Off"}
										</CToggle>
									</div>
								</div>
							</div>
						</section>
					</div>

					<section className="about-app">
						<p>About this app</p>
						<p>@ 2022 Timiodulate. All rights reserved.</p>
					</section>
				</div>
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;
