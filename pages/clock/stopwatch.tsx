import PomodoroLayout from "../../src/components/timer/PomodoroLayout";
import StopwatchSection from "../../src/components/timer/Stopwatch-copy";

const IndexPage = () => {
	return (
		<PomodoroLayout>
			<main className="stopwatch-page">
				<StopwatchSection />
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;
