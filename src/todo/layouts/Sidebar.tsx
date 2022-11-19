import Link from "next/link";
import React from "react";
import {
	BsListTask,
	BsFillCalendar2WeekFill,
	BsSearch,
	BsInfoCircleFill,
} from "react-icons/bs";
import { TbApi } from "react-icons/tb";

const Sidebar = () => {
	const sidebarItems = {
		top: [
			{
				id: 1,
				title: "Tasks",
				icon: <BsListTask />,
				link: "/",
			},
			{
				id: 2,
				title: "Calender View",
				icon: <BsFillCalendar2WeekFill />,
				link: "/calender",
			},
			{
				id: 3,
				title: "Search",
				icon: <BsSearch />,
				link: "/search",
			},
		],
		bottom: [
			{
				id: 1,
				title: "About",
				icon: <BsInfoCircleFill />,
				link: "/about",
			},
			{
				id: 2,
				title: "Users API",
				icon: <TbApi />,
				link: "/api/",
			},
		],
	};

	return (
		<aside className="primary-sidebar">
			<nav>
				<ul>
					{sidebarItems.top.map((item) => (
						<li key={item.id} title={item.title}>
							<Link href={item.link}>
								<a>
									<span className="icon-container">
										{item.icon}
									</span>
								</a>
							</Link>{" "}
						</li>
					))}
				</ul>
				<ul>
					{sidebarItems.bottom.map((item) => (
						<li key={item.id} title={item.title}>
							<Link href={item.link}>
								<a>
									<span className="icon-container">
										{item.icon}
									</span>
								</a>
							</Link>{" "}
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
