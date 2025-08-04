import { useAppSelector } from '../../hooks/redux';

import type { Task } from '../../types/tasks';
import TaskItem from './TaskItem';

const TaskList = () => {
	const tasks = useAppSelector((state) => state.tasks);
	return (
		<div>
			{tasks.map((task: Task) => {
				return (
					<TaskItem
						key={task.id}
						id={task.id}
						title={task.title}
						completed={task.completed}
					/>
				);
			})}
		</div>
	);
};
export default TaskList;
