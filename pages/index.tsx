import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { passport, passport2 } from "../src/assets/images";

{
	/* This Website contains all of my projects, organized in an
					order I want it to be */
}

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

const IndexPage = () => {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});
	const [rotationPosition, setRotationPosition] = useState({
		left: "",
	});

	const [myElementIsVisible, updateMyElementIsVisible] = useState(false);

	const [elementPosition, setElementPosition] = useState(0);

	const myRef = useRef();

	useEffect(() => {
		document.firstElementChild.classList.add("hide-scrollbar");
		console.log(document);

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
	}, []);

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

		observeCards();
	}, []);

	const [allProjects, setAllProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [activeFilter, setActiveFilter] = useState("all-projects");

	const fetchProjects = () => {
		setAllProjects(projects);
		setFilteredProjects(projects);
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
			<div
				tabIndex={-1}
				className="mouse-tracker "
				style={{
					transform: `translate(${mousePosition.x - 5}px, ${
						mousePosition.y - 5
					}px) `,
				}}
			></div>
			<div
				tabIndex={-1}
				className="mouse-tracker secondary"
				style={{
					transform: `translate(${mousePosition.x - 25}px, ${
						mousePosition.y - 25
					}px) `,
				}}
			></div>

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

				<div>
					<span>=</span>
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

interface ProjectProps {
	id: number | null;
	image: { src: string; alt: string } | null;
	title: string | null;
	description: string | null;
	categories: string[] | null;
	tools: string[] | null;
	link: string | null;
}

const ProjectsCards = ({
	filteredProjects,
}: {
	filteredProjects: ProjectProps[];
}) => {
	return (
		<ul className="projects-cards">
			{filteredProjects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</ul>
	);
};

const ProjectCard = ({ project }: { project: ProjectProps }) => {
	const {
		image: { src, alt },
		title,
		link,
	} = project;

	return (
		<li className="project-card">
			<Link className="project-link" href={link}>
				<a>
					<div className="image-container">
						<Image
							src={passport2}
							alt={alt}
							width="381px"
							height="381px"
						/>
					</div>

					<p className="title">{title}</p>
				</a>
			</Link>
		</li>
	);
};

export default IndexPage;

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
	const [menuVisible, setMenuVisible] = useState(false);

	const filterData: string[] = [
		"all-projects",
		"practice",
		"personal",
		"work",
	];

	const selectFilter = (selected: string): void => {
		setActiveFilter(selected);
		setMenuVisible(false);
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
		<div className={`filter ${className}`}>
			<div className="menu-visible">
				<span className="menu-title">Filter:</span>

				<span
					className="menu-toggle"
					onClick={() => setMenuVisible(!menuVisible)}
				>
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
