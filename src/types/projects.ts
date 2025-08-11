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

interface TeamMember {
	id?: number;
	name: string;
	role: string;
}

export interface ProjectFormData {
	name: string;
	description: string;
	status: 'active' | 'completed' | 'on-hold' | 'cancelled';
	team: TeamMember[];
}
export interface ProjectFormProps {
	initialData?: ProjectFormData;
	onSubmit: (data: ProjectFormData) => Promise<void>;
	isSubmitting: boolean;
	submitButtonText: string;
	onCancel: () => void;
}
