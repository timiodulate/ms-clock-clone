import { useEffect, useState } from "react";
import useOutsideClose from "../../utils/useOutsideClose";
import { useVisibility } from "../../utils/useVisibility";

const CMenuContainer = ({ children, className }: any) => {
	const { isVisible, toggle } = useVisibility();

	// console.log(children);

	useEffect(() => {
		const T = children.filter((e) => e.type.name == "Toggler");
		// console.log((T[0].props = isVisible));
	}, []);

	return (
		<div className={`menu-container ${className ? className : ""}`}>
			{/* {T.map((Co) => (
				<Co toggle={toggle} />
			))} */}
			{children}
		</div>
	);
};

const Toggler = ({ children, className, toggle }: any) => {
	// console.log(toggle);

	return (
		<button
			className={`menu-toggler ${className ? className : ""}`}
			onClick={toggle}
		>
			{children}
		</button>
	);
};

CMenuContainer.Toggler = Toggler;

const Menu = ({ children, className, isVisible, toggle, ref }: any) => {
	// const btnRef: any = useRef();

	return (
		<ul
			className={`menu ${className ? className : ""} ${
				isVisible ? "show" : ""
			}`}
			ref={ref}
		>
			{children}
		</ul>
	);
};
CMenuContainer.Menu = Menu;

export default CMenuContainer;
