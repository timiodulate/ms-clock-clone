import { GetStaticProps } from "next";
import React, { useState, useEffect, useRef } from "react";

import {
	ProjectProps,
	MouseTracker,
	Filter,
	ProjectsCards,
} from "../src/components/projects-list";
import { projects } from "../src/utils/sample-data";

{
	/* This Website contains all of my projects, organized in an
					order I want it to be */
}

const IndexPage = ({ projectsData }: { projectsData: ProjectProps[] }) => {
	const [rotationPosition, setRotationPosition] = useState({
		left: "",
	});

	const [myElementIsVisible, updateMyElementIsVisible] = useState(false);

	const [elementPosition, setElementPosition] = useState(0);

	const myRef = useRef();

	useEffect(() => {
		const handle = (e) => {
			setRotationPosition({
				left: window.pageYOffset + "deg",
			});

			var bodyRect = document.body.getBoundingClientRect(),
				elemRect = document
					.querySelector(".projects-section")
					.getBoundingClientRect(),
				offset = elemRect.top - bodyRect.top;

			setElementPosition(elemRect.top);

			updateMyElementIsVisible(elemRect.top <= -7 ? true : false);
		};

		document.addEventListener("scroll", handle);

		return () => document.removeEventListener("scroll", handle);
	}, []);

	useEffect(() => {
		fetchProjects();

		// observeCards();
	}, []);

	const [allProjects, setAllProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [activeFilter, setActiveFilter] = useState("all-projects");

	const fetchProjects = () => {
		setAllProjects(projectsData);
		setFilteredProjects(projectsData);
	};

	const observeCards = () => {
		const observer = new IntersectionObserver((entries, observer) => {
			const entry = entries[0];
			console.log("entries", entries);
			console.log("entry", entry);
			console.log("entry.isIntersecting", entry.isIntersecting);

			entry.intersectionRect;

			updateMyElementIsVisible(entry.isIntersecting);
		});

		observer.observe(myRef.current);
	};

	return (
		<main className="projects-page">
			<MouseTracker />

			<section className="page-header">
				<div>
					<div
						className="rotate"
						style={{ rotate: `${rotationPosition.left}` }}
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

			<section className="projects-section">
				<div className="projects-header">
					<h1 ref={myRef}>Projects</h1>

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
