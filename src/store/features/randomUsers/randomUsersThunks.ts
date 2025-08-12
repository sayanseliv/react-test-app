import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RandomUserList } from '../../../types/random-users';

const URL = 'https://randomuser.me/api/';
export const fetchRandomUsers = createAsyncThunk<
	RandomUserList,
	{ page: number; searchTerm: string },
	{ rejectValue: string }
>('randomUsers/getRandomUsers', async ({ page }, { rejectWithValue }) => {
	try {
		const response = await fetch(`${URL}?page=${page}&results=10&seed=abc`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.error('fetchRandomUsers error:', error);
		return rejectWithValue('Error loading users');
	}
});
