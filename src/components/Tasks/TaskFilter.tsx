import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/filterSlice';
import type { Filter } from '../../types/tasks';
import type { RootState } from '../../store';

const TaskFilter = () => {
	const dispatch = useDispatch();
	const currentFilter = useSelector((state: RootState) => state.filter.currentFilter);
	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFilter(event.target.value as Filter));
	};
	return (
		<div className='flex items-center gap-2'>
			<label htmlFor='task-filter' className='text-sm font-medium text-gray-700'>
				Filter:
			</label>
			<select
				name='task-filter'
				id='task-filter'
				value={currentFilter}
				onChange={handleFilterChange}
				className='px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer'>
				<option value='all'>All tasks</option>
				<option value='active'>Active</option>
				<option value='completed'>Completed</option>
			</select>
		</div>
	);
};
export default TaskFilter;
