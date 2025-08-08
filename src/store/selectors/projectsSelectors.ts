import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjects = createSelector(
	[selectProjectsState],
	(projectsState) => projectsState.projects
);

export const selectCurrentProject = createSelector(
	[selectProjectsState],
	(projectsState) => projectsState.currentProject
);
export const selectProjectsLoading = createSelector(
	[selectProjectsState],
	(projectsState) => projectsState.loading
);

export const selectProjectsError = createSelector(
	[selectProjectsState],
	(projectsState) => projectsState.error
);
