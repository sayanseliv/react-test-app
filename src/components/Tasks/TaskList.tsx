import { useSelector } from 'react-redux';

import type { Task } from '../../types/tasks';
import TaskItem from './TaskItem';
import { selectFilteredTasks } from '../../store/selectors/taskSelectors';

const TaskList = () => {
	const filteredTasks = useSelector(selectFilteredTasks);
	return (
		<div className='space-y-2'>
			{filteredTasks.length === 0 ? (
				<p className='text-gray-500 text-center py-4'>No tasks for display</p>
			) : (
				filteredTasks.map((task: Task) => (
					<TaskItem
						key={task.id}
						id={task.id}
						title={task.title}
						completed={task.completed}
					/>
				))
			)}
		</div>
	);
};
export default TaskList;
