import { createSlice } from "@reduxjs/toolkit";

export const pomodoroSlice = createSlice({
	name: "pomodoroTimer",
	initialState: {
		focusSession: { time: 15, count: 4 },
		breakSession: { time: 5, count: 0 },
		allSessions: [],
		currentSessionDetails: { sessionTime: 0, sessionTitle: "" },
		skipBreaks: false,

		focusSessionIsOn: false,
		countdownTime: { h: 0, m: 0, s: 0, ms: 0 },

		showStopWatchTile: true,
		stopWatchIsOn: false,
		stopWatchTime: { h: 0, m: 0, s: 0, ms: 0 },
		stopWatchHistory: [],

		isTodoTileVisible: true,
		isTasksVisible: true,

		isDailyProgressTileVisible: true,
		dailyGoal: 30,
		completedFocus: 0,
	},
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// 	// doesn't actually mutate the state because it uses the Immer library,
		// 	// which detects changes to a "draft state" and produces a brand new
		// 	// immutable state based off those changes
		setFocusSession: (
			state,
			payload: {
				payload: { time?: number; count?: number };
				type: string;
			}
		) => {
			const { time, count }: any = payload.payload;

			if (time != undefined) {
				state.focusSession = {
					...state.focusSession,
					time: time,
				};
			}
			if (count != undefined) {
				state.focusSession = {
					...state.focusSession,
					count: count,
				};
			}
		},
		setBreakSession: (
			state,
			payload: {
				payload: { time?: number; count?: number };
				type: string;
			}
		) => {
			const { time, count }: any = payload.payload;

			if (time != undefined) {
				state.breakSession = {
					...state.breakSession,
					time: time,
				};
			}
			if (count != undefined) {
				state.breakSession = {
					...state.breakSession,
					count: count,
				};
			}
		},
		toggleSkipBreaks: (state) => {
			if (state.skipBreaks) {
				state.breakSession = {
					...state.breakSession,
					count: state.focusSession.count - 1,
				};
			} else {
				state.breakSession = {
					...state.breakSession,
					count: 0,
				};
			}

			state.skipBreaks = !state.skipBreaks;
		},
		getAllSessions: (state) => {
			state.allSessions = [];

			for (let index = 0; index < state.focusSession.count; index++) {
				// const element = array[index];
				let focusDetail = {
					sessionTitle: "focus",
					sessionTime: state.focusSession.time,
				};
				let breakDetail = {
					sessionTitle: "break",
					sessionTime: state.breakSession.time,
				};

				let newArr = state.allSessions;

				if (index == state.focusSession.count - 1) {
					newArr.push(focusDetail);
				} else {
					newArr.push(focusDetail);

					!state.skipBreaks && newArr.push(breakDetail);
				}
				state.allSessions = newArr;
			}
		},
		getCurrentSession: (state, payload?) => {
			const option = payload.payload;

			if (state.allSessions.length > 0) {
				let remainingSessions = state.allSessions.filter(
					(sessionDetails, i) => {
						if (i == 0) {
							if (!option) {
								state.currentSessionDetails = sessionDetails;
							}
						} else {
							return sessionDetails;
						}
					}
				);

				state.allSessions = remainingSessions;
			} else {
				state.currentSessionDetails = {
					sessionTime: 0,
					sessionTitle: "",
				};
				state.allSessions = [];
			}
		},
		toggleFocusSession: (state) => {
			state.focusSessionIsOn = !state.focusSessionIsOn;

			if (state.focusSessionIsOn) {
				if (state.showStopWatchTile) {
					state.stopWatchIsOn = true;
				}
			} else {
				// if (state.showStopWatchTile) {
				state.stopWatchIsOn = false;
				// }
			}
		},

		// Stopwatch Tile
		toggleStopWatchTile: (state) => {
			state.showStopWatchTile = !state.showStopWatchTile;
		},
		toggleStopWatch: (state, payload) => {
			const { payload: stat } = payload;

			state.stopWatchIsOn = stat;
		},
		updateStopWatchTime: (state, payload) => {
			const { payload: time } = payload;

			state.stopWatchTime = {
				h: time.h,
				m: time.m,
				s: time.s,
				ms: time.ms,
			};
		},
		startStopWatch: (state) => {
			state.stopWatchIsOn = true;

			// Bookmark action
			const { h, m, s, ms } = state.stopWatchTime;

			const details: any = {
				title: "Session Started",
				time: "00",
				total: `${h}:${m}:${s}.${ms}`,
			};
			state.stopWatchHistory = [
				{ id: state.stopWatchHistory.length + 1, ...details },
				...state.stopWatchHistory,
			];
		},
		pauseStopWatch: (state) => {
			state.stopWatchIsOn = false;

			// Bookmark action
			const { h, m, s, ms } = state.stopWatchTime;

			const details: any = {
				title: "Stopwatch paused",
				time: "00",
				total: `${h}:${m}:${s}.${ms}`,
			};
			state.stopWatchHistory = [
				{ id: state.stopWatchHistory.length + 1, ...details },
				...state.stopWatchHistory,
			];
		},
		stopStopWatch: (state) => {
			// Bookmark action
			const { h, m, s, ms } = state.stopWatchTime;

			const details: any = {
				title: "Session stopped / ended",
				// title: "Stopwatch stopped",
				time: "00",
				total: `${h}:${m}:${s}.${ms}`,
			};
			state.stopWatchHistory = [
				{ id: state.stopWatchHistory.length + 1, ...details },
				...state.stopWatchHistory,
			];

			state.stopWatchIsOn = false;

			state.stopWatchTime = {
				h: 0,
				m: 0,
				s: 0,
				ms: 0,
			};
			// bookmarkStopWatchTime()
		},
		bookmarkStopWatchTime: (state) => {
			const { h, m, s, ms } = state.stopWatchTime;

			const details: any = {
				time: "00",
				total: `${h}:${m}:${s}.${ms}`,
			};

			state.stopWatchHistory = [
				{ id: state.stopWatchHistory.length + 1, ...details },
				...state.stopWatchHistory,
			];
		},

		// Daily Progress Tile
		toggleDailyProgressTile: (state) => {
			state.isDailyProgressTileVisible =
				!state.isDailyProgressTileVisible;
		},
		updateDailyProgress: (state) => {
			if (state.currentSessionDetails.sessionTitle == "focus") {
				state.completedFocus += state.currentSessionDetails.sessionTime;
			}
		},

		// Todo Tile
		toggleTodoTile: (state) => {
			state.isTodoTileVisible = !state.isTodoTileVisible;
		},
		toggleTodo: (state) => {
			state.isTasksVisible = !state.isTasksVisible;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setFocusSession,
	setBreakSession,
	toggleSkipBreaks,
	getAllSessions,

	getCurrentSession,
	toggleFocusSession,
	// stopwatch
	toggleStopWatchTile,
	toggleStopWatch,
	updateStopWatchTime,
	startStopWatch,
	pauseStopWatch,
	stopStopWatch,
	bookmarkStopWatchTime,
	// dailyGoal
	toggleDailyProgressTile,
	updateDailyProgress,
	// todo
	toggleTodoTile,
	toggleTodo,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
