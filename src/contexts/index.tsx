import ClockContexts from "../clock/contexts";
import { ProjectsListContextProvider } from "../projects/contexts";
import TodoContexts from "../todo/contexts";

function Contexts({ children }: any) {
	return (
		<ProjectsListContextProvider>
			<ClockContexts>
				<TodoContexts>{children}</TodoContexts>
			</ClockContexts>
		</ProjectsListContextProvider>
	);
}

export default Contexts;
