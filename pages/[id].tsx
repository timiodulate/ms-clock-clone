import { GetStaticProps, GetStaticPaths } from "next";
import { User } from "../src/interfaces";
import { sampleUserData } from "../src/utils/sample-data";
import Layout from "../src/layouts/Layout";
import ListDetail from "../src/components/sections/tasks/ListDetail";
import { useUserTasks } from "../src/contexts/user-tasks";
import Router from "next/router";

type Props = {
	id?: string;
	item?: User;
	errors?: string;
};

const StaticPropsDetail = ({ id, errors }: Props) => {
	const { userTasks } = useUserTasks();

	const item = userTasks.find((data) => data.id == Number(id));

	if (errors) {
		return (
			<Layout title="Error | Next.js + TypeScript Example">
				<p>
					<span style={{ color: "red" }}>Error:</span> {errors}
				</p>
			</Layout>
		);
	}

	return (
		<Layout
			title={`${
				item ? item.name : "User Detail"
			} | Next.js + TypeScript Example`}
		>
			<main>
				<section>{item && <ListDetail item={item} />}</section>
			</main>
		</Layout>
	);
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
	// Get the paths we want to pre-render based on users
	const paths = sampleUserData.map((user) => ({
		params: { id: user.id.toString() },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const id = params?.id;
		// const item = sampleUserData.find((data) => data.id === Number(id));
		// By returning { props: item }, the StaticPropsDetail component
		// will receive `item` as a prop at build time
		return { props: { id } };
	} catch (err: any) {
		return { props: { errors: err.message } };
	}
};
