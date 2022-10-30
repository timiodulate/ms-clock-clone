import { GetStaticProps } from "next";
import React, { useState, useEffect, useRef } from "react";

import {
	ProjectProps,
	MouseTracker,
	Filter,
	ProjectsCards,
} from "../src/components/projects-list";
import { projects } from "../src/utils/sample-data";
import {
	useElementTop,
	useRotateOnScroll,
} from "../src/utils/useRotateOnScroll";

{
	/* This Website contains all of my projects, organized in an
					order I want it to be */
}

const IndexPage = ({ projectsData }: { projectsData: ProjectProps[] }) => {
	const { rotationPosition } = useRotateOnScroll();
	const { elementRef: projectSectRef, myElementIsVisible } = useElementTop();

	useEffect(() => {
		fetchProjects();
	}, []);

	const [allProjects, setAllProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [activeFilter, setActiveFilter] = useState("all-projects");

	const fetchProjects = () => {
		setAllProjects(projectsData);
		setFilteredProjects(projectsData);
	};

	return (
		<main className="projects-page">
			<MouseTracker />

			<section className="page-header">
				<div>
					<div
						className="rotate"
						style={{ rotate: `${rotationPosition}` }}
					></div>

					<span
						className={`separator ${
							myElementIsVisible ? "show" : "hide"
						}`}
					>
						-
					</span>
					<span
						className={`heading ${
							myElementIsVisible ? "show" : "hide"
						}`}
					>
						Projects
					</span>
				</div>

				<div>
					<Filter
						className={myElementIsVisible ? "show" : "hide"}
						allProjects={allProjects}
						setFilteredProjects={setFilteredProjects}
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>
				</div>

				<div className="hover">
					<span>MENU =</span>
				</div>
			</section>

			<section className="projects-section" ref={projectSectRef}>
				<div className="projects-header">
					<h1>Projects</h1>

					<Filter
						allProjects={allProjects}
						setFilteredProjects={setFilteredProjects}
						activeFilter={activeFilter}
						setActiveFilter={setActiveFilter}
					/>
				</div>

				<ProjectsCards filteredProjects={filteredProjects} />
			</section>
		</main>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
	// const { userTasks } = useUserTasks();
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const projectsData: ProjectProps[] = projects;
	return { props: { projectsData } };
};
