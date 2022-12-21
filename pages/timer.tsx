import ClockLayout from "../src/components/layouts/ClockLayout";
// import { TrackTimerSection } from "../../src/clock/components/timer-page";

const IndexPage = () => {
	return (
		<ClockLayout>
			<main className="timer-page">{/* <TrackTimerSection /> */}</main>
		</ClockLayout>
	);
};

export default IndexPage;
