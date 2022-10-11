import Layout from "../../src/layouts/Layout";
import { TaskProps } from "../../src/interfaces";
import { sampleUserData } from "../../src/utils/sample-data";
import List from "../../src/components/sections/tasks/List";
import { useUserTasks } from "../../src/contexts/user-tasks";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";

type Props = {
	items: TaskProps[];
};

const IndexPage = ({ items }: Props) => {
	const { userTasks } = useUserTasks();

	const initialSectionsData = [
		{
			id: 1,
			title: "Overdue",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
		{
			id: 2,
			title: "Beyond Deadline",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
		{
			id: 3,
			title: "Today",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
		{
			id: 33,
			title: "Tomorrow",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
		{
			id: 4,
			title: "Routine",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
		{
			id: 5,
			title: "Completed",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
		{
			id: 6,
			title: "Wont Do",
			tasks: [],
			tasksCount: 0,
			open: false,
		},
	];

	const [sectionsData, setSectionsData] = useState(initialSectionsData);

	useEffect(() => {
		updateTasks();
	}, [userTasks]);

	const updateTasks = () => {
		const newArr = sectionsData.map((sectionData) => {
			if (sectionData.title === "Today") {
				// return tasks that are not yet completed,
				// with schedule start date and time within today
				// with deadline that isnt past
				sectionData.tasks = userTasks.filter(
					(task) =>
						task.completed !== true &&
						task?.schedule.start.date[1] === "Today" &&
						(task.deadline.date.length === 0 ||
							task.deadline.time.length === 0 ||
							task.deadline.date.includes("No deadline") ||
							task.deadline.date[1] === "Today")
				);

				sectionData.tasksCount = sectionData.tasks.length;
			} else if (sectionData.title === "Tomorrow") {
				// return tasks that are not yet completed,
				// with schedule start date and time within today
				// with deadline that isnt past
				sectionData.tasks = userTasks.filter(
					(task) =>
						task.completed !== true &&
						task?.schedule.start.date[1] === "Tomorrow" &&
						(task.deadline.date.length === 0 ||
							task.deadline.time.length === 0 ||
							task.deadline.date.includes("No deadline") ||
							task.deadline.date[1] === "Tomorrow")
				);

				sectionData.tasksCount = sectionData.tasks.length;
			} else if (sectionData.title === "Completed") {
				sectionData.tasks = userTasks.filter(
					(task) => task.completed === true
				);

				sectionData.tasksCount = sectionData.tasks.length;
			} else if (sectionData.title === "Completed") {
				// return tasks that have been marked completed
				sectionData.tasks = userTasks.filter(
					(task) => task.completed === true
				);

				sectionData.tasksCount = sectionData.tasks.length;
			}
			return sectionData;
		});

		setSectionsData(newArr);
	};

	const toggleSection = (id: number) => {
		const newArr = sectionsData.map((sectionData) => {
			if (sectionData.id === id) {
				sectionData.open = !sectionData.open;
			}
			return sectionData;
		});

		setSectionsData(newArr);
	};

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<main className="home-page">
				{sectionsData.map((sectionData) => {
					const { id, title, tasks, tasksCount, open } = sectionData;

					if (tasksCount === 0) {
						return null;
					}

					return (
						<section key={id} className={open ? "" : "hidden"}>
							<button onClick={() => toggleSection(id)}>
								<span className="icon-container">
									{open ? (
										<BiChevronDown />
									) : (
										<BiChevronRight />
									)}
								</span>

								<div>
									<h1>{title}</h1>

									<span>{tasksCount}</span>
								</div>
							</button>
							{/* <p>
						Example fetching data from inside{" "}
						<code>getStaticProps()</code>.
					</p> */}
							<List items={tasks} updateTasks={updateTasks} />
						</section>
					);
				})}
			</main>
		</Layout>
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
