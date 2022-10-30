import React, { useState, useEffect, useRef } from "react";

export const useRotateOnScroll = () => {
	const [rotationPosition, setRotationPosition] = useState("");

	useEffect(() => {
		const handle = () => {
			setRotationPosition(window.pageYOffset + "deg");
		};

		document.addEventListener("scroll", handle);

		return () => document.removeEventListener("scroll", handle);
	});

	return { rotationPosition };
};

export const useElementTop = () => {
	const [myElementIsVisible, updateMyElementIsVisible] = useState(false);

	const elementRef = useRef(null);

	useEffect(() => {
		const handle = () => {
			let elemRect =
				elementRef.current &&
				elementRef.current.getBoundingClientRect();
			// let offset = elemRect.top - bodyRect.top;

			// elemRect && setElementPosition(elemRect.top);

			elemRect &&
				updateMyElementIsVisible(elemRect.top <= -7 ? true : false);
		};

		document.addEventListener("scroll", handle);

		return () => document.removeEventListener("scroll", handle);
	});

	return { elementRef, myElementIsVisible };
};

export default function useArrayOperations() {
	function arrayRemove(array: any, value: any) {
		return array.filter(function (ele: any) {
			return ele != value;
		});
	}

	function arrayAdd(array: any, value: any) {
		return [...array, value];
	}

	return { arrayRemove, arrayAdd };
}

export const useActiveData = (initialData: any, multiple?: boolean) => {
	const [activeData, setActiveData]: any = useState(initialData);
	const { arrayRemove } = useArrayOperations();

	let changeActiveData;

	let isActive: (
		data: any,
		options?: { className: boolean | string }
	) => boolean | string;

	let isActiveClass: (data: any) => string;

	if (multiple) {
		changeActiveData = (val: string) => {
			if (!activeData.includes(val)) {
				setActiveData([...activeData, val]);
			} else {
				setActiveData(arrayRemove(activeData, val));
			}
		};

		isActive = (data) => activeData.includes(data);

		isActiveClass = (data) => (isActive(data) ? "active" : "");
	} else {
		changeActiveData = (val: string) => setActiveData(val);

		isActive = (data, options) => {
			if (options?.className) {
				return activeData === data
					? typeof options?.className === "string"
						? options?.className
						: "active"
					: "";
			}

			return activeData === data;
		};

		isActiveClass = (data) => (activeData === data ? "active" : "");
	}

	return {
		activeData,
		changeActiveData,
		isActiveClass,
		isActive,
	};
};

import { useLayoutEffect } from "react";

export function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

const getWidth = () =>
	window.innerWidth ||
	document.documentElement.clientWidth ||
	document.body.clientWidth;

export function useCurrentWidth() {
	// save current window width in the state object
	let [width, setWidth] = useState(getWidth());

	// in this case useEffect will execute only once because
	// it does not have any dependencies.
	useEffect(() => {
		// timeoutId for debounce mechanism
		let timeoutId = null;
		const resizeListener = () => {
			// prevent execution of previous setTimeout
			clearTimeout(timeoutId);
			// change width from the state object after 150 milliseconds
			timeoutId = setTimeout(() => setWidth(getWidth()), 100);
		};
		// set resize listener
		window.addEventListener("resize", resizeListener);

		// clean up function
		return () => {
			// remove resize listener
			window.removeEventListener("resize", resizeListener);
		};
	}, []);

	return width;
}
