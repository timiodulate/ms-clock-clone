import React, { ReactNode, useState } from "react";
import { useUserTasks } from "../contexts/user-tasks";

const Sidebar = () => {
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

	return (
		<aside>
			<div>
				<h1>Filter</h1>

				{/* <div>Edit</div> */}
			</div>

			<form>
				<div>
					<h1>Status</h1>

					<div className="roles d-flex align-items-center t-text-c-04 mb-4 ">
						{["Completed", "helpee"].map((rolee) => (
							<button
								name="status"
								value={rolee}
								onClick={(e: any) => handleInputChange(e)}
							>
								{rolee}
							</button>
						))}
					</div>
				</div>
			</form>
		</aside>
	);
};

export default Sidebar;
