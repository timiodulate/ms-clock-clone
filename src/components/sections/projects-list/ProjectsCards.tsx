import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ClassProp, ProjectProps } from "./Props";
import { candy } from "../../../assets/images";

const ProjectsCards = ({
	filteredProjects,
}: {
	filteredProjects: ProjectProps[];
}) => {
	return (
		<motion.ul className="projects-cards" layout>
			{filteredProjects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</motion.ul>
	);
};

type ProjectCardProps = ClassProp & {
	project: ProjectProps;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
	const {
		id,
		image: { src, alt },
		title,
		link,
	} = project;

	const stopPulsating = (currentTitle, leave?: boolean) => {
		const allProjectCard = document.querySelectorAll(".project-card");

		allProjectCard.forEach((card) => {
			if (card.id != currentTitle) {
				if (leave) {
					card.classList.remove("test");
				} else {
					card.classList.add("test");
				}
			}
		});
	};

	const anim = {
		hidden: {
			opacity: 0,
			scale: 0,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 1 },
		},
		exit: {
			opacity: 0,
			scale: 0,
		},
	};

	return (
		<motion.li className="project-card-wrapper">
			<AnimatePresence>
				<motion.div
					className="project-card "
					id={`${id}`}
					drag
					variants={anim}
					initial="hidden"
					whileInView="visible"
					exit="exit"
					onMouseEnter={() => {
						stopPulsating(`${id}`);
					}}
					onMouseLeave={(e) => {
						stopPulsating(`${id}`, true);
					}}
				>
					<Link href={link}>
						<a className="project-link hover">
							<div className="image-container">
								<Image
									src={src || candy}
									alt={alt}
									layout="fill"
								/>
							</div>

							<p className="title ">{title}</p>
						</a>
					</Link>
				</motion.div>
			</AnimatePresence>
		</motion.li>
	);
};

export default ProjectsCards;
