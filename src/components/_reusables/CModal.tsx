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

export function Modal({
	isVisible,
	toggle,
	children,
	closable,
	className,
}: any) {
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

export const useModalVisibility = () => {
	const [isVisible, setIsVisible] = useState(false);

	function toggle(ref?) {
		// setIsVisible(!isVisible);

		if (isVisible) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
		}

		if (ref) {
			!isVisible && ref.current?.focus();
		}
	}

	return {
		isVisible,
		toggle,
	};
};

// ! Add this to _app.js
// <Contexts>
// 	<Component {...pageProps} />
//
// 	<div id="modal"></div>
// </Contexts>;

// ! Add this to _app.js
// const { isVisible, toggle } = useVisibility();

// return (
// 	<aside>
// 		{/* Aside Header  */}

// 		{/* Aside Create new  */}
// 		<div className="create-new">
// 			<button onClick={toggle}>
// 				<FaPlus />
// 			</button>

// 			<CreateNewProjectForms
// 				isVisible={isVisible}
// 				toggle={toggle}
// 				closable
// 			/>
// 		</div>
// 	</aside>
// );
