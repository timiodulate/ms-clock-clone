import Layout from "../src/layouts/Layout";
import {
	BiChevronRight,
	BiChevronDown,
	BiUpArrow,
	BiDownArrow,
	BiStopCircle,
	BiReset,
	BiPause,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import {
	BsFillPauseFill,
	BsFillPlayFill,
	BsFillStopCircleFill,
	BsPlayFill,
} from "react-icons/bs";

const IndexPage = () => {
	const [totalFocusMin, setTotalFocusMin] = useState(0);

	const [startFocus, setStartFocus] = useState(false);
	const [startStopwatch, setStartStopwatch] = useState(false);

	const [stopwatchTime, setStopwatchTime] = useState({
		hr: 0,
		min: 0,
		sec: 0,
	});

	const [focusMin, setFocusMin] = useState(0);
	const [focusSecs, setFocusSecs] = useState(0);

	// useEffect(() => {
	// 	const target = new Date("9/24/2022 05:05:05");

	// 	const interval = setInterval(() => {
	// 		const now = new Date();

	// 		const difference = target.getTime() - now.getTime();

	// 		const d = Math.floor(difference / (1000 * 60 * 60 * 24));
	// 		setDays(d);

	// 		const h = Math.floor(
	// 			(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	// 		);
	// 		setHours(h);

	// 		const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	// 		setMinutes(m);

	// 		const s = Math.floor((difference % (1000 * 60)) / 1000);
	// 		setSeconds(s);
	// 	});

	// 	return () => clearInterval(interval);
	// }, []);

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

				setStopwatchTime({
					...stopwatchTime,
					hr: h,
					min: m,
					sec: s++,
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [startStopwatch]);

	useEffect(() => {
		if (startFocus) {
			const interval = setInterval(() => {
				const now = new Date();

				const difference = totalFocusMin - now.getTime();

				const m = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);
				setFocusMin(m);

				const s = Math.floor((difference % (1000 * 60)) / 1000);
				setFocusSecs(s);
			});

			return () => clearInterval(interval);
		}
	}, [startFocus]);

	const updateState = (stateTitle: any, arg: any) => {
		if (stateTitle == "startFocus") {
			setStartFocus(arg);
		} else if (stateTitle == "totalFocusMin") {
			setTotalFocusMin(arg);
		} else if (stateTitle == "startStopwatch") {
			setStartStopwatch(arg);
		}
	};

	const toggleStopwatch = () => {
		updateState("startStopwatch", !startStopwatch);
	};
	const stopStopWatch = () => {
		setStopwatchTime({
			hr: 0,
			min: 0,
			sec: 0,
		});
		updateState("startStopwatch", false);
	};

	return (
		// <Layout title="Home | Next.js + TypeScript Example">
		<main className="timer-page">
			{!startFocus ? (
				<SetFocusSection updateState={updateState} />
			) : (
				<TrackFocusSection
					updateState={updateState}
					focusMin={focusMin}
					focusSecs={focusSecs}
				/>
			)}

			<StopwatchSection
				stopwatchTime={stopwatchTime}
				toggleStopwatch={toggleStopwatch}
				startStopwatch={startStopwatch}
				stopStopWatch={stopStopWatch}
			/>
		</main>
		// </Layout>
	);
};

export default IndexPage;

const SetFocusSection = ({
	updateState,
}: {
	updateState: (stateTitle: any, arg: any) => void;
}) => {
	const [focusTime, setFocusTime] = useState(15);

	const [breaks, setBreaks] = useState(0);

	const [trackTotalTime, setTrackTotalTime] = useState(true);

	const changeFocusTime = (event: "increase" | "reduce") => {
		if (event === "increase") {
			focusTime != 240
				? setFocusTime((prevState) => prevState + 15)
				: null;
		} else {
			focusTime != 15
				? setFocusTime((prevState) => prevState - 15)
				: null;
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const now = new Date();

		const focusMinutes = now.valueOf() + focusTime * 1000 * 60;

		updateState("totalFocusMin", focusMinutes);
		updateState("startFocus", true);

		trackTotalTime && updateState("startStopwatch", true);
	};

	return (
		<section className="set-focus-section">
			<div className="section-header">
				<h1>Ready, set, focus!</h1>
				<p>Achieve your goals and get more done with focus.</p>
			</div>

			<form onSubmit={(e: any) => handleSubmit(e)}>
				<div className="focus-time-selector-container">
					<h1>
						Select focus time. Note! You cannot pause throughout a
						focus session
					</h1>

					<div className="focus-time-selector">
						<div>
							<h2>{focusTime}</h2>
							<p>mins</p>
						</div>
						<div>
							<span
								className={`${
									focusTime == 240 ? "disabled" : ""
								}`}
								onClick={() => {
									changeFocusTime("increase");
								}}
							>
								<BiUpArrow />
							</span>
							<span
								className={`${
									focusTime == 15 ? "disabled" : ""
								}`}
								onClick={() => {
									changeFocusTime("reduce");
								}}
							>
								<BiDownArrow />
							</span>
						</div>
					</div>
				</div>

				<p>
					{/* if timer <= 30min, 0 breaks
                if timer >= 45min and <= 60, 1 breaks
                {breaks == 0
                if timer >= 75min and <= 90, 2 breaks */}
					{focusTime <= 30 && breaks == 0
						? "You will have no breaks."
						: "You'll have {break} break."}
				</p>

				<div
					className={`skip-breaks-toggle ${
						breaks == 0 ? "disabled" : ""
					}`}
				>
					<input
						type="checkbox"
						name=""
						id="break-toggle"
						disabled={breaks == 0}
					/>

					<label htmlFor="break-toggle"> Skip breaks</label>
				</div>

				<div>
					<input
						type="checkbox"
						name=""
						id="track-with-pauses"
						checked={trackTotalTime}
						onChange={(e: any) =>
							setTrackTotalTime(!trackTotalTime)
						}
					/>
					<label htmlFor="track-with-pauses">
						{" "}
						Track total time with pauses
					</label>
				</div>

				<button type="submit">
					<span>
						<BsPlayFill />
					</span>
					Start focus Session
				</button>
			</form>
		</section>
	);
};

const TrackFocusSection = ({ focusMin, focusSecs, updateState }: any) => {
	return (
		<section className="track-focus-section">
			<div>
				{/* <h2>Total Focus Time</h2> */}

				<div>
					{focusMin.toString().length == 2
						? focusMin
						: "0" + focusMin}
					:
					{focusSecs.toString().length == 2
						? focusSecs
						: "0" + focusSecs}
				</div>

				<span onClick={() => updateState("startFocus", false)}>
					<BsFillStopCircleFill />
				</span>

				<p>Next:</p>
			</div>
			{/* <div>
				<div>
					<h2>Total Time Used</h2>
				</div>
				<div>
					<h2>Total Focus Time</h2>
					<div>
						<div>{focusMin}</div>
						<div>{focusSecs}</div>
					</div>
				</div>
				<div>
					<h2>Total Break Time</h2>
					<div></div>
				</div>
				<div>
					<h2>Total Pauses Time</h2>
					<div></div>
				</div>
			</div> */}
		</section>
	);
};

const StopwatchSection = ({
	stopwatchTime,
	toggleStopwatch,
	startStopwatch,
	stopStopWatch,
}: any) => {
	return (
		<section className="stopwatch-section">
			<div className="watch-container">
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
					{startStopwatch ? <BsFillPauseFill /> : <BsFillPlayFill />}
				</span>
				<span onClick={stopStopWatch}>
					<BiReset />
				</span>
			</div>
		</section>
	);
};
