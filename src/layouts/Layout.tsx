import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import AddTask from "../components/sections/tasks/AddTask";
import Sidebar from "./Sidebar";
import FilterSidebar from "./FiltersSidebar";
import { BiAlignRight, BiAlignLeft } from "react-icons/bi";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleFilterSidebar = () => {
		setIsVisible(!isVisible);
	};

	return (
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

			<div className="main">
				<FilterSidebar isVisible={isVisible} />

				<div className="main-contents">
					<header>
						<button
							className="sidebar-toggle"
							onClick={toggleFilterSidebar}
						>
							{isVisible ? <BiAlignLeft /> : <BiAlignRight />}
						</button>

						<div>
							<h1>All</h1>

							<button className="sidebar-toggle">Sort</button>
						</div>
					</header>
					{children}
					<footer>
						<AddTask />
					</footer>
				</div>
			</div>
		</div>
	);
};

export default Layout;
