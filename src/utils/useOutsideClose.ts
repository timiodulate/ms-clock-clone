import { useEffect, useState, useRef } from "react";

const useOutsideClose = (refs?, callback?) => {
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
		console.log("outside click");
		// If the menu is open and the clicked target is not within the menu,
		// then close the menu
		// console.log(refs);

		if (refs.current) {
			console.log(elementRef.current);
			console.log(e.target);
			console.log(refs.current);

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
