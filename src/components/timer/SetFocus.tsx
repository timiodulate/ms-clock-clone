import { useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { BsPlayFill } from "react-icons/bs";

const SetFocusSection = ({
	totalFocusMin,
	updateState,
	updatePageState,
	sessionCount,
}: {
	totalFocusMin: number;
	updateState: (stateTitle: any, arg: any) => void;
	updatePageState: (stateTitle: any, arg: any) => void;
	sessionCount: number;
}) => {
	const [trackTotalTime, setTrackTotalTime] = useState(true);

	const changeFocusTime = (event: "increase" | "reduce") => {
		if (event === "increase") {
			totalFocusMin != 240
				? updateState("totalFocusMin", totalFocusMin + 15)
				: null;
		} else {
			totalFocusMin != 15
				? updateState("totalFocusMin", totalFocusMin - 15)
				: null;
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		updateState("startFocus", true);
		trackTotalTime && updatePageState("startStopwatch", true);
	};

	return (
		<section className="set-focus-section">
			<div className="section-header">
				<h1>Ready, set, focus!</h1>
				<p>
					Achieve your goals and get more done with focus. Select
					focus time.
				</p>
				<p>Note! You cannot pause throughout a focus session</p>
			</div>

			<form onSubmit={(e: any) => handleSubmit(e)}>
				<div className="focus-time-selector-container">
					<div className="focus-time-selector">
						<div>
							<h2>{totalFocusMin}</h2>
							<p>mins</p>
						</div>
						<div>
							<span
								className={`${
									totalFocusMin >= 240 ? "disabled" : ""
								}`}
								onClick={() => {
									totalFocusMin <= 240 &&
										changeFocusTime("increase");
								}}
							>
								<BiUpArrow />
							</span>
							<span
								className={`${
									totalFocusMin <= 15 ? "disabled" : ""
								}`}
								onClick={() => {
									totalFocusMin >= 15 &&
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
					{totalFocusMin <= 30 && sessionCount - 1 == 0
						? "You'll have no breaks."
						: `You'll have ${sessionCount - 1} break.`}
				</p>

				<div
					className={`skip-breaks-toggle ${
						sessionCount - 1 == 0 ? "disabled" : ""
					}`}
				>
					<input
						type="checkbox"
						name=""
						id="break-toggle"
						disabled={sessionCount - 1 == 0}
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

export default SetFocusSection;
