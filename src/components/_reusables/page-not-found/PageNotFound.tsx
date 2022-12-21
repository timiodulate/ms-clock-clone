import CLink from "../CLink";

export default function PageNotFound() {
	return (
		<main className="unauthorized-page" style={{ height: "100vh" }}>
			<h1 className="mb-2 text-primary font-bold text-lg">
				Page not found
			</h1>

			<p className="mb-4 text-sm">
				You might not have permission to see this page
			</p>

			{/* linkTo={"/login"} size="lg"*/}
			<CLink href="/dashboard/signin" className="px-5">
				Log in
			</CLink>
		</main>
	);
}
