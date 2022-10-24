import { NextPage } from "next";
import NextLink from "next/link";

interface Props {
	href: string;
	className?: string;
	external?: boolean;
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
