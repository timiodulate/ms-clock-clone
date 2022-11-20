import { UserTasksProvider } from "./user-tasks";

//prettier-ignore
function TodoContexts({ children }: any) {
	return <UserTasksProvider>{children}</UserTasksProvider>
}

export default TodoContexts;
