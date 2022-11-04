import { useState, useRef } from "react";
import {
	FocusTimerSection,
	StopwatchSection,
} from "../../src/components/timer";
import CLink from "../../src/components/_reusables/CLink";
import useOutsideClose from "../../src/utils/useOutsideClose";

const IndexPage = () => {
	const [startStopwatch, setStartStopwatch] = useState(false);
	const [stopwatchTime, setStopwatchTime] = useState({
		hr: 0,
		min: 0,
		sec: 0,
		ms: 0,
	});

	const updatePageState = (stateTitle: any, arg: any) => {
		if (stateTitle == "startStopwatch") {
			setStartStopwatch(arg);
		} else if (stateTitle == "stopwatchTime") {
			setStopwatchTime(arg);
		}
	};

	return (
		<PomodoroLayout>
			<main className="timer-page">
				<FocusTimerSection updatePageState={updatePageState} />

				<StopwatchSection
					updateState={updatePageState}
					stopwatchTime={stopwatchTime}
					startStopwatch={startStopwatch}
				/>
			</main>
		</PomodoroLayout>
	);
};

export default IndexPage;

import { IoSettingsOutline, IoStopwatchOutline } from "react-icons/io5";
import { FiChevronsLeft } from "react-icons/fi";
import { GiSandsOfTime } from "react-icons/gi";
import { TiTime } from "react-icons/ti";
import { FcAlarmClock } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { useRouter } from "next/router";

const PomodoroLayout = ({ children }) => {
	const btnRef: any = useRef();
	const {
		elementRef,
		isVisible: showNav,
		toggle: toggleNav,
	} = useOutsideClose(btnRef);

	const { pathname } = useRouter();

	const [headerBG, setHeaderBG] = useState(false);

	return (
		<div className={`timer-layout ${showNav ? "disableScroll" : ""}`}>
			<aside className={showNav ? "show" : ""} ref={elementRef}>
				<Header className={"top"} toggleNav={toggleNav} />

				<nav>
					<ul>
						<li className="">
							<CLink href={pathname} className="flex-list active">
								<span className="icon-container">
									<TiTime />
								</span>
								<span className="title">Pomodoro Timer</span>
							</CLink>
						</li>
						<li>
							<CLink href={pathname} className="flex-list">
								<span className="icon-container">
									<IoStopwatchOutline />
								</span>
								<span className="title">Stopwatch</span>
							</CLink>
						</li>
						<li>
							<CLink href={pathname} className="flex-list">
								<span className="icon-container">
									<GiSandsOfTime />
								</span>
								<span className="title">Timer</span>
							</CLink>
						</li>
					</ul>

					<ul className="bottom">
						<li>
							<CLink href={pathname} className="flex-list">
								<span className="icon-container">
									<IoSettingsOutline />
								</span>
								<span className="title">Settings</span>
							</CLink>
						</li>
						<li>
							<CLink href="/" className="flex-list">
								<span className="icon-container">
									<FiChevronsLeft />
								</span>
								<span className="title">Back to Portfolio</span>
							</CLink>
						</li>
					</ul>
				</nav>
			</aside>
			<div className="aside-placeholder"></div>

			<div className="main">
				<Header toggleNav={toggleNav} btnRef={btnRef} />

				{children}
			</div>
		</div>
	);
};

const Header = ({
	className,
	toggleNav,
	btnRef,
}: {
	className?: string;
	toggleNav: any;
	btnRef?;
}) => {
	const [headerBG, setHeaderBG] = useState(true);

	const toggleBg = () => {
		let tiner;

		if (!headerBG) {
			tiner = setTimeout(() => {
				setHeaderBG(true);
			}, 600);
		} else {
			setHeaderBG(false);
			clearTimeout(tiner);
		}
	};

	const handleClick = () => {
		toggleNav();
		toggleBg();
	};

	return (
		<header className={`${className || ""} ${headerBG ? "" : "no-bg"}`}>
			<button onClick={handleClick} ref={btnRef ? btnRef : null}>
				<AiOutlineBars />
			</button>

			<div className="flex-list">
				<span className="icon-container">
					<FcAlarmClock />
				</span>
				<span className="title">Timer + Stopwatch</span>
			</div>
		</header>
	);
};
