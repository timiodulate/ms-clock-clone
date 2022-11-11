import { useEffect } from "react";
import { BiUpArrow, BiDownArrow, BiDotsHorizontal } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	setBreakSession,
	setFocusSession,
	toggleStopWatch,
	toggleStopWatchTile,
} from "../../clock/features/pomodoroSlice";
import CCheckbox from "../_reusables/CCheckbox";
import CLink from "../_reusables/CLink";

const SetFocusSection = ({
	updateState,
}: {
	updateState: (stateTitle: any, arg: any) => void;
}) => {
	const dispatch = useDispatch();

	const focusSession = useSelector(
		(state: any) => state.pomodoroTimer.focusSession
	);
	const breakSession = useSelector(
		(state: any) => state.pomodoroTimer.breakSession
	);
	const showStopWatchTile = useSelector(
		(state: any) => state.pomodoroTimer.showStopWatchTile
	);

	useEffect(() => {
		dispatch(setBreakSession({ count: focusSession.count - 1 }));
	}, []);

	const changeFocusTime = (event: "increase" | "reduce") => {
		if (event === "increase") {
			focusSession.time != 240
				? dispatch(setFocusSession({ time: focusSession.time + 15 }))
				: null;
		} else {
			focusSession.time != 15
				? dispatch(setFocusSession({ time: focusSession.time - 15 }))
				: null;
		}
	};

	const toggleBreaks = (e: any) => {
		if (e.target.checked) {
			dispatch(setBreakSession({ count: 0 }));
		} else {
			dispatch(setBreakSession({ count: focusSession.count - 1 }));
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		updateState("startFocus", true);
		showStopWatchTile && dispatch(toggleStopWatch(true));
	};

	return (
		<section className="set-focus-section">
			<div className="section-header">
				<CLink href="/clock/settings" className="icon-container">
					<BiDotsHorizontal />
				</CLink>
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

					<p>
						{breakSession.count == 0 && "You'll have no breaks."}
						{breakSession.count > 0 &&
							`You'll have ${breakSession.count} break.`}
					</p>

					<div
						className={`skip-breaks-toggle ${
							breakSession.count == 0 ? "disabled" : ""
						}`}
					>
						<CCheckbox
							id="break-toggle"
							disabled={focusSession.count - 1 == 0}
							onChange={(e) => toggleBreaks(e)}
						>
							Skip breaks
						</CCheckbox>
					</div>

					<div>
						<CCheckbox
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
function dispatch(arg0: {
	payload: { time: number };
	type: "pomodoroTimer/setFocusSession";
}) {
	throw new Error("Function not implemented.");
}
