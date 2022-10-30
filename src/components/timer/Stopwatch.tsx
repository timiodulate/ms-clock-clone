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
	const [interv, setInterv] = useState(null);
	const [stopwatchHistory, setStopwatchHistory]: any = useState([]);

	const startWatch = () => {
		updateState("startStopwatch", !startStopwatch);

		let ms = 0;
		let s = 0;
		let m = 0;
		let h = 0;

		const interval = setInterval(() => {
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

			// updateState("stopwatchTime", {
			// 	...stopwatchTime,
			// 	// hr: h,
			// 	min: Math.floor((newTime / 60000) % 60),
			// 	sec: Math.floor((newTime / 1000) % 60),
			// 	ms: Math.floor((newTime / 10) % 100),
			// });
		}, 20.5);
		// }, 17);

		setInterv(interval);
	};

	const pauseWatch = () => {
		updateState("startStopwatch", !startStopwatch);

		clearInterval(interv);
	};

	const stopWatch = () => {
		updateState("stopwatchTime", {
			hr: 0,
			min: 0,
			sec: 0,
			ms: 0,
		});

		setTime(0);
		updateState("startStopwatch", false);

		clearInterval(interv);
	};

	const bookmarkTime = () => {
		console.log(stopwatchHistory);

		const { hr, min, sec, ms } = stopwatchTime;

		const details: any = { time: "00", total: `${hr}:${min}:${sec}.${ms}` };

		setStopwatchHistory([...stopwatchHistory, details]);
	};

	return (
		<section className="stopwatch-section">
			<div className={`watch-container ${startStopwatch ? "" : "idle"}`}>
				<div>
					{stopwatchTime.hr.toString().length == 2
						? stopwatchTime.hr
						: "0" + stopwatchTime.hr}
					{/* {"0" + Math.floor((newTime / 1000) % 60).slice(-2)} */}

					<span>hr</span>
				</div>
				<span>:</span>
				<div>
					{/* {stopwatchTime.min.toString().length == 2
						? stopwatchTime.min
						: "0" + stopwatchTime.min} */}

					{("0" + Math.floor((time / 60000) % 60)).slice(-2)}

					<span>min</span>
				</div>
				<span>:</span>
				<div>
					{stopwatchTime.sec.toString().length == 2
						? stopwatchTime.sec
						: "0" + stopwatchTime.sec}
					{/* {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
					<span>sec</span> */}
				</div>
				<span>.</span>
				<div>
					{stopwatchTime.ms.toString().length == 2
						? stopwatchTime.ms
						: "0" + stopwatchTime.ms}
					{/* {("0" + Math.floor((time / 10) % 100)).slice(-2)} */}
				</div>
			</div>

			<div className="watch-controller">
				<div>
					{!startStopwatch ? (
						<span onClick={startWatch}>
							<BsFillPlayCircleFill />
						</span>
					) : (
						<span onClick={pauseWatch}>
							<BsFillPauseCircleFill />
						</span>
					)}
				</div>

				<span onClick={bookmarkTime}>
					<BsBookmarkFill />
				</span>

				<div>
					<span onClick={stopWatch}>
						<BiReset />
					</span>
				</div>
			</div>

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
		</section>
	);
};

export default StopwatchSection;
