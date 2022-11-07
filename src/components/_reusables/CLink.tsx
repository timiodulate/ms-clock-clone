import { NextPage } from "next";
import NextLink from "next/link";

interface Props {
	href: string;
	className?: string;
	external?: boolean;
	type?: "external" | "nav";
}

const CLink: NextPage<Props> = ({
	external,
	href,
	className,
	children,
	...props
}) => {
	if (external || href[0] !== "/") {
		return (
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
				className={className}
			>
				{children}
			</a>
		);
	} else {
		// return navLink ? (
		// 	<NavLink to={link} className={classname}>
		// 		{component}
		// 	</NavLink>
		// ) : (

		return (
			<NextLink href={href}>
				<a className={className} {...props}>
					{children}
				</a>
			</NextLink>
		);
		// );
	}
};

export default CLink;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CNavLink = ({
	href,
	children,
	exact,
	className,
	active,
	...props
}: any) => {
	const [classN, setClassN] = useState("");
	const { pathname, asPath } = useRouter();
	const isActive = exact
		? pathname === href
		: pathname.startsWith(href) || asPath.includes(href);

	const activeC = () => {
		if (typeof active === "string") {
			return active === "active" ? active : "";
		} else {
			return isActive ? "active" : "";
		}
	};

	useEffect(() => {
		setClassN(`${activeC()} ${className ? className : ""}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, asPath]);

	return (
		<CLink href={href} {...props} className={classN}>
			{children}
		</CLink>
	);
};

export { CNavLink };
