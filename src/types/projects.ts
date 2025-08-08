export type Project = {
	id: number;
	name: string;
	description?: string;
	status: 'active' | 'completed' | 'on-hold' | 'cancelled';
	created_at: string;
	team: Array<{
		id: number;
		name: string;
		role: string;
	}>;
};
export interface ProjectsState {
	projects: Project[];
	currentProject: Project | null;
	loading: boolean;
	error: string | null;
}
