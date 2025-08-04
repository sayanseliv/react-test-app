import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import usersReducer from './usersSlice';
import tasksReducer from './tasksSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		users: usersReducer,
		tasks: tasksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
