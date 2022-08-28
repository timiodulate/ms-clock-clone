import { User } from "../interfaces";

/** Dummy user data. */
export const sampleUserData: User[] = [
	{
		id: 101,
		name: "Alice",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
	{
		id: 102,
		name: "Bob",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
	{
		id: 103,
		name: "Caroline",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
	{
		id: 104,
		name: "Dave",
		due_date: { date: [], time: [] },
		schedule: {
			start: { date: [], time: [] },
			end: { date: [], time: [] },
			duration: 8,
		},
		deadline: { date: [], time: [] },
	},
];
