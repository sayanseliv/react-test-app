import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addTask } from '../../store/features/tasks/tasksSlice';

const TaskInput = () => {
	const [task, setTask] = useState('');
	const dispatch = useAppDispatch();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.target.value);
	};
	const onAddTask = () => {
		if (task.trim() === '') return;
		dispatch(addTask({ title: task }));
		setTask('');
	};

	return (
		<div>
			<input
				value={task}
				onChange={handleChange}
				type='text'
				placeholder='Add a new task'
				name='taskInput'
				className='p-1 border border-solid border-neutral-950 rounded-lg focus:border-sky-700 focus:outline focus:outline-sky-700 hover:border-sky-500 duration-150 transition-colors'
			/>
			<button
				onClick={onAddTask}
				type='button'
				className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 me-2 ml-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-colors cursor-pointer'>
				Add
			</button>
		</div>
	);
};
export default TaskInput;
