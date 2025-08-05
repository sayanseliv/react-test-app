import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterState, Filter } from '../types/tasks';

const initialState: FilterState = {
	currentFilter: 'all',
};
const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter: (state, action: PayloadAction<Filter>) => {
			state.currentFilter = action.payload;
		},
	},
});
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
