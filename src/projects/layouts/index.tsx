import React from "react";
import { MouseTracker, Filter } from "../components";
import ScrollProgressIndicator from "../components/MouseProgressTrack";
import { useProjectsList } from "../contexts";

import { motion, AnimatePresence } from "framer-motion";

const ProjectsLayout = ({ children }) => {
	return (
		<main className="projects-list-layout">
			<MouseTracker />

			<Header />

			{children}
		</main>
	);
};

export default ProjectsLayout;

const Header = () => {
	const { myElementIsVisible } = useProjectsList();

	return (
		<header className="page-header">
			<div className="title-container">
				<div className="brand-title">
					<ScrollProgressIndicator />

					<h1>TheCopyDev</h1>
				</div>

				<motion.span
					className={`separator ${
						myElementIsVisible ? "show" : "hide"
					}`}
				></motion.span>

				<span
					className={`heading ${
						myElementIsVisible ? "show" : "hide"
					}`}
				>
					Projects
				</span>
			</div>

			<Filter className={myElementIsVisible ? "show" : "hide"} />

			<div className="hover">MENU =</div>
		</header>
	);
};
