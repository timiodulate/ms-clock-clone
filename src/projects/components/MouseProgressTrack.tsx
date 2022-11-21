import React from "react";
import { useRotateOnScroll } from "../../utils/useRotateOnScroll";

export default function ScrollProgressIndicator() {
	const { rotationPosition } = useRotateOnScroll();

	return (
		<div
			className="scroll-progress-indicator"
			style={{ rotate: `${rotationPosition}` }}
		></div>
	);
}
