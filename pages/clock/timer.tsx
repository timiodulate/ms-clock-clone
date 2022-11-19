import ClockLayout from "../../src/clock/layouts/ClockLayout";
import { FocusTimerSection } from "../../src/clock/components";

const IndexPage = () => {
	return (
		<ClockLayout>
			<main className="timer-page">
				<FocusTimerSection />
			</main>
		</ClockLayout>
	);
};

export default IndexPage;
