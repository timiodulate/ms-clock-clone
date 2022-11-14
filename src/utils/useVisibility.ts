import { useState } from "react";

export const useVisibility = () => {
	const [isVisible, setIsVisible] = useState(false);

	function toggle(ref?) {
		// setIsVisible(!isVisible);

		if (isVisible) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
		}

		if (ref) {
			!isVisible && ref.current?.focus();
		}
	}

	return {
		isVisible,
		toggle,
	};
};
