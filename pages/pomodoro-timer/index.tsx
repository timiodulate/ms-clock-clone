import moment from "moment";
import { useRef, useState, useEffect } from "react";
import {
	DailyProgressSection,
	FocusTimerSection,
	StopwatchSection,
	TodoSection,
} from "../../src/components/timer";
import PomodoroLayout from "../../src/components/timer/PomodoroLayout";

const IndexPage = () => {
	return (
		<PomodoroLayout>
			<main className="timer-page">
				<FocusTimerSection />

				<StopwatchSection />
				<TodoSection />
				<DailyProgressSection />
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;
