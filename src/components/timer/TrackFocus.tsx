import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getCurrentSession,
	toggleFocusSession,
	toggleStopWatch,
} from "../../clock/features/pomodoroSlice";
import { BsFillStopCircleFill } from "react-icons/bs";
import { CircleProgress } from "../_reusables/CircleProgress";

const TrackFocusSection = () => {
	const dispatch = useDispatch();

	const allSessionsDetails = useSelector(
		(state: any) => state.pomodoroTimer.allSessions
	);
	const currentSessionDetails = useSelector(
		(state: any) => state.pomodoroTimer.currentSessionDetails
	);
	const focusSessionIsOn = useSelector(
		(state: any) => state.pomodoroTimer.focusSessionIsOn
	);

	const [sessionTime, setSessionTime] = useState({ min: 0, secs: 0 });

	useEffect(() => {
		if (focusSessionIsOn && allSessionsDetails.length != 0) {
			const now = new Date();

			let totalSessionMin =
				now.valueOf() + currentSessionDetails.sessionTime * 1000 * 60;

			const interval = setInterval(() => {
				const now = new Date();

				const difference = totalSessionMin - now.getTime();

				const m = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);

				const s = Math.floor((difference % (1000 * 60)) / 1000);

				setSessionTime({ min: m, secs: s });

				if (m === 0 && s === 0) {
					return dispatch(getCurrentSession());
				}
			});

			return () => clearInterval(interval);
		}
	}, [focusSessionIsOn, currentSessionDetails]);

	const percent =
		((sessionTime.min * 60 + sessionTime.secs) * 100) /
		(currentSessionDetails.sessionTime * 60);

	return (
		<section className="track-focus-section">
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
					// updateState("currentSession", "focus");
					dispatch(toggleFocusSession());
					dispatch(toggleStopWatch(false));
				}}
			>
				<BsFillStopCircleFill />
			</span>

			<p>
				Next:{" "}
				<b>
					{`${allSessionsDetails[0].sessionTime} mins ${allSessionsDetails[0].sessionTitle}`}
				</b>
			</p>
		</section>
	);
};

export default TrackFocusSection;
