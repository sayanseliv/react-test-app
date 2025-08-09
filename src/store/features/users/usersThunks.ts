import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../../types/users';

export const getUserByIdThunk = createAsyncThunk<User, number, { rejectValue: string }>(
	'users/getUserById',
	async (id: number, { rejectWithValue }) => {
		try {
			const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data: User = await res.json();
			return data;
		} catch (error) {
			console.error('getUserByIdThunk error:', error);
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
		}
	}
);
