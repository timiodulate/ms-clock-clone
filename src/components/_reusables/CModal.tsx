import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ClientOnlyPortal({ children, selector }) {
	const ref = useRef();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		ref.current = document.querySelector(selector);
		setMounted(true);
	}, [selector]);

	return mounted ? createPortal(children, ref.current) : null;
}

import { FaTimes } from "react-icons/fa";
import useOutsideClose from "../../utils/useOutsideClose";
// import { IconContainer, } from ".";

export default function Modal({
	isVisible,
	toggle,
	children,
	closable,
	className,
}) {
	const { elementRef: modalContainer } = useOutsideClose(isVisible, toggle);

	return (
		isVisible && (
			<ClientOnlyPortal selector="#modal">
				<div className="modal-container dimmer backdrop-blur-0">
					<div
						className={`modal ${className || ""}`}
						ref={modalContainer}
					>
						{closable && (
							<span
								onClick={toggle}
								className="icon-container close-btn text-red-600"
							>
								<FaTimes />
							</span>
						)}

						{children}
					</div>
				</div>
			</ClientOnlyPortal>
		)
	);
}
