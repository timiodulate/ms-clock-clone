import { useState } from "react";
import "./styles.css";

export default function App() {
	const [searchInput, setSearchInput] = useState("");
	const [searchResult, setSearchResult] = useState("");

	const a = {
		user: {
			id: 1,
			name: {
				firstName: "James",
				lastName: "Ibori",
			},
			location: {
				city: "Ikoyi",
				state: "Lagos",
				address: "One expensive house like that",
			},
		},
	};

	const handleChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		pathGet(a, searchInput);
	};

	let arr = ["a"];
	let valFound = false;

	const pathGet = (obj, query) => {
		for (const key in obj) {
			const objVal = obj[key];

			if (valFound) {
				break;
			}

			arr.push(key);

			if (typeof objVal === "object") {
				pathGet(objVal, query);
			} else {
				if (objVal.toString().toLowerCase() === query.toLowerCase()) {
					valFound = true;
					break;
				} else {
					arr.pop();
				}
			}
		}

		// if (typeof result !== "object") {
		if (valFound) {
			setSearchResult(arr.join("."));
		} else {
			setSearchResult("Not Found");
		}
	};

	return (
		<div className="App">
			<h1>Quick Search Engine</h1>

			<div>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input value={searchInput} onChange={handleChange} />
					<button type="submit">Search</button>
				</form>

				<p>
					Result:{" "}
					{typeof searchResult === "object"
						? Object.toString()
						: searchResult}
				</p>
			</div>
		</div>
	);
}
