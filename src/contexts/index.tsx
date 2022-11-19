import ClockContexts from "../clock/contexts";
import TodoContexts from "../todo/contexts";

function Contexts({ children }: any) {
	return (
		<ClockContexts>
			<TodoContexts>{children}</TodoContexts>;
		</ClockContexts>
	);
}

export default Contexts;
