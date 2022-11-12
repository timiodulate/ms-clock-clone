import { useSelector } from "react-redux";
import { SetFocusSection, TrackFocusSection } from "../../components/timer";

const FocusTimerSection = () => {
	const focusSessionIsOn = useSelector(
		(state: any) => state.pomodoroTimer.focusSessionIsOn
	);

	if (!focusSessionIsOn) {
		return <SetFocusSection />;
	} else {
		return <TrackFocusSection />;
	}
};

export default FocusTimerSection;
