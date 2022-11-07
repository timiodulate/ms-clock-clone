import { useState, useRef } from "react";
import { CNavLink } from "../../components/_reusables/CLink";
import useOutsideClose from "../../utils/useOutsideClose";
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
			<div className="header-bg"></div>

			<aside className={showNav ? "show" : ""} ref={elementRef}>
				<Header className={"top"} toggleNav={toggleNav} />

				<nav>
					<ul>
						<li className="">
							<CNavLink
								href={`/pomodoro-timer`}
								exact
								className="flex-list "
							>
								<span className="icon-container">
									<TiTime />
								</span>
								<span className="title">Pomodoro Timer</span>
							</CNavLink>
						</li>
						<li>
							<CNavLink
								href={`/pomodoro-timer/stopwatch`}
								exact
								className="flex-list"
							>
								<span className="icon-container">
									<IoStopwatchOutline />
								</span>
								<span className="title">Stopwatch</span>
							</CNavLink>
						</li>
						<li>
							<CNavLink
								href={`/pomodoro-timer/timer`}
								exact
								className="flex-list"
							>
								<span className="icon-container">
									<GiSandsOfTime />
								</span>
								<span className="title">Timer</span>
							</CNavLink>
						</li>
					</ul>

					<ul className="bottom">
						<li>
							<CNavLink
								href={`/pomodoro-timer/settings`}
								exact
								className="flex-list"
							>
								<span className="icon-container">
									<IoSettingsOutline />
								</span>
								<span className="title">Settings</span>
							</CNavLink>
						</li>
						<li>
							<CNavLink href="/" exact className="flex-list">
								<span className="icon-container">
									<FiChevronsLeft />
								</span>
								<span className="title">Back to Portfolio</span>
							</CNavLink>
						</li>
					</ul>
				</nav>
			</aside>
			<div className="aside-placeholder"></div>

			<div className="main">
				<Header toggleNav={toggleNav} btnRef={btnRef} />
				<div className="header-placeholder"></div>

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

export default PomodoroLayout;
