import { useEffect } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllSessions,
	getCurrentSession,
	setBreakSession,
	setFocusSession,
	toggleFocusSession,
	toggleSkipBreaks,
	toggleStopWatchTile,
} from "../../../features/pomodoroSlice";
import { useVisibility } from "../../../../utils/useVisibility";
import {
	CCheckbox,
	CLink,
	CMenuContainer,
} from "../../../../components/_reusables";

const SetFocusSection = () => {
	const dispatch = useDispatch();

	const focusSession = useSelector(
		(state: any) => state.pomodoroTimer.focusSession
	);
	const breakSession = useSelector(
		(state: any) => state.pomodoroTimer.breakSession
	);
	const skipBreaks = useSelector(
		(state: any) => state.pomodoroTimer.skipBreaks
	);
	const showStopWatchTile = useSelector(
		(state: any) => state.pomodoroTimer.showStopWatchTile
	);

	useEffect(() => {
		dispatch(setBreakSession({ count: focusSession.count - 1 }));
	}, []);

	const changeFocusTime = (event: "increase" | "reduce") => {
		if (event === "increase") {
			focusSession.time != 240 &&
				dispatch(setFocusSession({ time: focusSession.time + 15 }));
		} else {
			focusSession.time != 15 &&
				dispatch(setFocusSession({ time: focusSession.time - 15 }));
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		dispatch(getAllSessions());
		dispatch(getCurrentSession(false));

		dispatch(toggleFocusSession());
	};

	const { isVisible, toggle } = useVisibility();
	// const { elementRef, isVisible, toggle } = useOutsideClose();

	return (
		<section className="set-focus-section set-focus-tile">
			<div className="section-header">
				<CMenuContainer className="tile-actions">
					<CMenuContainer.Toggler
						className="icon-container"
						toggle={toggle}
					>
						<BsThreeDots />
					</CMenuContainer.Toggler>

					<CMenuContainer.Menu
						isVisible={isVisible}
						toggle={toggle}
						// ref={elementRef}
					>
						<li onClick={toggle}>
							<CLink
								href="/clock/settings"
								className="icon-container"
							>
								View Settings
							</CLink>
						</li>
					</CMenuContainer.Menu>
				</CMenuContainer>
			</div>

			<div className="section-main">
				<div className="main-header">
					<h1>Ready, set, focus!</h1>
					<p>
						Achieve your goals and get more done with focus. Select
						focus time.
					</p>
					<p>Note! You cannot pause throughout a focus session</p>
				</div>

				<form onSubmit={(e: any) => handleSubmit(e)}>
					<div className="focus-time-selector-container">
						<div className="focus-time-selector">
							<div>
								<h2>{focusSession.time}</h2>
								<p>mins</p>
							</div>
							<div>
								<span
									className={`${
										focusSession.time >= 240
											? "disabled"
											: ""
									}`}
									onClick={() => {
										focusSession.time <= 240 &&
											changeFocusTime("increase");
									}}
								>
									<BiUpArrow />
								</span>
								<span
									className={`${
										focusSession.time <= 15
											? "disabled"
											: ""
									}`}
									onClick={() => {
										focusSession.time >= 15 &&
											changeFocusTime("reduce");
									}}
								>
									<BiDownArrow />
								</span>
							</div>
						</div>
					</div>

					<div className="more-actions">
						<div className="break-actions">
							<p className="break-info">
								{breakSession.count == 0 &&
									"You'll have no breaks."}
								{breakSession.count > 0 &&
									`You'll have ${breakSession.count}  ${
										breakSession.count == 1
											? "break"
											: "breaks"
									}.`}
							</p>

							<CCheckbox
								className={`skip-breaks-toggle ${
									breakSession.count == 0 ? "disabled" : ""
								}`}
								id="break-toggle"
								disabled={focusSession.count - 1 == 0}
								checked={skipBreaks}
								onChange={() => dispatch(toggleSkipBreaks())}
							>
								Skip breaks
							</CCheckbox>
						</div>

						<CCheckbox
							className="track-focus-toggle"
							id="track-with-pauses"
							checked={showStopWatchTile}
							onChange={(e: any) =>
								dispatch(toggleStopWatchTile())
							}
						>
							Track total time with pauses
						</CCheckbox>
					</div>

					<button type="submit">
						<span>
							<BsPlayFill />
						</span>
						Start focus Session
					</button>
				</form>
			</div>
		</section>
	);
};

export default SetFocusSection;
