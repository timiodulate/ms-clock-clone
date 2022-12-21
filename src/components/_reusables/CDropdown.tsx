import { createContext, useContext, useState, useRef, useEffect } from "react";

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

	function toggle(state?: "show" | "hide") {
		// setIsVisible(!isVisible);

		if (state) {
			setIsVisible(state == "show" ? true : false);
		} else {
			if (isVisible) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
				// elementRef.current?.focus();
			}
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

// const DropdownContext = createContext({
// selectedOption: "",
// changeSelectedOption: (option: string) => {},
// showDropdown: false,
// showDropdownHandler: (option: string) => {},
// });
const DropdownContext = createContext(null);

const useDropdownContext = () => {
	const context = useContext(DropdownContext);

	if (!context) {
		throw new Error("Error in creating the context");
	}

	return context;
};

const CDropdown = ({ as, children, className, noHover }: any) => {
	// const [selectedOption, setSelectedOption] = useState("");
	// const [showDropdown, setShowDropdown] = useState(false);

	// const showDropdownHandler = () => setShowDropdown(!showDropdown);
	// const selectPlaceholder = "Choose an option";

	// const clickOusideHandler = () => setShowDropdown(false);

	const {
		elementRef,
		isVisible: showDropdown,
		toggle: showDropdownHandler,
	} = useOutsideClose();

	// const updateSelectedOption = (option: string) => {
	// 	setSelectedOption(option);
	// 	// setShowDropdown(false);
	// };

	return (
		<DropdownContext.Provider
			value={{
				// selectedOption,
				// changeSelectedOption: updateSelectedOption,
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
					onMouseEnter={() =>
						noHover ? "" : showDropdownHandler("show")
					}
					onMouseLeave={() =>
						noHover ? "" : showDropdownHandler("hide")
					}
				>
					{children}
				</li>
			) : (
				<div
					className={`dropdown ${className ? className : ""}`}
					ref={elementRef}
					style={{
						position: "relative",
					}}
					onMouseEnter={() =>
						noHover ? "" : showDropdownHandler("show")
					}
					onMouseLeave={() =>
						noHover ? "" : showDropdownHandler("hide")
					}
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
			onClick={() => showDropdownHandler()}
			style={{
				fontSize: "1rem",
				// color: "var(--primary-color)"
			}}
		>
			{children}
		</button>
	);
};

CDropdown.Toggler = Toggler;

const Menu = ({ children, className }: any) => {
	const btnRef: any = useRef();
	const { showDropdown, showDropdownHandler } = useDropdownContext();

	// if (btnRef) {
	// 	if (btnRef.current && btnRef.current.children) {
	// 		console.log(btnRef.current.children);
	// 		Object.values(btnRef.current.children).map((child: HTMLLIElement) => {
	// 			child?.lastChild.onCl .addEventListener("click", () => {
	// 				showDropdownHandler();
	// 			});
	// 		});
	// 	}
	// }

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

// .menu
// .menu-container {
// 	.menu {

// 		* {
// 			font-size: var(--norm-fs);
// 		}

// 		li {
// 			display: flex;
// 			align-items: center;
// 			gap: 0.2rem;
// 			border-radius: var(--border-radius);
// 			padding-block: calc(var(--nav-pad) * 2);
// 			padding-inline: calc(var(--nav-pad) * 3);
// 			min-width: max-content;
// 			text-align: left;

// 			* {
// 				// display: block;
// 				text-align: left;
// 			}

// 			&.active,
// 			&:hover {
// 				background-color: var(--gray-border);
// 			}
// 		}

// 	}
// }
