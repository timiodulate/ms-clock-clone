import moment from "moment";
import { useState } from "react";
import { useUserTasks } from "../contexts/user-tasks";
import { TaskProps } from "../interfaces";

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
		due_date: {
			date: [],
			time: [],
		},
		schedule: {
			start: {
				date: [moment().calendar()],
				time: [],
			},
			end: {
				date: [],
				time: [],
			},
			duration: 0,
		},
		deadline: {
			date: [],
			time: [],
		},
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
			if (e.target.type === "date") {
				setTaskFormValues({
					...taskFormValues,
					due_date: {
						...taskFormValues.due_date,
						date: [inputValue || ""],
					},
				});
			} else {
				setTaskFormValues({
					...taskFormValues,
					due_date: {
						...taskFormValues.due_date,
						time: [inputValue || ""],
					},
				});
			}
		} else if (inputTitle.includes("schedule")) {
			if (inputTitle.includes("start")) {
				if (e.target.type === "date") {
					setTaskFormValues({
						...taskFormValues,
						schedule: {
							...taskFormValues.schedule,
							start: {
								...taskFormValues.schedule.start,
								date: [inputValue || ""],
							},
						},
					});
				} else {
					setTaskFormValues({
						...taskFormValues,
						schedule: {
							...taskFormValues.schedule,
							start: {
								...taskFormValues.schedule.start,
								time: [inputValue || ""],
							},
						},
					});
				}
			} else if (inputTitle.includes("end")) {
				if (e.target.type === "date") {
					setTaskFormValues({
						...taskFormValues,
						schedule: {
							end: {
								date: [inputValue || ""],
							},
						},
					});
				} else {
					setTaskFormValues({
						...taskFormValues,
						schedule: {
							end: {
								time: [inputValue || ""],
							},
						},
					});
				}
			}
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
						<input
							name="due_date"
							id=""
							onChange={(e: any) => handleInputChange(e)}
							placeholder="Date"
							aria-placeholder="Date"
							// min={today}
							onFocus={(e: any) => {
								e.target.type = "date";
							}}
							onBlur={(e: any) => {
								e.target.value == ""
									? (e.target.type = "text")
									: (e.target.type = "date");
							}}
							// onChange={(e: any) => {
							// 	e.target.value == ""
							// 		? (e.target.type = "text")
							// 		: (e.target.type = "date");
							// 	setDueDateVal(e.target.value);
							// }}
						/>

						<input
							name="due_date"
							id=""
							onChange={(e: any) => handleInputChange(e)}
							placeholder="Time"
							aria-placeholder="Date"
							// min={today}
							onFocus={(e: any) => {
								e.target.type = "time";
							}}
							onBlur={(e: any) => {
								e.target.value == ""
									? (e.target.type = "text")
									: (e.target.type = "time");
							}}
							// onChange={(e: any) => {
							// 	e.target.value == ""
							// 		? (e.target.type = "text")
							// 		: (e.target.type = "time");
							// 	setDueDateVal(e.target.value);
							// }}
						/>
					</div>
				</div>

				<div>
					<h2>Set Schedule :</h2>

					<div>
						<div>
							<label htmlFor="task">Start :</label>

							<div>
								<input
									name="schedule-start"
									id=""
									onChange={(e: any) => handleInputChange(e)}
									placeholder="Date"
									aria-placeholder="Date"
									// min={today}
									onFocus={(e: any) => {
										e.target.type = "date";
									}}
									onBlur={(e: any) => {
										e.target.value == ""
											? (e.target.type = "text")
											: (e.target.type = "date");
									}}
									// onChange={(e: any) => {
									// 	e.target.value == ""
									// 		? (e.target.type = "text")
									// 		: (e.target.type = "date");
									// 	setDueDateVal(e.target.value);
									// }}
								/>

								<input
									name="schedule-start"
									id=""
									onChange={(e: any) => handleInputChange(e)}
									placeholder="Date"
									aria-placeholder="Date"
									// min={today}
									onFocus={(e: any) => {
										e.target.type = "time";
									}}
									onBlur={(e: any) => {
										e.target.value == ""
											? (e.target.type = "text")
											: (e.target.type = "time");
									}}
									// onChange={(e: any) => {
									// 	e.target.value == ""
									// 		? (e.target.type = "text")
									// 		: (e.target.type = "time");
									// 	setDueDateVal(e.target.value);
									// }}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="task">End :</label>

							<div>
								<input
									name="schedule-end"
									id=""
									onChange={(e: any) => handleInputChange(e)}
									placeholder="Date"
									aria-placeholder="Date"
									// min={today}
									onFocus={(e: any) => {
										e.target.type = "date";
									}}
									onBlur={(e: any) => {
										e.target.value == ""
											? (e.target.type = "text")
											: (e.target.type = "date");
									}}
									// onChange={(e: any) => {
									// 	e.target.value == ""
									// 		? (e.target.type = "text")
									// 		: (e.target.type = "date");
									// 	setDueDateVal(e.target.value);
									// }}
								/>

								<input
									name="schedule-end"
									id=""
									onChange={(e: any) => handleInputChange(e)}
									placeholder="Date"
									aria-placeholder="Date"
									// min={today}
									onFocus={(e: any) => {
										e.target.type = "time";
									}}
									onBlur={(e: any) => {
										e.target.value == ""
											? (e.target.type = "text")
											: (e.target.type = "time");
									}}
									// onChange={(e: any) => {
									// 	e.target.value == ""
									// 		? (e.target.type = "text")
									// 		: (e.target.type = "time");
									// 	setDueDateVal(e.target.value);
									// }}
								/>
							</div>
						</div>
					</div>

					<div>
						<label htmlFor="task">Duration :</label>

						<div>
							<input
								name="schedule-duration"
								id=""
								onChange={(e: any) => handleInputChange(e)}
								placeholder="Date"
								aria-placeholder="Date"
								// min={today}
								onFocus={(e: any) => {
									e.target.type = "date";
								}}
								onBlur={(e: any) => {
									e.target.value == ""
										? (e.target.type = "text")
										: (e.target.type = "date");
								}}
								// onChange={(e: any) => {
								// 	e.target.value == ""
								// 		? (e.target.type = "text")
								// 		: (e.target.type = "date");
								// 	setDueDateVal(e.target.value);
								// }}
							/>

							<input
								name="schedule-duration"
								id=""
								onChange={(e: any) => handleInputChange(e)}
								placeholder="Date"
								aria-placeholder="Date"
								// min={today}
								onFocus={(e: any) => {
									e.target.type = "time";
								}}
								onBlur={(e: any) => {
									e.target.value == ""
										? (e.target.type = "text")
										: (e.target.type = "time");
								}}
								// onChange={(e: any) => {
								// 	e.target.value == ""
								// 		? (e.target.type = "text")
								// 		: (e.target.type = "time");
								// 	setDueDateVal(e.target.value);
								// }}
							/>
						</div>
					</div>
				</div>

				<div>
					<h2>Set your Deadline :</h2>

					<div>
						<div>
							<input
								name="deadline-date"
								id=""
								onChange={(e: any) => handleInputChange(e)}
								placeholder="Date"
								aria-placeholder="Date"
								// min={today}
								onFocus={(e: any) => {
									e.target.type = "date";
								}}
								onBlur={(e: any) => {
									e.target.value == ""
										? (e.target.type = "text")
										: (e.target.type = "date");
								}}
								// onChange={(e: any) => {
								// 	e.target.value == ""
								// 		? (e.target.type = "text")
								// 		: (e.target.type = "date");
								// 	setDueDateVal(e.target.value);
								// }}
							/>
						</div>

						<div>
							<input
								name="deadline-time"
								id=""
								onChange={(e: any) => handleInputChange(e)}
								placeholder="Date"
								aria-placeholder="Date"
								// min={today}
								onFocus={(e: any) => {
									e.target.type = "time";
								}}
								onBlur={(e: any) => {
									e.target.value == ""
										? (e.target.type = "text")
										: (e.target.type = "time");
								}}
								// onChange={(e: any) => {
								// 	e.target.value == ""
								// 		? (e.target.type = "text")
								// 		: (e.target.type = "time");
								// 	setDueDateVal(e.target.value);
								// }}
							/>
						</div>
					</div>
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
