import ClockLayout from "../../src/clock/layouts/ClockLayout";
import StopwatchSection from "../../src/clock/components/stopwatch-page/Stopwatch";

const IndexPage = () => {
	return (
		<ClockLayout>
			<main className="stopwatch-page">
				<StopwatchSection />
			</main>
		</ClockLayout>
	);
};

export default IndexPage;
