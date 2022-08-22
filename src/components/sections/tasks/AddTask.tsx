import moment from "moment";
import { useState } from "react";
import { useUserTasks } from "../../../contexts/user-tasks";
import { TaskProps } from "../../../interfaces";

const AddTask = () => {
	const { userTasks, addTask } = useUserTasks();

	const [isVisible, setIsVisible] = useState(false);

	const displayOptions = () => {
		setIsVisible(!isVisible);
	};

	const initialFormValues: TaskProps = {
		id: Number(Math.random().toPrecision(12).slice(2, 6)),
		completed: false,
		name: "",
		due_date: moment().calendar(null, {
			sameDay: "[Today], DD MMM",
			nextDay: "[Tomorrow]",
		}),
		schedule: "",
		deadline: "",
		repeat: "",
	};
	const [taskFormValues, setTaskFormValues]: [TaskProps, any] =
		useState(initialFormValues);

	const handleInputChange = (e: any) => {
		let inputTitle: string = e.target.name;
		let inputValue: any = e.target.value;

		if (inputTitle === "add_task") {
			setTaskFormValues({ ...taskFormValues, name: inputValue });
		} else if (inputTitle === "due_date") {
			let date = taskFormValues.due_date === "" ? null : inputValue;

			let dueDate = moment(date).calendar(null, {
				sameDay: "[Today], DD MMM",
				nextDay: "[Tomorrow], DD MMM",
				nextWeek: "[Next] ddd, DD MMM",
				lastDay: "[Yesterday], DD MMM",
				lastWeek: "[Last] ddd, DD MMM",
				sameElse: "DD MMM, [d left]",
			});

			setTaskFormValues({
				...taskFormValues,
				due_date: dueDate,
			});
		} else if (inputTitle === "schedule") {
			setTaskFormValues({ ...taskFormValues, schedule: inputValue });
		} else if (inputTitle === "deadline") {
			setTaskFormValues({ ...taskFormValues, deadline: inputValue });
		} else if (inputTitle === "repeat") {
			setTaskFormValues({ ...taskFormValues, repeat: inputValue });
		}
	};
	const onSubmit = (e: any) => {
		e.preventDefault();

		if (taskFormValues.name !== "") {
			addTask(taskFormValues);
			setTaskFormValues(initialFormValues);
			setIsVisible(false);
		}
	};

	return (
		<form action="" onSubmit={(e: any) => onSubmit(e)}>
			<div className="add-task-input-container">
				<div>
					<textarea
						name="add_task"
						value={taskFormValues.name}
						onChange={(e: any) => handleInputChange(e)}
						placeholder="What would you like to do?"
					/>

					<span onClick={displayOptions}>+</span>
				</div>

				<button type="submit">Add Task</button>
			</div>

			<div className={`options-dropdown ${isVisible ? "" : "hidden"}`}>
				<div>
					<h2> Set Due Day :</h2>

					<div>
						<label htmlFor="task">Date :</label>
						<input
							type="date"
							name="due_date"
							id=""
							onChange={(e: any) => handleInputChange(e)}
						/>
					</div>
					{/* <div>
						<label htmlFor="task">Time :</label>
						<input
							placeholder="Start"
							type="time"
							name="due-time"
							id=""
						/>
					</div> */}
				</div>

				<div>
					<h2>Set Schedule :</h2>

					<div>
						<label htmlFor="task">Date :</label>
						<input
							type="date"
							name="schedule-date"
							id=""
							onChange={(e: any) => handleInputChange(e)}
						/>
					</div>
					<div>
						<label htmlFor="task">Duration :</label>

						<input
							placeholder="Start"
							type="time"
							name="schedule-start-time"
							id=""
						/>
						<input
							placeholder="End"
							type="time"
							name="schedule-end-time"
							id=""
						/>
					</div>
				</div>

				<div>
					<h2>Set your Deadline :</h2>
					<input
						type="datetime-local"
						name="deadline"
						id=""
						onChange={(e: any) => handleInputChange(e)}
					/>
				</div>

				<div>
					<h2>Set Repeat</h2>

					<select
						name="repeat"
						id=""
						onChange={(e: any) => handleInputChange(e)}
					>
						<option value="No Repeat">No Repeat</option>
						<option value="Daily">Daily</option>
						<option value="Every Weekday">Every Weekday</option>
						<option value="Weekly">Weekly</option>
						<option value="Monthly">Monthly</option>
						<option value="Yearly">Yearly</option>
						<option value="No Repeat">No Repeat</option>
					</select>
				</div>
				{/* <div>
					<label htmlFor="task">Repeat Ends</label>

					<select
						name="repeat"
						id=""
						onChange={(e: any) => handleInputChange(e)}
					>
						<option value="No Repeat">No Repeat</option>
						<option value="Daily">Daily</option>
						<option value="Every Weekday">Every Weekday</option>
						<option value="Weekly">Weekly</option>
						<option value="Monthly">Monthly</option>
						<option value="Yearly">Yearly</option>
						<option value="No Repeat">No Repeat</option>
					</select>
				</div> */}
			</div>
		</form>
	);
};

export default AddTask;
