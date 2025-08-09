import { useGetProjectsQuery, useGetProjectByIdQuery } from '../store/api/projectsApi';

export const useProjects = () => {
	const result = useGetProjectsQuery();

	return {
		projects: result.data || [],
		loading: result.isLoading,
		error: result.error ? 'Failed to load projects' : null,
		refetch: result.refetch,
	};
};

export const useProject = (id: number) => {
	const result = useGetProjectByIdQuery(id, {
		skip: !id || isNaN(id),
	});

	return {
		project: result.data || null,
		loading: result.isLoading,
		error: result.error ? 'Failed to load project' : null,
		refetch: result.refetch,
	};
};
