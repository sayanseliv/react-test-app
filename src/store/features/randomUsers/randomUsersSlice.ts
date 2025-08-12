import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RandomUserList } from '../../../types/random-users';
import type { UsersState } from '../../../types/random-users';
import { fetchRandomUsers } from './randomUsersThunks';

const initialState: UsersState = {
	users: [],
	loading: false,
	error: null,
	searchTerm: '',
	currentPage: 1,
	totalPages: 1,
	pageSize: 10,
};
export const randomUsersSlice = createSlice({
	name: 'randomUsers',
	initialState,
	reducers: {
		getRandomUsers: (state, action: PayloadAction<RandomUserList>) => {
			state.users = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
			state.currentPage = 1;
		},
		onClearQuery(state) {
			state.searchTerm = '';
			state.currentPage = 1;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setTotalPages: (state, action: PayloadAction<number>) => {
			state.totalPages = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRandomUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchRandomUsers.fulfilled, (state, action: PayloadAction<RandomUserList>) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchRandomUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

export const {
	getRandomUsers,
	setLoading,
	setError,
	setSearchTerm,
	setCurrentPage,
	setTotalPages,
	onClearQuery,
} = randomUsersSlice.actions;
export default randomUsersSlice.reducer;
