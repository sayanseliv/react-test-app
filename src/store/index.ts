import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import usersReducer from './features/users/usersSlice';
import tasksReducer from './features/tasks/tasksSlice';
import filterReducer from './features/tasks/filterSlice';
import projectsReducer from './features/projects/projectsSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		users: usersReducer,
		tasks: tasksReducer,
		filter: filterReducer,
		projects: projectsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
