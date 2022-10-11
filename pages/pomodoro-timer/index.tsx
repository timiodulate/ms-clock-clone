import Layout from "../../src/layouts/Layout";
import { useEffect, useState } from "react";
import {
	SetFocusSection,
	TrackFocusSection,
	StopwatchSection,
} from "../../src/components/sections/timer";

const IndexPage = () => {
	const [totalFocusMin, setTotalFocusMin] = useState(1);
	const [totalBreakMin, setTotalBreakMin] = useState(1);

	const [currentSession, setCurrentSession] = useState("focus");
	const [sessionCount, setSessionCount] = useState(2);

	const [startFocus, setStartFocus] = useState(false);
	const [sessionTime, setSessionTime] = useState({ min: 0, secs: 0 });

	const [startStopwatch, setStartStopwatch] = useState(false);
	const [stopwatchTime, setStopwatchTime] = useState({
		hr: 0,
		min: 0,
		sec: 0,
	});

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
		} else if (stateTitle == "startStopwatch") {
			setStartStopwatch(arg);
		} else if (stateTitle == "stopwatchTime") {
			setStopwatchTime(arg);
			// } else if (stateTitle == "totalSessionMin") {
			// 	setTotalSessionMin(arg);
		}
	};

	return (
		// <Layout title="Home | Next.js + TypeScript Example">
		<main className="timer-page">
			{!startFocus ? (
				<SetFocusSection
					totalFocusMin={totalFocusMin}
					updateState={updateState}
					sessionCount={sessionCount}
				/>
			) : (
				<TrackFocusSection
					updateState={updateState}
					sessionTime={sessionTime}
					currentSession={currentSession}
					focusTime={totalFocusMin}
					totalBreakMin={totalBreakMin}
				/>
			)}

			<StopwatchSection
				stopwatchTime={stopwatchTime}
				startStopwatch={startStopwatch}
				updateState={updateState}
			/>
		</main>
		// </Layout>
	);
};

export default IndexPage;
