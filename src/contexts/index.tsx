import { UserTasksProvider } from "./user-tasks";
import { Provider } from "react-redux";
import store from "../clock/app/store";

function Contexts({ children }: any) {
	return (
		<Provider store={store}>
			<UserTasksProvider>{children}</UserTasksProvider>;
		</Provider>
	);
}

export default Contexts;
