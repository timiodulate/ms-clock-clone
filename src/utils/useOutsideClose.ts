import { useEffect, useState, useRef } from "react";

const useOutsideClose = (
	refs?,
	callback?,
	options?: { ref?: string[]; closeOnHover?: boolean }
) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef: any = useRef();

	useEffect(() => {
		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	function toggle() {
		// setIsVisible(!isVisible);

		if (isVisible) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
			// elementRef.current?.focus();
		}

		// if (elementRef) {
		// 	!isVisible && ;
		// }
	}

	const delayedVisibilityToggle = (timer) => {
		const setTimer = timer ? timer : 1000;

		setTimeout(() => {
			callback();
		}, 1000);
	};

	const checkIfClickedOutside = (e) => {
		// console.log("outside click");
		// If the menu is open and the clicked target is not within the menu,
		// then close the menu
		// console.log(refs);

		if (refs?.current) {
			if (
				isVisible &&
				elementRef.current &&
				!elementRef.current?.contains(e.target) &&
				!refs.current?.contains(e.target)
			) {
				setIsVisible(false);

				if (callback) {
					callback();
				}
			}

			return;
		}

		if (
			isVisible &&
			elementRef.current &&
			!elementRef.current?.contains(e.target)
		) {
			setIsVisible(false);

			if (callback) {
				callback();
			}
		}
	};

	return {
		elementRef,
		delayedVisibilityToggle,
		isVisible,
		toggle,
	};
};

export default useOutsideClose;

export const useOutsideHoverClose = (callback?) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef: any = useRef();

	useEffect(() => {
		if (isVisible) {
			elementRef.current.addEventListener(
				"mouseleave",
				checkIfClickedOutside
			);

			return () => {
				// Cleanup the event listener
				elementRef.current.removeEventListener(
					"mouseleave",
					checkIfClickedOutside
				);
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}
	}, [isVisible]);

	function toggle() {
		if (isVisible) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
		}
	}

	const checkIfClickedOutside = () => {
		const setTimer = 50;

		let timeLeft = 0;

		const interval = setInterval(() => {
			timeLeft++;

			if (timeLeft === setTimer) {
				clearInterval(interval);

				setIsVisible(false);
			} else {
				const doThis = () => {
					clearInterval(interval);
					setIsVisible(true);
					// elementRef.current.removeEventListener(
					// 	"mouseenter",
					// 	() => ""
					// );
				};

				isVisible &&
					elementRef.current.addEventListener("mouseenter", doThis);

				// return () => {
				// 	// 	// Cleanup the event listener
				// 	elementRef.current.removeEventListener(
				// 		"mouseenter",
				// 		() => ""
				// 	);
				// };
			}
		}, 1);
	};

	return {
		elementRef,
		isVisible,
		toggle,
	};
};
