import { useSelector } from "react-redux";
import SetFocusSection from "./SetFocus";
import TrackFocusSection from "./TrackFocus";

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
