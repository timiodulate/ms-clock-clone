import { GetStaticProps } from "next";
import React, { useEffect } from "react";

import {
	ProjectProps,
	Filter,
	ProjectsCards,
} from "../src/projects/components";
import { useProjectsList } from "../src/projects/contexts";
import ProjectsLayout from "../src/projects/layouts";
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
	const { fetchProjects, filteredProjects, projectSectRef } =
		useProjectsList();

	useEffect(() => {
		fetchProjects(projectsData);
	}, []);

	return (
		<ProjectsLayout>
			<main className="projects-page">
				<section className="projects-section" ref={projectSectRef}>
					<div className="projects-header">
						<h1>Projects</h1>

						<Filter />
					</div>

					<ProjectsCards filteredProjects={filteredProjects} />
				</section>
			</main>
		</ProjectsLayout>
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
