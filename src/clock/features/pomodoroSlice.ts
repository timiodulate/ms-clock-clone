import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const pomodoroSlice = createSlice({
	name: "pomodoroTimer",
	initialState: {
		value: 0,
		// future: moment().add(2, "m"),
		countdownTime: { h: 0, m: 0, s: 0, ms: 0 },

		stopWatchIsOn: false,
		stopWatchTime: { h: 0, m: 0, s: 0, ms: 0 },
		stopWatchHistory: [],
	},
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},

		// custom
		toggleStopWatch: (state, payload) => {
			const { payload: stat } = payload;

			// if (stat) {
			state.stopWatchIsOn = stat;
			// } else {
			// 	state.stopWatchIsOn = !state.stopWatchIsOn;
			// }
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
				title: "focus-started",
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
				title: "timer-paused",
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
				title: "timer-stopped",
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

		// startCountDown: (state) => {
		// 	let ade = setInterval(() => {
		// 		let countdown: moment.Duration | any = moment.duration(
		// 			state.future.diff(moment())
		// 		);

		// 		state.countdownTime = {
		// 			h: countdown._data.hours,
		// 			m: countdown._data.minutes,
		// 			s: countdown._data.seconds,
		// 			ms: countdown._data.milliseconds,
		// 		};
		// 	}, 100);
		// },
	},
});

// Action creators are generated for each case reducer function
export const {
	increment,
	incrementByAmount,
	toggleStopWatch,
	updateStopWatchTime,
	startStopWatch,
	pauseStopWatch,
	stopStopWatch,
	bookmarkStopWatchTime,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
