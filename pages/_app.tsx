import Contexts from "../src/contexts";
import "../src/assets/styles/index.scss";

// eslint-disable-next-line react-hooks/exhaustive-deps
function MyApp({ Component, pageProps }) {
	return (
		<Contexts>
			{/* <LayoutWrapper /> */}
			<Component {...pageProps} />

			{/* <ToastContainer /> */}
		</Contexts>
	);
}

export default MyApp;
