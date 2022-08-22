import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import AddTask from "../components/sections/tasks/AddTask";
import Sidebar from "./Sidebar";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
	<div className="main-layout">
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>

		<Sidebar />

		<div className="main-contents">
			<header>
				<nav>
					<Link href="/">
						<a>Home</a>
					</Link>{" "}
					|{" "}
					<Link href="/about">
						<a>About</a>
					</Link>{" "}
					| <a href="/api/users">Users API</a>
				</nav>
			</header>

			{children}

			<footer>
				<AddTask />
			</footer>
		</div>
	</div>
);

export default Layout;
