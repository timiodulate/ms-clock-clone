import { Provider } from "react-redux";
import store from "../app/store";

function ClockContexts({ children }: any) {
	return <Provider store={store}>{children}</Provider>;
}

export default ClockContexts;
