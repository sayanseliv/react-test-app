import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { Task } from '../../types/tasks';

const selectTasks = (state: RootState) => state.tasks;
const selectCurrentFilter = (state: RootState) => state.filter.currentFilter;

export const selectFilteredTasks = createSelector(
	[selectTasks, selectCurrentFilter],
	(tasks: Task[], currentFilter: string) => {
		switch (currentFilter) {
			case 'active':
				return tasks.filter((task) => !task.completed);
			case 'completed':
				return tasks.filter((task) => task.completed);
			case 'all':
			default:
				return tasks;
		}
	}
);
