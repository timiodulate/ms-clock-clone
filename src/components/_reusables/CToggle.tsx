import { FaCheck, FaCheckSquare } from "react-icons/fa";

const CToggle = ({
	id,
	className,
	disabled,
	value,
	register,
	registerId,
	label,
	children,
	...rest
}: any) => {
	const inputValue = value || label || children;

	return (
		<div
			className={`input-field toggle flex items-center gap-2 ${
				className ? className : ""
			}`}
		>
			<label htmlFor={id}>
				{register ? (
					<input
						type="checkbox"
						id={id}
						value={inputValue}
						disabled={disabled}
						{...register(registerId)}
						{...rest}
					/>
				) : (
					<input
						type="checkbox"
						id={id}
						disabled={disabled}
						{...rest}
					/>
				)}

				<span>
					<span className="circle"></span>
				</span>

				{label ? <>{label}</> : <>{children}</>}
			</label>
		</div>
	);
};

export default CToggle;
