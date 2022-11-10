import { NextPage } from "next";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Props {
	href: string;
	className?: string;
	external?: boolean;
	type?: "external" | "nav";
}

const CLink: NextPage<Props> = ({ children, type, ...props }) => {
	if (type == "nav") {
		return <NavLink {...props}>{children}</NavLink>;
	} else {
		return <NormalLink {...props}>{children}</NormalLink>;
	}
};

export default CLink;

const NormalLink = ({
	href,
	children,
	exact,
	className,
	active,
	external,
	...props
}: any) => {
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
		return (
			<NextLink href={href}>
				<a className={className} {...props}>
					{children}
				</a>
			</NextLink>
		);
	}
};

const NavLink = ({
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
