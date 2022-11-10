import { configureStore } from "@reduxjs/toolkit";
import pomodoroReducer from "../features/pomodoroSlice";

export default configureStore({
	reducer: {
		pomodoroTimer: pomodoroReducer,
	},
});
