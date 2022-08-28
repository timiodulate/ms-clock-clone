import React, { ReactNode, useState } from "react";
import { useUserTasks } from "../contexts/user-tasks";

const FilterSidebar = ({ isVisible }) => {
	const { filterTasks } = useUserTasks();

	const [filterValues, setFilterValues] = useState({ status: "" });

	const handleInputChange = (e: any) => {
		e.preventDefault();
		let inputTitle: string = e.target.name;
		let inputValue: any = e.target.value;

		if (inputTitle === "status") {
			const valExists = inputValue === filterValues.status;

			setFilterValues({
				...filterValues,
				status: valExists ? "" : inputValue,
			});

			filterTasks({ status: valExists ? "" : inputValue });
		}
	};

	const filterItems = {
		smartList: [
			{ id: 1, title: "All" },
			{ id: 2, title: "Today" },
		],
		status: [
			{ id: 1, title: "Completed" },
			{ id: 2, title: "Wont Do" },
		],
	};

	return (
		<aside className={`filter-sidebar ${isVisible ? "" : "hidden"}`}>
			<div className="list">
				<h1>Smart List</h1>

				<ul>
					{filterItems.smartList.map((list) => (
						<li key={list.id}>
							<button
								name="smart-list"
								value={list.title}
								onClick={(e: any) => handleInputChange(e)}
							>
								<span>I</span>

								<div>{list.title}</div>
							</button>
						</li>
					))}
				</ul>
			</div>
			<form>
				<h1>Filter</h1>

				<div></div>
			</form>

			<div className="list">
				<h1>Status</h1>

				<ul className="roles d-flex align-items-center t-text-c-04 mb-4 ">
					{filterItems.status.map((list) => (
						<li>
							<button
								name="status"
								value={list.title}
								onClick={(e: any) => handleInputChange(e)}
							>
								{list.title}
							</button>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
};

export default FilterSidebar;
