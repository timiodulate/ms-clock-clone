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
				<DailyProgressSection />
				<TodoSection />
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;
