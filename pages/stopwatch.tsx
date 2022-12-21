import ClockLayout from "../src/components/layouts/ClockLayout";
import StopwatchSection from "../src/components/sections/stopwatch-page/Stopwatch";

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
