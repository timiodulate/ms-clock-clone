import React, { useState, useEffect, useRef } from "react";
import { ClassProp } from "./Props";

type MouseTrackerProps = ClassProp;

const MouseTracker = ({ className }: MouseTrackerProps) => {
	const mainCursor = useRef(null);
	const secondaryCursor = useRef(null);

	const positionRef = useRef({
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
		key: -1,
	});

	useEffect(() => {
		// hides scrollbars
		// document.firstElementChild.classList.add("hide-scrollbar");

		const handle = (e) => {
			const { clientX, clientY } = e;

			const mouseX = clientX;
			const mouseY = clientY;

			positionRef.current.mouseX =
				mouseX - secondaryCursor.current.clientWidth / 2;
			positionRef.current.mouseY =
				mouseY - secondaryCursor.current.clientHeight / 2;

			mainCursor.current.style.transform = `translate3d(${
				mouseX - mainCursor.current.clientWidth / 2
			}px,${mouseY - mainCursor.current.clientHeight / 2}px, 0 )`;
		};

		document.addEventListener("mousemove", handle);

		return () => document.removeEventListener("mousemove", handle);
	}, []);

	useEffect(() => {
		// document.firstElementChild.classList.add("hide-scrollbar");

		const followMouse = () => {
			positionRef.current.key = requestAnimationFrame(followMouse);

			const {
				mouseX,
				mouseY,
				destinationX,
				destinationY,
				distanceX,
				distanceY,
			} = positionRef.current;

			if (!destinationX || !destinationY) {
				positionRef.current.destinationX = mouseX;
				positionRef.current.destinationY = mouseY;
			} else {
				positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
				positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

				if (Math.abs(destinationX) + Math.abs(destinationY) < 1) {
					positionRef.current.destinationX = mouseX;
					positionRef.current.destinationY = mouseY;
				} else {
					positionRef.current.destinationX += distanceX;
					positionRef.current.destinationY += distanceY;
				}
			}

			if (secondaryCursor.current) {
				secondaryCursor.current.style.transform = `translate3d(${destinationX}px,${destinationY}px, 0 )`;
			}
		};

		followMouse();
	}, []);

	return (
		<>
			<div
				tabIndex={-1}
				className="mouse-tracker primary"
				// style={{
				// 	transform: `translate(${mousePosition.x - 5}px, ${
				// 		mousePosition.y - 5
				// 	}px) `,
				// }}
				ref={mainCursor}
			></div>
			<div
				tabIndex={-1}
				className="mouse-tracker secondary"
				// style={{
				// 	transform: `translate(${mousePosition.x - 25}px, ${
				// 		mousePosition.y - 25
				// 	}px) `,
				// }}
				ref={secondaryCursor}
			></div>
		</>
	);
};

export default MouseTracker;
