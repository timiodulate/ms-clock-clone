import { useEffect, useState } from "react";
import { SetFocusSection, TrackFocusSection } from "../../components/timer";

const FocusTimerSection = ({ updatePageState }) => {
	const [totalFocusMin, setTotalFocusMin] = useState(15);
	const [totalBreakMin, setTotalBreakMin] = useState(0);

	const [currentSession, setCurrentSession] = useState("focus");
	const [sessionCount, setSessionCount] = useState(2);

	const [startFocus, setStartFocus] = useState(false);
	const [sessionTime, setSessionTime] = useState({ min: 0, secs: 0 });

	useEffect(() => {
		if (startFocus) {
			const now = new Date();

			let totalSessionMin =
				currentSession == "focus"
					? now.valueOf() + totalFocusMin * 1000 * 60
					: now.valueOf() + totalBreakMin * 1000 * 60;

			const interval = setInterval(() => {
				const now = new Date();

				const difference = totalSessionMin - now.getTime();

				const m = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);

				const s = Math.floor((difference % (1000 * 60)) / 1000);

				setSessionTime({ min: m, secs: s });

				if (m === 0 && s === 0) {
					return switchSession();
				}
			});

			return () => clearInterval(interval);
		}
	}, [startFocus, currentSession]);

	let arr: string[] = [];

	const switchSession = () => {
		const nextSession = currentSession == "focus" ? "break" : "focus";

		if (currentSession == "focus") {
			arr.push("focus");
		}

		if (arr.length == sessionCount) {
			updateState("startFocus", false);
		} else {
			setCurrentSession(nextSession);
		}
	};

	const updateState = (stateTitle: any, arg: any) => {
		if (stateTitle == "startFocus") {
			setStartFocus(arg);
		} else if (stateTitle == "totalFocusMin") {
			setTotalFocusMin(arg);

			// } else if (stateTitle == "totalSessionMin") {
			// 	setTotalSessionMin(arg);
		}
	};

	return (
		<>
			{!startFocus ? (
				<SetFocusSection
					updatePageState={updatePageState}
					updateState={updateState}
					totalFocusMin={totalFocusMin}
					sessionCount={sessionCount}
				/>
			) : (
				<TrackFocusSection
					updatePageState={updatePageState}
					updateState={updateState}
					sessionTime={sessionTime}
					currentSession={currentSession}
					focusTime={totalFocusMin}
					totalBreakMin={totalBreakMin}
				/>
			)}
		</>
	);
};

export default FocusTimerSection;
