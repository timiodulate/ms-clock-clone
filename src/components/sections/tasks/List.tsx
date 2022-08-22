import React, { useState } from "react";
import { User } from "../../../interfaces";

type ListProps = {
	items: User[];
};

const List = ({ items }: ListProps) => (
	<ul>
		{items.map((item) => (
			<li key={item?.id}>
				<ListItem data={item} />
			</li>
		))}
	</ul>
);

export default List;

import Link from "next/link";
import { useUserTasks } from "../../../contexts/user-tasks";

type Props = {
	data: User;
};

const ListItem = ({ data }: Props) => {
	const { handleTaskStatusChange } = useUserTasks();

	return (
		<div className={data.completed ? "completed" : ""}>
			<input
				type="checkbox"
				id="item.id"
				value={data.completed ? "completed" : "not-completed"}
				checked={data.completed}
				onChange={() => handleTaskStatusChange(data.id)}
			/>
			<Link href="/[id]" as={`/${data.id}`}>
				<a>
					{/* {data.id}: */}
					{data.name}
				</a>
			</Link>
		</div>
	);
};
