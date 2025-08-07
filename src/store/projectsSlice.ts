import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProjectsState, Project } from '../types/projects';
import { supabase } from '../services/supabaseClient';

const initialState: ProjectsState = {
	projects: [],
	currentProject: null,
	loading: false,
	error: null,
};
export const fetchProjects = createAsyncThunk(
	'projects/fetchProjects',
	async (_, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from('prjects')
				.select('*')
				.order('createdAt', { ascending: false });
			if (error) throw error;
			return data as Project[];
		} catch (error) {
			const err = error as Error;
			return rejectWithValue(err.message);
		}
	}
);
export const fetchProjectById = createAsyncThunk(
	'projects/fetchProjectById',
	async (id: number, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from('projects')
				.select('*')
				.eq('id', id)
				.single();
			if (error) throw error;
			return data as Project[];
		} catch (error) {
			const err = error as Error;
			return rejectWithValue(err.message);
		}
	}
);
