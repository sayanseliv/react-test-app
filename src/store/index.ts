import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import usersReducer from './features/users/usersSlice';
import tasksReducer from './features/tasks/tasksSlice';
import filterReducer from './features/tasks/filterSlice';
import randomUsersReducer from './features/randomUsers/randomUsersSlice';
import { projectsApi } from './api/projectsApi';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		users: usersReducer,
		tasks: tasksReducer,
		filter: filterReducer,
		[projectsApi.reducerPath]: projectsApi.reducer,
		randomUsers: randomUsersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
			},
		}).concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
