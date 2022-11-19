/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { createContext, FC, useContext, useState, useEffect } from "react";
import { TaskProps } from "../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import _ from "lodash";

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
	const [originalTasks, setOriginalTasks]: [TaskProps[], any] =
		useState(initialTasks);
	const [userTasks, setUserTasks]: [TaskProps[], any] =
		useState(initialTasks);

	useEffect(() => {
		processTasksTimeDate(originalTasks);
	}, []);

	const addTask = (taskData: any) => {
		console.log(taskData);
		processTasksTimeDate([...originalTasks, taskData]);
		setOriginalTasks([...originalTasks, taskData]);
	};

	const processTasksTimeDate = (tasks: TaskProps[]) => {
		const tasksCopy: TaskProps[] = _.cloneDeep(tasks);

		const processed = tasksCopy.map((task) => {
			const getAbs = (
				date: string | null,
				options: {
					moment?: any;
					date?: any;
					time?: any;
				}
			) => {
				let result;

				if (options.moment) {
					result = moment(date).calendar(null, {
						sameDay: "[Today]",
						nextDay: "[Tomorrow]",
						nextWeek: "[Next Week]",
						lastDay: "[Yesterday]",
						lastWeek: "[Last Week]",
						sameElse: "[in]  [d left]",
					});
				} else {
					result = moment(date).calendar(null, {
						sameDay: "[Today], DD MMM",
						nextDay: "[Tomorrow], DD MMM",
						nextWeek: "[Next] ddd, DD MMM",
						lastDay: "[Yesterday], DD MMM",
						lastWeek: "[Last] ddd, DD MMM",
						sameElse: "DD MMM, [d left]",
					});
				}

				return result;
			};

			task.due_date.date[1] = task.schedule.start.date[0]
				? getAbs(task.schedule.start.date[0], {
						moment: true,
				  })
				: false;

			task.schedule.start.date[1] = getAbs(
				task.schedule?.start?.date.length === 0
					? moment().format()
					: task.schedule.start.date[0],
				{
					moment: true,
				}
			);

			task.deadline.date[1] = (() => {
				if (task.deadline.date[0]) {
					return getAbs(task.deadline.date[0], {
						moment: true,
					});
				} else {
					if (task.due_date.date[1]) {
						task.deadline.date[0] = task.due_date.date[0];

						return task.due_date.date[1];
					} else {
						return "No deadline";
					}
				}
			})();

			task.deadline.time[1] = task.due_date.time[1]
				? task.due_date.time[1]
				: task.due_date.time[1] || "No deadline";

			return task;
		});

		setUserTasks(processed);
	};

	const removeTask = (taskID) => {};

	const handleTaskStatusChange = (id: string | number) => {
		const newArr = originalTasks.map((data) => {
			if (data.id == Number(id)) {
				data.completed = !data.completed;
				return data;
			} else {
				return data;
			}
		});

		setOriginalTasks(newArr);
		processTasksTimeDate(newArr);
	};

	const filterTasks = (param: any) => {
		if (param.status) {
			param.status === "Completed"
				? setUserTasks(
						originalTasks.filter((task) => task.completed === true)
				  )
				: setUserTasks(
						originalTasks.filter(
							(task) =>
								task.completed === false || !task.completed
						)
				  );
		} else {
			setUserTasks(originalTasks);
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
