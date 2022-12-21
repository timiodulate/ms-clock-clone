import { createContext, useEffect, useContext, useState, useRef } from "react";

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

const DropdownContext = createContext(null);

const useDropdownContext = () => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error("Error in creating the context");
	}

	return context;
};

const CDropdown = ({ as, children, className }: any) => {
	const {
		elementRef,
		isVisible: showDropdown,
		toggle: showDropdownHandler,
	} = useOutsideClose();

	return (
		<DropdownContext.Provider
			value={{
				showDropdown,
				showDropdownHandler,
			}}
		>
			{as === "li" ? (
				<li
					className={`dropdown ${className ? className : ""}`}
					ref={elementRef}
					style={{
						position: "relative",
					}}
				>
					{children}
				</li>
			) : (
				<div
					className={`dropdown ${className ? className : ""}`}
					ref={elementRef}
				>
					{children}
				</div>
			)}
		</DropdownContext.Provider>
	);
};

const Toggler = ({ children, className }: any) => {
	const { showDropdownHandler } = useDropdownContext();

	return (
		<button
			className={`dropdown-toggler ${className ? className : ""}`}
			onClick={showDropdownHandler}
			onMouseEnter={showDropdownHandler}
			// onMouseLeave={showDropdownHandler}

			style={{ fontSize: "1rem", color: "var(--clr-text)" }}
		>
			{children}
		</button>
	);
};

CDropdown.Toggler = Toggler;

const Menu = ({ children, className }: any) => {
	const btnRef: any = useRef();
	const { showDropdown, showDropdownHandler } = useDropdownContext();

	return (
		<ul
			className={`menu ${className ? className : ""} ${
				showDropdown ? "show" : ""
			}`}
			ref={btnRef}
			style={{
				position: "absolute",
				right: "0",
				zIndex: "2",
				display: showDropdown ? "" : "none",
				borderRadius: "var(--border-radius)",
				padding: "0.2rem",
				backgroundColor: "var(--gray-nav)",
				width: "max-content",
			}}
		>
			{children}
		</ul>
	);
};
CDropdown.Menu = Menu;

export { CDropdown };
