import moment from "moment";
import { useEffect, useState } from "react";
import { BiExpand, BiExpandAlt, BiReset } from "react-icons/bi";
import {
	BsBookmarkFill,
	BsFillPauseCircleFill,
	BsFillPlayCircleFill,
	BsThreeDots,
} from "react-icons/bs";
import { FaCompress, FaCompressAlt, FaExpandAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	updateStopWatchTime,
	startStopWatch,
	pauseStopWatch,
	stopStopWatch,
	bookmarkStopWatchTime,
} from "../../clock/features/pomodoroSlice";
import { useVisibility } from "../../utils/useVisibility";

const StopwatchSection = () => {
	const showStopWatchTile = useSelector(
		(state: any) => state.pomodoroTimer.showStopWatchTile
	);

	const [showBookmark, setShowBookmark] = useState(true);

	const toggleBookmark = () => {
		setShowBookmark(!showBookmark);
	};

	const { isVisible, toggle } = useVisibility();

	return (
		<section
			className={`stopwatch-section stopwatch-tile ${
				showStopWatchTile ? "" : "hide"
			} ${showBookmark ? "" : "hide-bookmark"}`}
		>
			<div className="section-header">
				<button
					id="bookmark toggle"
					onClick={(e: any) => {
						toggleBookmark();
						toggle();
					}}
				>
					{isVisible ? <FaCompressAlt /> : <FaExpandAlt />}
				</button>
			</div>

			<div className="section-main">
				{/* watch-container */}
				<div className="watch-container">
					{/* watch-face */}
					<StopwatchWatchFace />

					<StopwatchController />
				</div>

				<StopwatchBookmark />
			</div>
		</section>
	);
};

export default StopwatchSection;

const StopwatchWatchFace = () => {
	const stopWatchIsOn = useSelector(
		(state: any) => state.pomodoroTimer.stopWatchIsOn
	);
	const stopWatchTime = useSelector(
		(state: any) => state.pomodoroTimer.stopWatchTime
	);

	const formatTime = (time, type: "h" | "m" | "s" | "ms") => {
		let timeH: number;
		let timeM: number;
		let timeS: number;
		let timeMS: number;

		if (typeof time == "object") {
			timeH = time.hr || time.h;
			timeM = time.min || time.m;
			timeS = time.sec || time.s;
			timeMS = time.ms;
		} else {
			timeH = Math.floor((time / 1000) % 60);
			timeM = Math.floor((time / 60000) % 60);
			timeS = Math.floor((time / 1000) % 60);
			timeMS = Math.floor((time / 10) % 100);
		}

		if (type == "h") {
			return timeH < 10 ? "0" + timeH : timeH;

			//  timeH.toString().length == 2? hour: "0" + hour;

			//  "0" + timeH.slice(-2);
		} else if (type == "m") {
			return timeM < 10 ? "0" + timeM : timeM;

			// timeM.toString().length == 2? timeM: "0" + timeM;

			// "0" + timeM.slice(-2);
		} else if (type == "s") {
			return timeS < 10 ? "0" + timeS : timeS;

			// timeS.toString().length == 2? timeS: "0" + timeS;

			// "0" + timeS.slice(-2);
		} else if (type == "ms") {
			return timeMS < 10 ? "0" + timeMS : timeMS;
			// milliseconds < 10
			// 	? "00" + milliseconds
			// 	: milliseconds < 100
			// 	? "0" + milliseconds
			// :
			// milliseconds;

			// timeMS.toString().length == 2? timeMS: "0" + timeMS

			// "0" + timeMS.slice(-2);
		}
	};

	return (
		<div className={`watch-face ${stopWatchIsOn ? "" : "idle"}`}>
			<div>
				<div>
					{formatTime(stopWatchTime, "h")}

					<span>:</span>
				</div>

				<span>hr</span>
			</div>
			<div>
				<div>
					{formatTime(stopWatchTime, "m")}

					<span>:</span>
				</div>

				<span>min</span>
			</div>
			<div>
				<div>
					{formatTime(stopWatchTime, "s")}
					<span>.</span>
				</div>

				<span>sec</span>
			</div>

			<div>{formatTime(stopWatchTime, "ms")}</div>
		</div>
	);
};

