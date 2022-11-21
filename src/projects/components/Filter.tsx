import React, { useState, useEffect } from "react";
import { useOutsideHoverClose } from "../../utils/useOutsideClose";
import { useProjectsList } from "../contexts";

interface FilterProps {
	className?: string;
}

const Filter = ({ className }: FilterProps) => {
	const {
		elementRef,
		isVisible: menuVisible,
		toggle,
	} = useOutsideHoverClose();

	const { filterData, activeFilter, filterProjects, selectFilter } =
		useProjectsList();

	useEffect(() => {
		filterProjects();
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
