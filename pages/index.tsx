import {
	DailyProgressSection,
	FocusTimerSection,
	StopwatchSection,
	TodoSection,
} from "../src/components/sections/focus-page";
import ClockLayout from "../src/components/layouts/ClockLayout";

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
