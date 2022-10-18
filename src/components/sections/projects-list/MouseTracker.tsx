import React, { useState, useEffect, useRef } from "react";
import { ClassProp } from "./Props";

type MouseTrackerProps = ClassProp;

const MouseTracker = ({ className }: MouseTrackerProps) => {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		document.firstElementChild.classList.add("hide-scrollbar");

		const handle = (e) => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		document.addEventListener("mousemove", handle);

		return () => document.removeEventListener("mousemove", handle);
	}, []);

	return (
		<>
			<div
				tabIndex={-1}
				className="mouse-tracker primary"
				style={{
					transform: `translate(${mousePosition.x - 5}px, ${
						mousePosition.y - 5
					}px) `,
				}}
			></div>
			<div
				tabIndex={-1}
				className="mouse-tracker secondary"
				style={{
					transform: `translate(${mousePosition.x - 25}px, ${
						mousePosition.y - 25
					}px) `,
				}}
			></div>
		</>
	);
};

export default MouseTracker;
