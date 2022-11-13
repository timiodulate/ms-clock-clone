import { BiCheck } from "react-icons/bi";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { TiTime } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
	setBreakSession,
	setFocusSession,
	toggleTodoTile,
} from "../../src/clock/features/pomodoroSlice";
import PomodoroLayout from "../../src/components/timer/PomodoroLayout";
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

	// default focus count = 3
	// number can be increased gaaan
	// to change it
	const setFocusSessionCount = (count) => {
		dispatch(setFocusSession({ count: count }));
	};
	const setBreakPeriodDuration = (time) => {
		dispatch(setBreakSession({ time: time }));
	};

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
											<select
												name="counts"
												id="actions"
												onChange={(e) =>
													setFocusSessionCount(
														e.target.value
													)
												}
												defaultValue={focusCount}
											>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
												<option value="9">9</option>
											</select>
										</div>
										<div>
											<div id="details">
												<h3>Break period duration</h3>
											</div>
											<select
												name="break-duration"
												id="actions"
												onChange={(e) =>
													setBreakPeriodDuration(
														e.target.value
													)
												}
											>
												<option value="5">
													5 minutes
												</option>
												<option value="10">
													10 minutes
												</option>
												<option value="15">
													15 minutes
												</option>
											</select>
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
