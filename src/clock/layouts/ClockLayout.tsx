import { useState, useRef } from "react";
import { CNavLink } from "../../components/_reusables/CLink";
import useOutsideClose from "../../utils/useOutsideClose";
import { IoSettingsOutline, IoStopwatchOutline } from "react-icons/io5";
import { FiChevronsLeft } from "react-icons/fi";
import { TiTime } from "react-icons/ti";
import { FcAlarmClock } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { GiSandsOfTime } from "react-icons/gi";

const ClockLayout = ({ children }) => {
	const btnRef: any = useRef();
	const {
		elementRef,
		isVisible: showNav,
		toggle: toggleNav,
	} = useOutsideClose(btnRef);

	// function disableScroll() {
	// // Get the current page scroll position
	// let scrollTop =
	// 	window.pageYOffset || document.documentElement.scrollTop;
	// let scrollLeft =
	// 	window.pageXOffset || document.documentElement.scrollLeft;

	// let scrollLeft = window.scrollY;
	// let scrollTop = window.scrollX;

	// // // if any scroll is attempted, set this to the previous value
	// window.onscroll = function () {
	// 	window.scrollTo(scrollLeft, scrollTop);
	// };

	// 2
	// document?.body.classList.add("stop-scrolling");

	// 3
	// function preventDefault(e) {
	// 	e.preventDefault();
	// }

	// var supportsPassive = false;

	// var wheelOpt = supportsPassive ? { passive: false } : false;
	// var wheelEvent =
	// 	"onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

	// window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
	// window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	// window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
	// // window.addEventListener('keydown', preventDefaultForScrollKeys, false);

	// console.log("th");

	// elementRef?.current.focus();
	// }

	// function enableScroll() {
	// 	// window.onscroll = function () {};

	// 	document?.body.classList.remove("stop-scrolling");
	// }

	// if (showNav) {
	// 	disableScroll();
	// } else {
	// 	enableScroll();
	// }

	return (
		<div className={`timer-layout ${showNav ? "disableScroll" : ""}`}>
			<div className="header-bg"></div>

			<aside className={showNav ? "show" : ""} ref={elementRef}>
				<Header className={"top"} toggleNav={toggleNav} />

				<nav>
					<ul>
						<li className="">
							<CNavLink
								href={`/clock`}
								exact
								className="flex-list "
							>
								<span className="icon-container">
									<TiTime />
								</span>
								<span className="title">Pomodoro timer</span>
							</CNavLink>
						</li>
						{/* <li>
							<CNavLink
								href={`/clock/timer`}
								exact
								className="flex-list"
							>
								<span className="icon-container">
									<GiSandsOfTime />
								</span>
								<span className="title">Timer</span>
							</CNavLink>
						</li> */}
						<li>
							<CNavLink
								href={`/clock/stopwatch`}
								exact
								className="flex-list"
							>
								<span className="icon-container">
									<IoStopwatchOutline />
								</span>
								<span className="title">Stopwatch</span>
							</CNavLink>
						</li>
					</ul>

					<ul className="bottom">
						<li>
							<CNavLink
								href={`/clock/settings`}
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
								<span className="title">Back to Projects</span>
							</CNavLink>
						</li>
					</ul>
				</nav>
			</aside>
			<div className="aside-placeholder"></div>

			<div className="main">
				<Header toggleNav={toggleNav} btnRef={btnRef} />
				{/* <div className="header-placeholder"></div> */}

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
				<span className="title">Clock</span>
			</div>
		</header>
	);
};

export default ClockLayout;
