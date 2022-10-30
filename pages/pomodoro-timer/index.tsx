import Layout from "../../src/layouts/Layout";
import { useEffect, useState, useRef } from "react";
import {
	SetFocusSection,
	TrackFocusSection,
	StopwatchSection,
} from "../../src/components/timer";
import CLink from "../../src/components/_reusables/CLink";
import useOutsideClose from "../../src/utils/useOutsideClose";

const IndexPage = () => {
	const [totalFocusMin, setTotalFocusMin] = useState(0);
	const [totalBreakMin, setTotalBreakMin] = useState(0);

	const [currentSession, setCurrentSession] = useState("focus");
	const [sessionCount, setSessionCount] = useState(2);

	const [startFocus, setStartFocus] = useState(false);
	const [sessionTime, setSessionTime] = useState({ min: 0, secs: 0 });

	const [startStopwatch, setStartStopwatch] = useState(false);
	const [stopwatchTime, setStopwatchTime] = useState({
		hr: 0,
		min: 0,
		sec: 0,
		ms: 0,
	});

	useEffect(() => {
		if (startFocus) {
			const now = new Date();

			let totalSessionMin =
				currentSession == "focus"
					? now.valueOf() + totalFocusMin * 1000 * 60
					: now.valueOf() + totalBreakMin * 1000 * 60;

			const interval = setInterval(() => {
				const now = new Date();

				const difference = totalSessionMin - now.getTime();

				const m = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);

				const s = Math.floor((difference % (1000 * 60)) / 1000);

				setSessionTime({ min: m, secs: s });

				if (m === 0 && s === 0) {
					return switchSession();
				}
			});

			return () => clearInterval(interval);
		}
	}, [startFocus, currentSession]);

	let arr: string[] = [];

	const switchSession = () => {
		const nextSession = currentSession == "focus" ? "break" : "focus";

		if (currentSession == "focus") {
			arr.push("focus");
		}

		if (arr.length == sessionCount) {
			updateState("startFocus", false);
		} else {
			setCurrentSession(nextSession);
		}
	};

	const updateState = (stateTitle: any, arg: any) => {
		if (stateTitle == "startFocus") {
			setStartFocus(arg);
		} else if (stateTitle == "totalFocusMin") {
			setTotalFocusMin(arg);
		} else if (stateTitle == "startStopwatch") {
			setStartStopwatch(arg);
		} else if (stateTitle == "stopwatchTime") {
			setStopwatchTime(arg);
			// } else if (stateTitle == "totalSessionMin") {
			// 	setTotalSessionMin(arg);
		}
	};

	return (
		<PomodoroLayout>
			<main className="timer-page">
				{!startFocus ? (
					<SetFocusSection
						totalFocusMin={totalFocusMin}
						updateState={updateState}
						sessionCount={sessionCount}
					/>
				) : (
					<TrackFocusSection
						updateState={updateState}
						sessionTime={sessionTime}
						currentSession={currentSession}
						focusTime={totalFocusMin}
						totalBreakMin={totalBreakMin}
					/>
				)}

				<StopwatchSection
					stopwatchTime={stopwatchTime}
					startStopwatch={startStopwatch}
					updateState={updateState}
					setStopwatchTime={setStopwatchTime}
				/>
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;

const PomodoroLayout = ({ children }) => {
	const btnRef: any = useRef();
	const {
		elementRef,
		isVisible: showNav,
		toggle: toggleNav,
	} = useOutsideClose(btnRef);

	return (
		<div className={`timer-layout ${showNav ? "disableScroll" : ""}`}>
			<aside className={showNav ? "show" : ""} ref={elementRef}>
				<div className="top">
					<button onClick={toggleNav}>=</button>

					<div>
						<span className="icon-container">😀</span>
						<span className="title">Timer + Stopwatch</span>
					</div>
				</div>

				<nav>
					<ul>
						<li>
							<CLink href="/" className="flex-list">
								<span className="icon-container">😀</span>
								<span className="title">Timer</span>
							</CLink>
						</li>
						<li>
							<CLink href="/" className="flex-list">
								<span className="icon-container">😉</span>
								<span className="title">Timer</span>
							</CLink>
						</li>
						<li>
							<CLink href="/" className="flex-list">
								<span className="icon-container">😐</span>
								<span className="title">Timer</span>
							</CLink>
						</li>
					</ul>

					<ul className="bottom">
						<li>
							<CLink href="/" className="flex-list">
								<span className="icon-container">😐</span>
								<span className="title">Settings</span>
							</CLink>
						</li>
						<li>
							<CLink href="/" className="flex-list">
								<span className="icon-container">😐</span>
								<span className="title">Back to Portfolio</span>
							</CLink>
						</li>
					</ul>
				</nav>
			</aside>
			<div className="aside-placeholder"></div>

			<div className="main">
				<header>
					<button onClick={toggleNav} ref={btnRef}>
						=
					</button>

					<div className="flex-list">
						<span className="icon-container">😀</span>
						<span className="title">Timer + Stopwatch</span>
					</div>
				</header>

				{children}
			</div>
		</div>
	);
};
