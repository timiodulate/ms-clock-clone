import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../../features/pomodoroSlice";
import { useVisibility } from "../../../utils/useVisibility";
import { CMenuContainer } from "../../../components/_reusables";

const TodoSection = () => {
	const { isVisible, toggle } = useVisibility();

	const dispatch = useDispatch();

	const isTodoTileVisible = useSelector(
		(state: any) => state.pomodoroTimer.isTodoTileVisible
	);
	const isTasksVisible = useSelector(
		(state: any) => state.pomodoroTimer.isTasksVisible
	);

	return (
		<section
			className={`to-do-section to-do-tile ${
				isTodoTileVisible ? "" : "hide-tile"
			} ${isTasksVisible ? "" : "hide-tasks"}`}
		>
			<div className="section-header">
				<h1>To Do</h1>

				<CMenuContainer className="tile-actions">
					<CMenuContainer.Toggler
						className="icon-container"
						toggle={toggle}
					>
						<BsThreeDots />
					</CMenuContainer.Toggler>

					<CMenuContainer.Menu isVisible={isVisible} toggle={toggle}>
						<li onClick={toggle}>
							<button onClick={() => dispatch(toggleTodo())}>
								{isTasksVisible
									? "Collapse Task List"
									: "Expand Task List"}
							</button>
						</li>
					</CMenuContainer.Menu>
				</CMenuContainer>
			</div>

			<div className="section-main">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Rem, itaque, at inventore, ullam aliquam unde eos dolore
					ipsa placeat delectus maiores! Atque distinctio voluptates
					provident omnis quisquam, officia eligendi quibusdam!
				</p>
			</div>
		</section>
	);
};

export default TodoSection;
