/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, FC, useContext, useState, useEffect } from "react";
import { TaskProps } from "../interfaces";
import { sampleUserData } from "../utils/sample-data";

interface Props {
	initialTasks?: TaskProps[];
}

interface UserTasksContext {
	userTasks: TaskProps[];
	addTask: (user?: any) => void;
	removeTask: (user?: any) => void;
	handleTaskStatusChange: (user?: any) => void;
	filterTasks: (user?: any) => void;
}

export const UserTasksContextImpl = createContext<UserTasksContext>(null!);

export function useUserTasks() {
	return useContext(UserTasksContextImpl);
}

export const UserTasksProvider: FC<Props> = ({
	children,
	initialTasks = sampleUserData,
}) => {
	const [userTasks, setTasks]: [TaskProps[], any] = useState(initialTasks);
	const [originalTasks, setOriginalTasks]: [TaskProps[], any] =
		useState(initialTasks);

	const addTask = (taskData: any) => {
		setTasks([...userTasks, taskData]);
		setOriginalTasks([...originalTasks, taskData]);
	};

	const removeTask = (taskID) => {};

	const handleTaskStatusChange = (id: string | number) => {
		const newArr = userTasks.map((data) => {
			if (data.id == Number(id)) {
				data.completed = !data.completed;
				return data;
			} else {
				return data;
			}
		});

		setTasks(newArr);
	};

	const filterTasks = (param: any) => {
		if (param.status) {
			param.status === "Completed"
				? setTasks(
						originalTasks.filter((task) => task.completed === true)
				  )
				: setTasks(
						originalTasks.filter(
							(task) =>
								task.completed === false || !task.completed
						)
				  );
		} else {
			setTasks(originalTasks);
		}
	};

	return (
		<UserTasksContextImpl.Provider
			value={{
				userTasks,
				addTask,
				removeTask,
				handleTaskStatusChange,
				filterTasks,
			}}
		>
			{children}
		</UserTasksContextImpl.Provider>
	);
};
