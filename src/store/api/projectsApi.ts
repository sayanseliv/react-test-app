import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../services/supabaseClient';
import type { Project } from '../../types/projects';

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Project'],
	endpoints: (builder) => ({
		getProjects: builder.query<Project[], void>({
			queryFn: async () => {
				try {
					const { data, error } = await supabase
						.from('projects')
						.select('*')
						.order('created_at', { ascending: false });

					if (error) {
						return { error: { status: 'FETCH_ERROR', data: error.message } };
					}

					return { data: data as Project[] };
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					return { error: { status: 'FETCH_ERROR', data: errorMessage } };
				}
			},
			providesTags: ['Project'],
			keepUnusedDataFor: 300,
		}),

		getProjectById: builder.query<Project, number>({
			queryFn: async (id) => {
				try {
					const { data, error } = await supabase
						.from('projects')
						.select('*')
						.eq('id', id)
						.single();

					if (error) {
						return { error: { status: 'FETCH_ERROR', data: error.message } };
					}

					return { data: data as Project };
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					return { error: { status: 'FETCH_ERROR', data: errorMessage } };
				}
			},
			providesTags: (_result, _error, id) => [{ type: 'Project', id }],
			keepUnusedDataFor: 600,
		}),

		createProject: builder.mutation<Project, Omit<Project, 'id' | 'created_at'>>({
			queryFn: async (projectData) => {
				try {
					const { data, error } = await supabase
						.from('projects')
						.insert([{ ...projectData, created_at: new Date().toISOString() }])
						.select()
						.single();

					if (error) {
						return { error: { status: 'MUTATION_ERROR', data: error.message } };
					}

					return { data: data as Project };
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					return { error: { status: 'MUTATION_ERROR', data: errorMessage } };
				}
			},
			invalidatesTags: ['Project'],
		}),

		updateProject: builder.mutation<
			Project,
			{ id: number; data: Partial<Omit<Project, 'id' | 'created_at'>> }
		>({
			queryFn: async ({ id, data }) => {
				try {
					const { data: updatedData, error } = await supabase
						.from('projects')
						.update(data)
						.eq('id', id)
						.select()
						.single();

					if (error) {
						return { error: { status: 'MUTATION_ERROR', data: error.message } };
					}

					return { data: updatedData as Project };
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					return { error: { status: 'MUTATION_ERROR', data: errorMessage } };
				}
			},
			invalidatesTags: (_result, _error, { id }) => [{ type: 'Project', id }, 'Project'],
		}),

		deleteProject: builder.mutation<{ success: boolean; message: string }, number>({
			queryFn: async (id) => {
				try {
					const { data: existingProject, error: checkError } = await supabase
						.from('projects')
						.select('id, name')
						.eq('id', id)
						.single();

					if (checkError || !existingProject) {
						return {
							error: {
								status: 'NOT_FOUND',
								data: 'Project not found or has already been deleted',
							},
						};
					}

					const { error: deleteError } = await supabase
						.from('projects')
						.delete()
						.eq('id', id);

					if (deleteError) {
						return {
							error: {
								status: 'MUTATION_ERROR',
								data: deleteError.message,
							},
						};
					}

					return {
						data: {
							success: true,
							message: `Project "${existingProject.name}" was successfully deleted`,
						},
					};
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Unknown error occurred';
					return {
						error: {
							status: 'MUTATION_ERROR',
							data: `Failed to delete project: ${errorMessage}`,
						},
					};
				}
			},
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;

					dispatch(
						projectsApi.util.updateQueryData('getProjects', undefined, (draft) => {
							return draft.filter((project) => project.id !== id);
						})
					);

					dispatch(
						projectsApi.util.upsertQueryData(
							'getProjectById',
							id,
							undefined as unknown as Project
						)
					);
				} catch (error) {
					const errorMessage =
						error instanceof Error ? error.message : 'Unknown error occurred';
					console.log('delete project error', errorMessage);
				}
			},
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useGetProjectByIdQuery,
	useCreateProjectMutation,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
} = projectsApi;
