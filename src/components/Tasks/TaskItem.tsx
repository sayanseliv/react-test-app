import { memo } from 'react';
import type { Task } from '../../types/tasks';
import { useDispatch } from 'react-redux';

const TaskItem = ({ title, id, completed }: Task) => {
	const dispatch = useDispatch();

	const handleToggle = () => {
		dispatch({ type: 'tasks/toggleTask', payload: { id } });
	};
	const removeTask = () => {
		dispatch({ type: 'tasks/removeTask', payload: { id } });
	};
	return (
		<div className='flex items-center gap-4 p-4 border-b border-gray-200'>
			<input
				type='checkbox'
				checked={completed}
				onChange={handleToggle}
				name='taskCheckbox'
				className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer'
			/>
			<h3>{title}</h3>
			<button
				onClick={removeTask}
				type='button'
				className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-colors'>
				Remove Task
			</button>
		</div>
	);
};
export default memo(TaskItem);
