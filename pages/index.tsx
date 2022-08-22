import Layout from "../src/layouts/Layout";
import { GetStaticProps } from "next";
import { TaskProps } from "../src/interfaces";
import { sampleUserData } from "../src/utils/sample-data";
import List from "../src/components/sections/tasks/List";
import { useUserTasks } from "../src/contexts/user-tasks";

type Props = {
	items: TaskProps[];
};

const IndexPage = ({ items }: Props) => {
	const { userTasks } = useUserTasks();

	return (
		<Layout title="Home | Next.js + TypeScript Example">
			<main className="home-page">
				<section>
					<h1>All Tasks</h1>
					{/* <p>
						Example fetching data from inside{" "}
						<code>getStaticProps()</code>.
					</p> */}
					<List items={userTasks} />
				</section>
			</main>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	// const { userTasks } = useUserTasks();
	// Example for including static props in a Next.js function component page.
	// Don't forget to include the respective types for any props passed into
	// the component.
	const items: TaskProps[] = sampleUserData;
	return { props: { items } };
};

export default IndexPage;
