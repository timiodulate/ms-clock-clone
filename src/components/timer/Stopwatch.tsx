import { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import {
	BsBookmarkFill,
	BsFillPauseCircleFill,
	BsFillPlayCircleFill,
} from "react-icons/bs";

const StopwatchSection = ({
	stopwatchTime,
	startStopwatch,
	updateState,
}: any) => {
	const [time, setTime] = useState(0);
	const [isOn, setIsOn]: any = useState(false);
	const [interv, setInterv] = useState(null);
	const [stopwatchHistory, setStopwatchHistory]: any = useState([]);

	useEffect(() => {
		if (startStopwatch) {
			startWatch();
		} else {
			stopWatch();
		}
	}, [startStopwatch]);

	const formatTime = (time, type: "h" | "m" | "s" | "ms") => {
		let timeH: number;
		let timeM: number;
		let timeS: number;
		let timeMS: number;

		if (typeof time == "object") {
			timeH = time.hr;
			timeM = time.min;
			timeS = time.sec;
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

	const startWatch = () => {
		if (interv !== null) {
			clearInterval(interv);
		}

		// updateState("startStopwatch", !startStopwatch);
		setIsOn(!isOn);

		// const interval = setInterval(displayTimer, 20.5 17);
		const interval = setInterval(displayTimer2, 20);

		setInterv(interval);
	};

	let ms = 0;
	let s = 0;
	let m = 0;
	let h = 0;

	function displayTimer() {
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

		updateState("stopwatchTime", {
			...stopwatchTime,
			hr: h,
			min: m,
			sec: s,
			ms: ms,
		});

		// setTime((prevTime) => prevTime + 10);
	}

	let [milliseconds, seconds, minutes, hours] =
		stopwatchTime.ms > 0 ||
		stopwatchTime.sec > 0 ||
		stopwatchTime.min > 0 ||
		stopwatchTime.hr > 0
			? [
					stopwatchTime.ms,
					stopwatchTime.sec,
					stopwatchTime.min,
					stopwatchTime.hr,
			  ]
			: [0, 0, 0, 0];

	function displayTimer2() {
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

		updateState("stopwatchTime", {
			...stopwatchTime,
			hr: hours,
			min: minutes,
			sec: seconds,
			ms: milliseconds,
		});
	}

	const pauseWatch = () => {
		// updateState("startStopwatch", !startStopwatch);
		setIsOn(!isOn);

		clearInterval(interv);
	};

	const stopWatch = () => {
		updateState("stopwatchTime", {
			hr: 0,
			min: 0,
			sec: 0,
			ms: 0,
		});

		// setTime(0);
		updateState("startStopwatch", false);
		setIsOn(false);

		clearInterval(interv);
	};

	const bookmarkTime = () => {
		const { hr, min, sec, ms } = stopwatchTime;

		const details: any = { time: "00", total: `${hr}:${min}:${sec}.${ms}` };

		setStopwatchHistory([...stopwatchHistory, details]);
	};

	return (
		<section className="stopwatch-section">
			<div className={`watch-container ${isOn ? "" : "idle"}`}>
				<div>
					{formatTime(stopwatchTime, "h")}

					<span>hr</span>
				</div>
				<span>:</span>
				<div>
					{formatTime(stopwatchTime, "m")}

					<span>min</span>
				</div>
				<span>:</span>
				<div>
					{formatTime(stopwatchTime, "s")}

					<span>sec</span>
				</div>
				<span>.</span>
				<div>{formatTime(stopwatchTime, "ms")}</div>
			</div>

			<div className="watch-controller">
				<div>
					{!isOn ? (
						<span onClick={startWatch}>
							<BsFillPlayCircleFill />
						</span>
					) : (
						<span onClick={pauseWatch}>
							<BsFillPauseCircleFill />
						</span>
					)}
				</div>

				<span onClick={bookmarkTime} className={isOn ? "" : "blur"}>
					<BsBookmarkFill />
				</span>

				<span
					onClick={stopWatch}
					className={stopwatchTime.sec > 0 ? "" : "blur"}
				>
					<BiReset />
				</span>
			</div>

			<StopwatchBookmark stopwatchHistory={stopwatchHistory} />
		</section>
	);
};

export default StopwatchSection;

// const StopwatchWatchFace = () => {

// 	return (

// 	)
// }
// const StopwatchController = () => {

// 	return (

// 	)
// }
const StopwatchBookmark = ({ stopwatchHistory }) => {
	return (
		<>
			{stopwatchHistory.length > 0 && (
				<table className="bookmark">
					<tr>
						<th>No</th>
						<th>Mins</th>
						<th>Total</th>
					</tr>

					{stopwatchHistory.map((his, ind) => (
						<tr key={ind}>
							<td>
								<div>{ind}</div>
							</td>
							<td>
								<div>{his.total}</div>
							</td>
							<td>
								<div>{his.total}</div>
							</td>
						</tr>
					))}
				</table>
			)}
		</>
	);
};
