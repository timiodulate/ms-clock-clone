import React, { useState, useEffect, useRef } from "react";

const useCardObserve = () => {
	const [myElementIsVisible, updateMyElementIsVisible] = useState(false);

	const myRef = useRef();

	const observeCards = () => {
		const observer = new IntersectionObserver((entries, observer) => {
			const entry = entries[0];
			console.log("entries", entries);
			console.log("entry", entry);
			console.log("entry.isIntersecting", entry.isIntersecting);

			entry.intersectionRect;

			updateMyElementIsVisible(entry.isIntersecting);
		});

		observer.observe(myRef.current);
	};
};
