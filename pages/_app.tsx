import Contexts from "../src/contexts";
import "../src/styles/index.scss";
// import "../src/styles/pages/home.css";

// eslint-disable-next-line react-hooks/exhaustive-deps
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Contexts>
				{/* <LayoutWrapper /> */}
				<Component {...pageProps} />
			</Contexts>

			{/* <ToastContainer /> */}
		</>
	);
}

export default MyApp;
