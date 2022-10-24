import { useEffect } from "react";
import { BiReset } from "react-icons/bi";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";

const StopwatchSection = ({
	stopwatchTime,
	startStopwatch,
	updateState,
}: any) => {
	useEffect(() => {
		if (startStopwatch) {
			let s = 0;
			let m = 0;
			let h = 0;

			const interval = setInterval(() => {
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
					sec: s++,
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [startStopwatch]);

	const toggleStopwatch = () => {
		updateState("startStopwatch", !startStopwatch);
	};

	const stopStopWatch = () => {
		updateState("stopwatchTime", {
			hr: 0,
			min: 0,
			sec: 0,
		});
		updateState("startStopwatch", false);
	};

	return (
		<section className="stopwatch-section">
			<div className={`watch-container ${startStopwatch ? "" : "idle"}`}>
				<div>
					{stopwatchTime.hr.toString().length == 2
						? stopwatchTime.hr
						: "0" + stopwatchTime.hr}

					<span>hr</span>
				</div>
				<span>:</span>
				<div>
					{stopwatchTime.min.toString().length == 2
						? stopwatchTime.min
						: "0" + stopwatchTime.min}

					<span>min</span>
				</div>
				<span>:</span>
				<div>
					{stopwatchTime.sec.toString().length == 2
						? stopwatchTime.sec
						: "0" + stopwatchTime.sec}

					<span>sec</span>
				</div>
			</div>

			<div className="watch-controller">
				<span onClick={toggleStopwatch}>
					{startStopwatch ? (
						<BsFillPauseCircleFill />
					) : (
						<BsFillPlayCircleFill />
					)}
				</span>
				<span onClick={stopStopWatch}>
					<BiReset />
				</span>
			</div>
		</section>
	);
};

export default StopwatchSection;
