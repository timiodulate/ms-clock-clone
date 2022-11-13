import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllSessions,
	getCurrentSession,
	setBreakSession,
	toggleDailyProgressTile,
	toggleFocusSession,
	toggleSkipBreaks,
	toggleStopWatch,
	toggleStopWatchTile,
	updateDailyProgress,
} from "../../clock/features/pomodoroSlice";
import { BsFillStopCircleFill, BsThreeDots } from "react-icons/bs";
import { CircleProgress } from "../_reusables/CircleProgress";
import { BiDotsHorizontal } from "react-icons/bi";
import CCheckbox from "../_reusables/CCheckbox";
import { TbTree } from "react-icons/tb";
import CMenuContainer from "../_reusables/CMenu";
import { useVisibility } from "../../utils/useVisibility";

const TrackFocusSection = () => {
	const { isVisible, toggle } = useVisibility();
	const dispatch = useDispatch();

	const sessionDetails = useSelector(
		(state: any) => state.pomodoroTimer.allSessions
	);
	const currentPeriodDetails = useSelector(
		(state: any) => state.pomodoroTimer.currentSessionDetails
	);
	const focusSessionIsOn = useSelector(
		(state: any) => state.pomodoroTimer.focusSessionIsOn
	);
	const skipBreaks = useSelector(
		(state: any) => state.pomodoroTimer.skipBreaks
	);
	const focusSession = useSelector(
		(state: any) => state.pomodoroTimer.focusSession
	);
	const breakSession = useSelector(
		(state: any) => state.pomodoroTimer.breakSession
	);
	const showStopWatchTile = useSelector(
		(state: any) => state.pomodoroTimer.showStopWatchTile
	);
	const isDailyProgressTileVisible = useSelector(
		(state: any) => state.pomodoroTimer.isDailyProgressTileVisible
	);

	const [interv, setInterv] = useState(null);
	const [sessionTime, setSessionTime] = useState({ min: 0, secs: 0 });
	const [showRemainingTime, setShowRemainingTime] = useState(true);

	useEffect(() => {
		if (focusSessionIsOn) {
			if (
				sessionDetails.length > 0 ||
				currentPeriodDetails.sessionTime != 0
			) {
				const now = new Date();

				let totalSessionMin =
					now.valueOf() +
					currentPeriodDetails.sessionTime * 1000 * 60;

				const interval = setInterval(() => {
					const now = new Date();

					const difference = totalSessionMin - now.getTime();

					const m = Math.floor(
						(difference % (1000 * 60 * 60)) / (1000 * 60)
					);

					const s = Math.floor((difference % (1000 * 60)) / 1000);

					setSessionTime({ min: m, secs: s });

					if (m === 0 && s === 0) {
						dispatch(updateDailyProgress());
						return dispatch(getCurrentSession(false));
					}
				});

				setInterv(interval);

				return () => clearInterval(interval);

				// startCountDown: (state) => {
				// 	let ade = setInterval(() => {
				// 		let countdown: moment.Duration | any = moment.duration(
				// 			state.future.diff(moment())
				// 		);

				// 		state.countdownTime = {
				// 			h: countdown._data.hours,
				// 			m: countdown._data.minutes,
				// 			s: countdown._data.seconds,
				// 			ms: countdown._data.milliseconds,
				// 		};
				// 	}, 100);
				// },
			} else {
				clearInterval(interv);

				dispatch(toggleFocusSession());
			}
			return () => clearInterval(interv);
		}
	}, [focusSessionIsOn, currentPeriodDetails]);

	const currentIsFocusPeriod = currentPeriodDetails.sessionTitle == "focus";

	const nextIsFocusPeriod = sessionDetails[0].sessionTitle == "focus";

	const completedFocusPeriods =
		focusSession.count -
		sessionDetails.filter((detail) => {
			if (detail.sessionTitle == "focus") {
				return detail;
			}
		}).length;

	const percent =
		((sessionTime.min * 60 + sessionTime.secs) * 100) /
		(currentPeriodDetails.sessionTime * 60);

	const toggleRemainingTime = (e: any) => {
		setShowRemainingTime(!showRemainingTime);
	};

	const toggleBreaks = (e: any) => {
		dispatch(toggleSkipBreaks());
		dispatch(getAllSessions());
		dispatch(getCurrentSession(true));
	};

	return (
		<section className="track-focus-section track-focus-tile">
			<div className="section-header">
				<h1>
					{currentIsFocusPeriod ? (
						<>
							Focus period{" "}
							<span>
								{`(${completedFocusPeriods} of
								${focusSession.count})`}
							</span>
						</>
					) : (
						<>Break</>
					)}
				</h1>

				<CMenuContainer className="tile-actions">
					<CMenuContainer.Toggler
						className="icon-container"
						toggle={toggle}
					>
						<BsThreeDots />
					</CMenuContainer.Toggler>
				</CMenuContainer>
			</div>

			<div className="section-main">
				<CircleProgress
					percent={percent}
					circleWidth={"220px"}
					progressColor={"#227ded"}
				>
					{showRemainingTime ? (
						<div>
							{sessionTime.min.toString().length == 2
								? sessionTime.min
								: "0" + sessionTime.min}
							:
							{sessionTime.secs.toString().length == 2
								? sessionTime.secs
								: "0" + sessionTime.secs}
						</div>
					) : (
						<div>
							<TbTree />
						</div>
					)}
				</CircleProgress>

				<div className="actions">
					<button
						onClick={() => {
							dispatch(toggleFocusSession());
							dispatch(toggleStopWatch(false));
						}}
					>
						<BsFillStopCircleFill />
					</button>

					<CMenuContainer className="menu-container">
						<CMenuContainer.Toggler
							className="icon-container"
							toggle={toggle}
						>
							<BiDotsHorizontal />
						</CMenuContainer.Toggler>

						<CMenuContainer.Menu
							isVisible={isVisible}
							toggle={toggle}
						>
							<li onClick={toggle}>
								<CCheckbox
									id="show-time-remaining-toggle"
									onChange={(e) => toggleRemainingTime(e)}
									checked={showRemainingTime}
								>
									Show time remaining
								</CCheckbox>
							</li>
							<li
								className={`skip-breaks-toggle ${
									breakSession.count == 0 ? "disabled" : ""
								}`}
								onClick={toggle}
							>
								<CCheckbox
									id="break-toggle"
									disabled={focusSession.count - 1 == 0}
									checked={skipBreaks}
									onChange={(e) => toggleBreaks(e)}
								>
									Skip breaks
								</CCheckbox>
							</li>
							<li onClick={toggle}>
								<CCheckbox
									id="track-with-pauses"
									checked={showStopWatchTile}
									onChange={(e: any) =>
										dispatch(toggleStopWatchTile())
									}
								>
									Show total time used
								</CCheckbox>
							</li>
							<li onClick={toggle}>
								<CCheckbox
									id="daily-progress-toggle"
									checked={isDailyProgressTileVisible}
									onChange={(e: any) =>
										dispatch(toggleDailyProgressTile())
									}
								>
									Show daily progress tile
								</CCheckbox>
							</li>
						</CMenuContainer.Menu>
					</CMenuContainer>
				</div>

				{sessionDetails.length != 0 && (
					<p>
						Up next:{" "}
						<b>
							{`${sessionDetails[0].sessionTime} mins ${
								nextIsFocusPeriod ? "focus session" : "break"
							}`}
						</b>
					</p>
				)}
			</div>
		</section>
	);
};

export default TrackFocusSection;
