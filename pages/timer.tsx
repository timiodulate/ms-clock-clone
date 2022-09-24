import Layout from "../src/layouts/Layout";
import { TaskProps } from "../src/interfaces";
import { sampleUserData } from "../src/utils/sample-data";
import List from "../src/components/sections/tasks/List";
import { useUserTasks } from "../src/contexts/user-tasks";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";

type Props = {
	items: TaskProps[];
};

const IndexPage = ({ items }: Props) => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const [totalFocusMin, setTotalFocusMin] = useState(0);

	const [breaks, setBreaks] = useState(0);

	const [trackTotalTime, setTrackTotalTime] = useState(true);

	const [startFocus, setStartFocus] = useState(false);

	const [focusMin, setFocusMin] = useState(0);
	const [focusSecs, setFocusSecs] = useState(0);

	useEffect(() => {
		const target = new Date("9/24/2022 05:05:05");

		const interval = setInterval(() => {
			const now = new Date();

			const difference = target.getTime() - now.getTime();

			const d = Math.floor(difference / (1000 * 60 * 60 * 24));
			setDays(d);

			const h = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			setHours(h);

			const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			setMinutes(m);

			const s = Math.floor((difference % (1000 * 60)) / 1000);
			setSeconds(s);
		});

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (startFocus) {
			const interval = setInterval(() => {
				const now = new Date();

				const difference = totalFocusMin - now.getTime();

				// setFocusMin(difference);

				// const d = Math.floor(difference / (1000 * 60 * 60 * 24));
				// setDays(d);

				// const h = Math.floor(
				// 	(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				// );
				// setHours(h);

				const m = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);
				// setMinutes(difference);
				setFocusMin(m);

				const s = Math.floor((difference % (1000 * 60)) / 1000);
				setFocusSecs(s);
				// setSeconds(s);
			});

			return () => clearInterval(interval);
		}
	}, [startFocus]);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const now = new Date();

		// const focusMinutes = now.getUTCMinutes() + 1000;
		const focusMinutes = now.setUTCMinutes(1000 * 60);

		setTotalFocusMin(focusMinutes);

		setStartFocus(true);

		// console.dir(now.valueOf());
		// console.dir(now.setMinutes(60));
		// console.dir(now.setUTCMinutes(60));
		// console.dir(now.getUTCDate());
		// console.dir(now.valueOf());
		// console.dir(now.toTimeString());
		// console.dir(now.toString());
		// console.dir(now.toUTCString());
		// console.dir(now.toISOString());
	};

	return (
		// <Layout title="Home | Next.js + TypeScript Example">
		<main className="timer-page">
			<section>
				<div className="section-header">
					<h1>Ready, set, focus!</h1>
					<p>Achieve your goals and get more done with focus.</p>
				</div>

				<form onSubmit={(e: any) => handleSubmit(e)}>
					<div>Focus time select</div>

					<p>
						{/* if timer <= 30min, 0 breaks
                        if timer >= 45min and <= 60, 1 breaks
						{breaks == 0
                        if timer >= 75min and <= 90, 2 breaks */}
						{breaks == 0
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
			{/* <section>
				<div>{days}</div>
				<div>{hours}</div>
				<div>{minutes}</div>
				<div>{seconds}</div>
			</section> */}

			<section>
				<h1>Time Track</h1>

				<div>
					<h2>Total Time Used</h2>
					{/* <div>
                    <div>{days}</div>
						<div>{hours}</div>
						<div>{minutes}</div>
						<div>{seconds}</div>
                    </div> */}
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
			</section>
		</main>
		// </Layout>
	);
};

// export const getStaticProps: GetStaticProps = async () => {
// 	// const { userTasks } = useUserTasks();
// 	// Example for including static props in a Next.js function component page.
// 	// Don't forget to include the respective types for any props passed into
// 	// the component.
// 	const items: TaskProps[] = sampleUserData;
// 	return { props: { items } };
// };

export default IndexPage;
