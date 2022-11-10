import { StopwatchSection } from "../../src/components/timer";
import PomodoroLayout from "../../src/components/timer/PomodoroLayout";

const IndexPage = () => {
	return (
		<PomodoroLayout>
			<main className="timer-page">
				<StopwatchSection />
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;
