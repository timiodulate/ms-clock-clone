import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../../../features/pomodoroSlice";
import { useVisibility } from "../../../utils/useVisibility";
import { CDropdown } from "../../_reusables";

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

				<CDropdown className="tile-actions">
					<CDropdown.Toggler
						className="icon-container"
						toggle={toggle}
					>
						<BsThreeDots />
					</CDropdown.Toggler>

					<CDropdown.Menu isVisible={isVisible} toggle={toggle}>
						<li onClick={toggle}>
							<button onClick={() => dispatch(toggleTodo())}>
								{isTasksVisible
									? "Collapse Task List"
									: "Expand Task List"}
							</button>
						</li>
					</CDropdown.Menu>
				</CDropdown>
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
