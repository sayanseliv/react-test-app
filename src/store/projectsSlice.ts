import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
				.from('projects')
				.select('*')
				.order('created_at', { ascending: false });
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
			return data as Project;
		} catch (error) {
			const err = error as Error;
			return rejectWithValue(err.message);
		}
	}
);
export const createProject = createAsyncThunk(
	'projects/createProject',
	async (projectData: Omit<Project, 'id' | 'created_at'>, { rejectWithValue }) => {
		try {
			const { data, error } = await supabase
				.from('project')
				.insert([projectData])
				.select()
				.single();

			if (error) throw error;
			return data as Project;
		} catch (error) {
			const err = error as Error;
			return rejectWithValue(err.message);
		}
	}
);

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		clearCurrentProject: (state) => {
			state.currentProject = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProjects.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProjects.fulfilled, (state, action) => {
				state.loading = false;
				state.projects = action.payload;
			})
			.addCase(fetchProjects.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			.addCase(fetchProjectById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProjectById.fulfilled, (state, action) => {
				state.loading = false;
				state.currentProject = action.payload;

				const index = state.projects.findIndex((p) => p.id === action.payload.id);
				if (index !== -1) {
					state.projects[index] = action.payload;
				}
			})
			.addCase(fetchProjectById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			.addCase(createProject.fulfilled, (state, action) => {
				state.projects.unshift(action.payload);
			});
	},
});
export const { clearCurrentProject, clearError } = projectSlice.actions;

export default projectSlice.reducer;
