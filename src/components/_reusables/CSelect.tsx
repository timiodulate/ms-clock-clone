const CSelect = ({
	className,
	name,
	id,
	data,
	defaultValue,

	children,

	initialOption,
	label,
	nolabel,
	register,
	required,
	errorMsg,

	...rest
}: any) => {
	// const validationObject = { required, ...validation } || { required };

	const inputId = name
		? // const inputId = !label
		  name?.toLowerCase().split(" ").join("_")
		: label?.toLowerCase().split(" ").join("_");

	const inputLabel =
		!label || nolabel ? null : (
			<label className="input-label" htmlFor={inputId}>
				{label}{" "}
				{required && <span className="text-red-500 required">*</span>}
			</label>
		);

	const registerId = name || inputId;

	return (
		<div
			className={`input-field select ${className ? className : ""} ${
				errorMsg ? "error" : ""
			}  `}
			id={id}
		>
			{/* <select
				id={inputId}
				{...register(name || registerId || inputId)}
				{...rest}
			>
				{initialOption && <option value="">{initialOption}</option>}

				{data ? (
					data.map((d, i) => {
						const key = Object.keys(d);
						const value = Object.values(d);

						return (
							<option key={i} value={key[0]}>
								{value[0]}
							</option>
						);
					})
				) : (
					<>
						<option value="">Gender</option>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</>
				)}
			</select> */}

			<select name={name} defaultValue={defaultValue} {...rest}>
				{children ? (
					children
				) : data ? (
					data.map((d, i) => {
						const key = Object.keys(d);
						const value: any = Object.values(d);

						return (
							<option key={i} value={value[0]}>
								{key[0]}
							</option>
						);
					})
				) : (
					<>
						<option value="">Gender</option>
						<option value="1">Male</option>
						<option value="0">Female</option>
					</>
				)}
			</select>
		</div>
	);
};

export default CSelect;
