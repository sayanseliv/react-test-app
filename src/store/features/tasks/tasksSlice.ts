import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Task } from '../../../types/tasks';

const initialState: Task[] = [
	{
		id: uuidv4(),
		title: 'Initial Task',
		completed: false,
	},
];

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			const newTask: Task = {
				id: uuidv4(),
				title: action.payload.title,
				completed: false,
			};
			state.push(newTask);
		},
		toggleTask: (state, action: PayloadAction<{ id: string }>) => {
			const task = state.find((task) => task.id === action.payload.id);
			if (task) {
				task.completed = !task.completed;
			}
		},
		removeTask: (state, action: PayloadAction<{ id: string }>) => {
			return state.filter((task) => task.id !== action.payload.id);
		},
	},
});
export const { addTask, toggleTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
