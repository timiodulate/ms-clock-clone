import React, { useState, useEffect, useRef } from "react";
import {
	pomodoroProject,
	hhhfoundationImg,
	dzinezImg,
	portfolioImg,
	articlePreviewImg,
} from "../src/assets/images";
import {
	ProjectProps,
	MouseTracker,
	Filter,
	ProjectsCards,
} from "../src/components/sections/projects-list";

{
	/* This Website contains all of my projects, organized in an
					order I want it to be */
}

const projects: ProjectProps[] = [
	{
		id: 1,
		image: { src: pomodoroProject, alt: "Pomodoro timer with stopwatch" },
		title: "Pomodoro timer with stopwatch",
		description: "",
		categories: ["personal"],
		tools: ["next"],
		link: "/pomodoro-timer",
	},

	{
		id: 2,
		image: { src: hhhfoundationImg, alt: "Pomodoro timer with stopwatch" },
		title: "3hfoundation",
		// isPrivate: true,
		categories: ["Featured", "Projects"],
		tools: ["React", "(S)css", "Bootstrap", "Context"],
		description:
			"A funtional and responsive website of HeadHeartHand Foundation which is a non-profit organization located in Surrey, British Columbia, Canada and open to all members of the public.",
		// repoLink: "",
		link: "https://3hfoundation.ca/",
	},
	{
		id: 3,
		image: { src: dzinezImg, alt: "Pomodoro timer with stopwatch" },
		title: "D-zinez",
		// isPrivate: true,
		categories: ["Projects", "Volunteer"],
		tools: ["React", "(S)css", "Bootstrap"],
		description: "A funtional and responsive e-commerce website",
		// repoLink: "",
		link: "https://d-ecommerce.netlify.app/",
	},
	{
		id: 1,
		image: { src: portfolioImg, alt: "Pomodoro timer with stopwatch" },
		title: "Portfolio",
		categories: ["Featured", "Projects"],
		// isPrivate: true,
		tools: ["React", "(S)css", "Bootstrap"],
		description: "My Portfolio",
		// repoLink: "",
		link: "https://timiodulate.me/",
	},
	{
		id: 4,
		image: { src: articlePreviewImg, alt: "Pomodoro timer with stopwatch" },
		// isPrivate: false,
		title: "Article Preview Component",
		categories: ["Challenges"],
		tools: ["Javascript"],
		description:
			"Your users should be able to: View the optimal layout for the component depending on their device's screen size AND See the social media share links when they click the share icon.",
		// repoLink: "",
		link: "",
	},
];

const IndexPage = () => {
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
