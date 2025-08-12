import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const selectFilteredUsers = createSelector(
	(state: RootState) => state.randomUsers.users,
	(state: RootState) => state.randomUsers.searchTerm.trim().toLowerCase(),
	(state: RootState) => state.randomUsers.currentPage,
	(state: RootState) => state.randomUsers.pageSize,
	(users, normalizedSearchTerm, currentPage, pageSize) => {
		if (!Array.isArray(users)) {
			console.warn('Users is not an array:', users);
			return [];
		}
		const filtered = normalizedSearchTerm
			? users.filter((u) => {
					if (!u?.name) return false;
					const fullName = `${u.name.first || ''} ${u.name.last || ''}`.toLowerCase();
					return fullName.includes(normalizedSearchTerm);
			  })
			: users;

		const startIndex = (currentPage - 1) * pageSize;
		return filtered.slice(startIndex, startIndex + pageSize);
	}
);
