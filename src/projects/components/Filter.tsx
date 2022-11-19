import React, { useState, useEffect } from "react";
import { useOutsideHoverClose } from "../../utils/useOutsideClose";
import { ProjectProps } from "./Props";

interface FilterProps {
	className?: string;
	allProjects: ProjectProps[];
	setFilteredProjects: any;
	activeFilter: string;
	setActiveFilter: any;
}

const Filter = ({
	className,
	allProjects,
	setFilteredProjects,
	activeFilter,
	setActiveFilter,
}: FilterProps) => {
	// const [menuVisible, setMenuVisible] = useState(false);
	const {
		elementRef,
		isVisible: menuVisible,
		toggle,
	} = useOutsideHoverClose();

	const filterData: string[] = [
		"all-projects",
		"works",
		"personal",
		"challenges",
	];

	const selectFilter = (selected: string): void => {
		setActiveFilter(selected);

		if (menuVisible) {
			toggle();
		}
	};

	useEffect(() => {
		if (activeFilter == filterData[0]) {
			setFilteredProjects(allProjects);

			return;
		}

		const filtered = allProjects.filter((project) =>
			project.categories.includes(activeFilter)
		);

		setFilteredProjects(filtered);
	}, [activeFilter]);

	return (
		<div className={`filter ${className}`} ref={elementRef}>
			<div className="menu-visible">
				<span className="menu-title">Filter:</span>

				<span className="menu-toggle hover" onClick={toggle}>
					{activeFilter}
				</span>
			</div>

			<div className={`menu ${menuVisible ? "visible" : "hidden"}`}>
				{filterData.map((filter) => (
					<li key={filter} onClick={() => selectFilter(filter)}>
						{filter}
					</li>
				))}
			</div>
		</div>
	);
};

export default Filter;
