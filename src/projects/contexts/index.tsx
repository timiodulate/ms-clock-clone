// const ProjectsList

import { createContext, useContext, useState } from "react";
import { useElementTop } from "../../utils/useRotateOnScroll";

export const ProjectsListContext = createContext(null);

export const useProjectsList = () => useContext(ProjectsListContext);

export const ProjectsListContextProvider = ({ children }) => {
	const [allProjects, setAllProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [activeFilter, setActiveFilter] = useState("all-projects");

	const fetchProjects = (projectsData) => {
		setAllProjects(projectsData);
		setFilteredProjects(projectsData);
	};

	const filterData: string[] = [
		"all-projects",
		"works",
		"personal",
		"challenges",
	];

	const filterProjects = () => {
		if (activeFilter == filterData[0]) {
			setFilteredProjects(allProjects);

			return;
		}

		const filtered = allProjects.filter((project) =>
			project.categories.includes(activeFilter)
		);

		setFilteredProjects(filtered);
	};

	const selectFilter = (
		selected: string,
		menuVisible: boolean,
		toggle: () => void
	): void => {
		setActiveFilter(selected);

		if (menuVisible) {
			toggle();
		}
	};

	// ---
	const { elementRef: projectSectRef, myElementIsVisible } = useElementTop();

	return (
		<ProjectsListContext.Provider
			value={{
				fetchProjects,
				allProjects,
				filteredProjects,
				filterData,
				activeFilter,
				filterProjects,
				selectFilter,
				// ---
				projectSectRef,
				myElementIsVisible,
			}}
		>
			{children}
		</ProjectsListContext.Provider>
	);
};
