import { useSelector } from "react-redux";
import { SetFocusSection, TrackFocusSection } from "../../components/timer";

const FocusTimerSection = () => {
	const focusSessionIsOn = useSelector(
		(state: any) => state.pomodoroTimer.focusSessionIsOn
	);

	return (
		<>{!focusSessionIsOn ? <SetFocusSection /> : <TrackFocusSection />}</>
	);
};

export default FocusTimerSection;
