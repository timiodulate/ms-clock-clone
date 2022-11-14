import { createContext, useContext, useState, useRef } from "react";
import useOutsideClose from "../../utils/useOutsideClose";
import { useVisibility } from "../../utils/useVisibility";

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

const CMenuContainer = ({ children, className }: any) => {
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
			<div
				className={`menu-container ${className ? className : ""}`}
				ref={elementRef}
			>
				{children}
			</div>
		</DropdownContext.Provider>
	);
};

const Toggler = ({ children, className }: any) => {
	const { showDropdownHandler } = useDropdownContext();

	return (
		<button
			className={`menu-toggler ${className ? className : ""}`}
			onClick={showDropdownHandler}
		>
			{children}
		</button>
	);
};

CMenuContainer.Toggler = Toggler;

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
		>
			{children}
		</ul>
	);
};
CMenuContainer.Menu = Menu;

export default CMenuContainer;

// Dropdown = select

// Menu =

// dropdown - normal - select etc
//  Toggler
//  Menu
