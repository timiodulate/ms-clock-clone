import * as React from "react";
import { useUserTasks } from "../../contexts/user-tasks";

import { TaskProps } from "../../interfaces";

type ListDetailProps = {
	item: TaskProps;
};

const ListDetail = ({ item: user }: ListDetailProps) => {
	const { handleTaskStatusChange, userTasks } = useUserTasks();

	return (
		<div>
			<div>
				<input
					type="checkbox"
					name=""
					id=""
					checked={user.completed}
					onChange={() => handleTaskStatusChange(user.id)}
				/>

				<div>
					<p>{user.due_date}</p>

					<p>{user.schedule}</p>

					<p>{user.repeat}</p>
				</div>
			</div>
			<h1>Detail for {user.name}</h1>
			<textarea
				placeholder="Description"
				name=""
				id=""
				// cols="30"
				// rows="10"
			></textarea>
		</div>
	);
};

export default ListDetail;
