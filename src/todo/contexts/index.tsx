import { UserTasksProvider } from "./user-tasks";

function TodoContexts({ children }: any) {
	return <UserTasksProvider>{children}</UserTasksProvider>;
}

export default TodoContexts;
