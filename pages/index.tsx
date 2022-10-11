import Image from "next/image";
import Link from "next/link";
import { passport } from "../src/assets/images";

import { useState, useEffect } from "react";
import React from "react";

const IndexPage = () => {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});
	const [rotationPosition, setRotationPosition] = useState({
		left: "",
	});

	useEffect(() => {
		const handle = (e) => {
			const scrollLeft =
				window.pageXOffset !== undefined
					? window.pageXOffset
					: (document.documentElement || document.body).scrollLeft;

			const scrollTop =
				window.pageYOffset !== undefined
					? window.pageYOffset
					: (document.documentElement || document.body).scrollTop;

			setMousePosition({
				x: e.clientX + scrollLeft,
				y: e.clientY + scrollTop,
			});
		};

		document.addEventListener("mousemove", handle);

		return () => document.removeEventListener("mousemove", handle);
	});
	useEffect(() => {
		const handle = (e) => {
			setRotationPosition({
				left: window.pageYOffset + "deg",
			});
		};

		document.addEventListener("scroll", handle);

		return () => document.removeEventListener("scroll", handle);
	});

	return (
		<main className="projects-page">
			<div
				tabIndex={-1}
				className="mouse-tracker"
				style={{
					transform: `translate(${mousePosition.x - 25}px, ${
						mousePosition.y - 25
					}px) `,
				}}
			></div>
			<div className="pos-indicator">
				x:
				{mousePosition.x}
				<br />
				y:
				{mousePosition.y}
			</div>
			<section className="projects-section">
				<div>
					<div
						className="rotate"
						style={{ rotate: `${rotationPosition.left}` }}
					></div>

					<h1>
						Projects
						{/* This Website contains all of my projects, organized in an
					order I want it to be */}
					</h1>
				</div>

				<ProjectsCards />
			</section>
		</main>
	);
};

interface ProjectProps {
	id: number | null;
	image: { src: string; alt: string } | null;
	title: string | null;
	description: string | null;
	categories: string[] | null;
	tools: string[] | null;
	link: string | null;
}

const ProjectsCards = () => {
	const projects: ProjectProps[] = [
		{
			id: 1,
			image: { src: "lol", alt: "lol" },
			title: "Pomodoro timer with stopwatch",
			description: "",
			categories: ["practice", "personal"],
			tools: ["next"],
			link: "/pomodoro-timer",
		},
		{
			id: 2,
			image: { src: "lol", alt: "lol" },
			title: "Pomodoro timer with stopwatch",
			description: "",
			categories: ["practice", "personal"],
			tools: ["next"],
			link: "/pomodoro-timer",
		},
		{
			id: 3,
			image: { src: "lol", alt: "lol" },
			title: "Pomodoro timer with stopwatch",
			description: "",
			categories: ["practice", "personal"],
			tools: ["next"],
			link: "/pomodoro-timer",
		},
		{
			id: 4,
			image: { src: "lol", alt: "lol" },
			title: "Pomodoro timer with stopwatch",
			description: "",
			categories: ["practice", "personal"],
			tools: ["next"],
			link: "/pomodoro-timer",
		},
		{
			id: 5,
			image: { src: "lol", alt: "lol" },
			title: "Pomodoro timer with stopwatch",
			description: "",
			categories: ["practice", "personal"],
			tools: ["next"],
			link: "/pomodoro-timer",
		},
	];

	return (
		<ul className="projects-cards">
			{projects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</ul>
	);
};

const ProjectCard = ({ project }: { project: ProjectProps }) => {
	const {
		image: { src, alt },
		title,
		description,
		categories,
		tools,
		link,
	} = project;

	return (
		<li className="project-card">
			<Link className="project-link" href={link}>
				<a>
					<div className="image-container">
						<Image
							src={passport}
							alt={alt}
							width="381px"
							height="381px"
						/>
					</div>

					<p className="title">{title}</p>
				</a>
				{/* <p className="project-description">{description}</p>
			<div className="tools-used">
				{tools.map((tool) => (
					<span>{tool}</span>
				))}
			</div>
			<div className="category">
				{categories.map((category) => (
					<span>{category}</span>
				))}
			</div>*/}
			</Link>
		</li>
	);
};

// export const getStaticProps: GetStaticProps = async () => {
// 	// const { userTasks } = useUserTasks();
// 	// Example for including static props in a Next.js function component page.
// 	// Don't forget to include the respective types for any props passed into
// 	// the component.
// 	const items: TaskProps[] = sampleUserData;
// 	return { props: { items } };
// };

export default IndexPage;
