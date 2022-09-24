import React, { useState } from "react";
import { User } from "../../../interfaces";
import { MdHourglassBottom } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";

type ListProps = {
	items: User[];
	completed?: boolean;
	updateTasks?: any;
};

const List = ({ items, completed, updateTasks }: ListProps) => (
	<ul>
		{items.map((item) => (
			<li key={item?.id}>
				<ListItem data={item} updateTasks={updateTasks} />
			</li>
		))}
	</ul>
);

export default List;

import Link from "next/link";
import { useUserTasks } from "../../../contexts/user-tasks";

type Props = {
	data: User;
	updateTasks: any;
};

const ListItem = ({ data, updateTasks }: Props) => {
	const { handleTaskStatusChange } = useUserTasks();

	console.log(data?.schedule.start.date[1]);

	return (
		<div className={data.completed ? "completed" : ""}>
			<input
				type="checkbox"
				id="item.id"
				value={data.completed ? "completed" : "not-completed"}
				checked={data.completed}
				onChange={() => {
					handleTaskStatusChange(data.id);
					updateTasks(data.id);
				}}
			/>
			<Link href="/[id]" as={`/${data.id}`}>
				<a>
					<h2>{data.name}</h2>

					<div>
						<p>
							<span>
								<GiAlarmClock />
							</span>

							{data?.schedule.start.date[1] === "Today"
								? data?.schedule.start.time[0] ||
								  data?.schedule.start.date[1]
								: data?.schedule.start.date[1]}
						</p>

						<p>
							<span>
								<MdHourglassBottom />
							</span>
							{data.deadline.time[0] || data.deadline.date[1]}
						</p>
					</div>
				</a>
			</Link>
		</div>
	);
};
