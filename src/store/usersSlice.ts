import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UsersState, User } from '../types/users';
import { getUserByIdThunk } from './usersThunks';

const initialState: UsersState = {
	users: [],
	currentUser: null,
	loading: false,
	error: null,
	searchQuery: '',
};
export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		getUsers: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
		},
		setUsersByName: (state, action: PayloadAction<User[]>) => {
			state.users = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		onSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserByIdThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUserByIdThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload;
				state.error = null;
			})
			.addCase(getUserByIdThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.currentUser = null;
			});
	},
});
export const { getUsers, setUsersByName, setLoading, onSearchQuery, setError, clearCurrentUser } =
	usersSlice.actions;
export default usersSlice.reducer;
