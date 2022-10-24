import { ProjectProps } from "../components/projects-list";
import { User } from "../interfaces";

/** Dummy user data. */
export const sampleUserData: User[] = [
	{
		id: 101,
		name: "Alice",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
	{
		id: 102,
		name: "Bob",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
	{
		id: 103,
		name: "Caroline",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
	{
		id: 104,
		name: "Dave",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
];

import {
	pomodoroProject,
	hhhfoundationImg,
	dzinezImg,
	portfolioImg,
	articlePreviewImg,
} from "../assets/images";

export const projects: ProjectProps[] = [
	{
		id: 2,
		image: { src: hhhfoundationImg, alt: "Pomodoro timer with stopwatch" },
		title: "3hfoundation",
		// isPrivate: true,
		categories: ["works"],
		tools: ["React", "(S)css", "Bootstrap", "Context"],
		description:
			"A funtional and responsive website of HeadHeartHand Foundation which is a non-profit organization located in Surrey, British Columbia, Canada and open to all members of the public.",
		// repoLink: "",
		link: "https://3hfoundation.ca/",
		bgPosition: "-40px",
	},

	{
		id: 3,
		image: { src: dzinezImg, alt: "Pomodoro timer with stopwatch" },
		title: "D-zinez",
		// isPrivate: true,
		categories: ["works", "Volunteer"],
		tools: ["React", "(S)css", "Bootstrap"],
		description: "A funtional and responsive e-commerce website",
		// repoLink: "",
		link: "https://d-ecommerce.netlify.app/",
		bgPosition: "center top",
	},
	{
		id: 1,
		image: { src: portfolioImg, alt: "Pomodoro timer with stopwatch" },
		title: "Portfolio",
		categories: ["Projects", "personal"],
		// isPrivate: true,
		tools: ["React", "(S)css", "Bootstrap"],
		description: "My Portfolio",
		// repoLink: "",
		link: "https://timiodulate.me/",
		bgPosition: "left",
	},
	{
		id: 1,
		image: { src: pomodoroProject, alt: "Pomodoro timer with stopwatch" },
		title: "Pomodoro timer with stopwatch",
		description: "",
		categories: ["projects", "personal"],
		tools: ["next"],
		link: "/pomodoro-timer",
		bgPosition: "center top",
	},
	{
		id: 4,
		image: { src: articlePreviewImg, alt: "Pomodoro timer with stopwatch" },
		// isPrivate: false,
		title: "Article Preview Component",
		categories: ["project", "Challenges"],
		tools: ["Javascript"],
		description:
			"Your users should be able to: View the optimal layout for the component depending on their device's screen size AND See the social media share links when they click the share icon.",
		// repoLink: "",
		link: "",
		bgPosition: "center top",
	},
];
