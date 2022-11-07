import { useState } from "react";
import {
	FocusTimerSection,
	StopwatchSection,
} from "../../src/components/timer";
import PomodoroLayout from "../../src/components/timer/PomodoroLayout";

const IndexPage = () => {
	const [startStopwatch, setStartStopwatch] = useState(false);
	const [stopwatchTime, setStopwatchTime] = useState({
		hr: 0,
		min: 0,
		sec: 0,
		ms: 0,
	});

	const updatePageState = (stateTitle: any, arg: any) => {
		if (stateTitle == "startStopwatch") {
			setStartStopwatch(arg);
		} else if (stateTitle == "stopwatchTime") {
			setStopwatchTime(arg);
		}
	};

	return (
		<PomodoroLayout>
			<main className="timer-page">
				<FocusTimerSection updatePageState={updatePageState} />

				<StopwatchSection
					updateState={updatePageState}
					stopwatchTime={stopwatchTime}
					startStopwatch={startStopwatch}
				/>
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;