const StopwatchController = () => {
	const dispatch = useDispatch();
	const [stopWatchInterval, setStopWatchInterval] = useState(null);
	const [startedOnce, setStartedOnce] = useState([]);
	const [action, setAction] = useState("");
	const stopWatchTime = useSelector(
		(state: any) => state.pomodoroTimer.stopWatchTime
	);
	const stopWatchIsOn = useSelector(
		(state: any) => state.pomodoroTimer.stopWatchIsOn
	);

	// 	actons =
	// 	sesseion started
	// sW paused
	// sW resumed
	// custom bookmark
	// session ended
	// sw Stopped
	// sw Reset

	useEffect(() => {
		if (stopWatchIsOn) {
			startedOnce.includes(1)
				? null
				: setStartedOnce([...startedOnce, 1]);
		} else {
			startedOnce.includes(0)
				? null
				: setStartedOnce([...startedOnce, 0]);

			if (startedOnce.length === 0) {
				setStartedOnce([...startedOnce, 1]);
			}
		}

		if (startedOnce.includes(1)) {
			if (stopWatchIsOn) {
				if (action == "start") {
					return;
				}
				handleStart();
			} else {
				if (action == "pause" || action == "stop") {
					return;
				}
				handleStop();
			}
		}
	}, [stopWatchIsOn]);

	const handleStart = () => {
		if (stopWatchInterval !== null) {
			clearInterval(stopWatchInterval);
		}

		setAction("start");
		dispatch(startStopWatch());

		let interv = setInterval(runStopWatch, 1);

		setStopWatchInterval(interv);
	};

	let timeAtInitialization = moment();

	const runStopWatch = () => {
		let stopwatch: moment.Duration | any = moment.duration(
			moment().diff(timeAtInitialization)
		);

		if (
			stopWatchTime.h == 0 &&
			stopWatchTime.m == 0 &&
			stopWatchTime.s == 0 &&
			stopWatchTime.ms == 0
		) {
			let watchTime = {
				h: stopwatch._data.hours,
				m: stopwatch._data.minutes,
				s: stopwatch._data.seconds,
				ms: stopwatch._data.milliseconds.toString().slice(0, 2),
			};

			dispatch(updateStopWatchTime(watchTime));
		} else {
			let milliS =
				parseInt(stopWatchTime.s) + stopwatch._data.milliseconds;

			let watchTime = {
				h: stopWatchTime.h + stopwatch._data.hours,
				m: stopWatchTime.m + stopwatch._data.minutes,
				s: stopWatchTime.s + stopwatch._data.seconds,
				ms: milliS.toString().slice(0, 2),
			};
			dispatch(updateStopWatchTime(watchTime));
		}
	};

	let ms = 0;
	let s = 0;
	let m = 0;
	let h = 0;

	function runStopWatch2() {
		if (ms < 99) {
			ms += 3;
		}

		if (ms >= 99) {
			ms = 0;
			s += 1;
		}

		if (s == 60) {
			s = 0;
			m += 1;
		}

		if (m == 60) {
			m = 0;
			h += 1;
		}

		let watchTime = {
			h: h,
			m: m,
			s: s,
			ms: ms,
		};

		dispatch(updateStopWatchTime(watchTime));
	}

	let [milliseconds, seconds, minutes, hours] =
		stopWatchTime.ms > 0 ||
		stopWatchTime.s > 0 ||
		stopWatchTime.m > 0 ||
		stopWatchTime.h > 0
			? [
					stopWatchTime.ms,
					stopWatchTime.s,
					stopWatchTime.m,
					stopWatchTime.h,
			  ]
			: [0, 0, 0, 0];

	function runStopWatch3() {
		milliseconds += 10;

		// if (milliseconds == 1000) {
		if (milliseconds == 100) {
			milliseconds = 0;
			seconds++;
			if (seconds == 60) {
				seconds = 0;
				minutes++;
				if (minutes == 60) {
					minutes = 0;
					hours++;
				}
			}
		}

		let watchTime = {
			h: hours,
			m: minutes,
			s: seconds,
			ms: milliseconds,
		};

		dispatch(updateStopWatchTime(watchTime));
	}

	const handlePause = () => {
		clearInterval(stopWatchInterval);

		setAction("pause");

		dispatch(pauseStopWatch());
	};

	const handleStop = () => {
		clearInterval(stopWatchInterval);

		setAction("stop");

		dispatch(stopStopWatch());
	};

	return (
		<div className="watch-controller">
			<div>
				{!stopWatchIsOn ? (
					<span onClick={() => handleStart()}>
						<BsFillPlayCircleFill />
					</span>
				) : (
					<span onClick={() => handlePause()}>
						<BsFillPauseCircleFill />
					</span>
				)}
			</div>

			<span
				onClick={() => dispatch(bookmarkStopWatchTime())}
				className={stopWatchIsOn ? "" : "blur"}
			>
				<BsBookmarkFill />
			</span>

			<span
				onClick={() => handleStop()}
				className={stopWatchTime.s > 0 ? "" : "blur"}
			>
				<BiReset />
			</span>
		</div>
	);
};

const StopwatchBookmark = () => {
	const stopWatchHistory = useSelector(
		(state: any) => state.pomodoroTimer.stopWatchHistory
	);

	return (
		<div className="bookmark-container">
			{stopWatchHistory.length > 0 && (
				<table className="bookmark">
					<thead>
						<tr>
							<th colSpan={2}>Laps</th>
							<th>Time</th>
							<th>Total</th>
						</tr>
					</thead>

					<tbody>
						{stopWatchHistory.map((his, ind) => (
							<tr key={his.id}>
								<td>
									<div>{his.id}</div>
								</td>
								<td className="title">
									<div></div>
								</td>
								<td>
									<div>{his.total}</div>
								</td>
								<td>
									<div>{his.total}</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
