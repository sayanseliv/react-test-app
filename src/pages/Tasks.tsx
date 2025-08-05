import TaskFilter from '../components/Tasks/TaskFilter';
import TaskInput from '../components/Tasks/TaskInput';
import TaskList from '../components/Tasks/TaskList';

const Tasks = () => {
	return (
		<div className='flex flex-col gap-4'>
			<TaskInput />
			<TaskFilter />
			<TaskList />
		</div>
	);
};
export default Tasks;
