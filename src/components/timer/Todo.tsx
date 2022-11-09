import { BiDotsHorizontal } from "react-icons/bi";

const TodoSection = () => {
	return (
		<section className="to-do-section">
			<div className="section-header">
				<h1>To Do</h1>

				<button className="icon-container">
					<BiDotsHorizontal />
				</button>
			</div>

			<div className="section-main">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
				itaque, at inventore, ullam aliquam unde eos dolore ipsa placeat
				delectus maiores! Atque distinctio voluptates provident omnis
				quisquam, officia eligendi quibusdam!
			</div>
		</section>
	);
};

export default TodoSection;
