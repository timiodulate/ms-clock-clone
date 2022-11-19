import {
	DailyProgressSection,
	FocusTimerSection,
	StopwatchSection,
	TodoSection,
} from "../../src/clock/components";
import ClockLayout from "../../src/clock/layouts/ClockLayout";

const IndexPage = () => {
	return (
		<ClockLayout>
			<main className="timer-page">
				<FocusTimerSection />
				<StopwatchSection />
				<DailyProgressSection />
				<TodoSection />
			</main>
		</ClockLayout>
	);
};

export default IndexPage;
