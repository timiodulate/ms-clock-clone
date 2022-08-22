import { UserTasksProvider } from "./user-tasks";

function Contexts({ children }: any) {
	return <UserTasksProvider>{children}</UserTasksProvider>;
}

export default Contexts;
