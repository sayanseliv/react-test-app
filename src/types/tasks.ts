export interface Task {
	id: string;
	title: string;
	completed: boolean;
}
export type Filter = 'all' | 'active' | 'completed';
export interface FilterState {
	currentFilter: Filter;
}
