import { useState } from "react";
// import "./styles.css";

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

function SearchingChallenge(str) {
	const strArr = str.split("");
	let outputArr = [];
	let presentValArr = [];
	let newStrArr = [];

	strArr.map((val, index) => {
		const firstVal = strArr[0];

		if (index >= 1) {
			console.log(val);

			if (presentValArr.length == firstVal) {
				newStrArr.push(val);
				if (presentValArr.includes(val)) {
					const test = newStrArr.filter((v) =>
						presentValArr.includes(v)
					);

					if (test.length != newStrArr.length) {
						outputArr.push(test.join(""));
					}
					console.log("presentValArr :" + presentValArr);
					console.log("newStrArr :" + newStrArr);
				} else {
					newStrArr.push(val);

					const test = newStrArr.filter((v) =>
						presentValArr.includes(v)
					);

					if (test.length != newStrArr.length) {
						outputArr.push(test.join(""));
					}

					const lastVal = test[test.length - 1];
					presentValArr = [val];
					presentValArr.push(lastVal);

					newStrArr = [];
					newStrArr.push(lastVal);
					newStrArr.push(val);

					console.log("presentValArr :" + presentValArr);
					console.log("newStrArr :" + newStrArr);
				}
				console.log(outputArr);

				return;
			} else {
				newStrArr.push(val);

				if (!presentValArr.includes(val)) {
					presentValArr.push(val);
				}

				// if (outputArr.length != 0) {
				// 	const test = newStrArr.filter((v) => v !== val);

				// 	if (test.length != newStrArr.length) {
				// 		outputArr.push(test.join(""));

				// 		if (!presentValArr.includes(val)) {
				// 			const lastVal = test[test.length - 1];
				// 			newStrArr = [];
				// 			newStrArr.push(lastVal);
				// 			newStrArr.push(val);
				// 		}
				// 	}
				// }
				console.log("presentValArr :" + presentValArr);
				console.log("newStrArr :" + newStrArr);
				console.log(outputArr);

				return;
			}
		}
	});

	let len = 0;
	let outputStr = "";
	outputArr.map((a, i) => {
		if (len < a.length) {
			outputStr = outputArr[i].toString();
			len = a.length;
		}
	});

	console.log(outputStr);
}

// SearchingChallenge("2aabbacbaad");
SearchingChallenge("3aabacbebebe");
