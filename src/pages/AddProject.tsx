import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useCreateProjectMutation } from '../store/api/projectsApi';

import type { ProjectFormData } from '../types/projects';
import ProjectForm from '../components/ui/ProjectForm';

const AddProject = () => {
	const navigate = useNavigate();
	const [createProject] = useCreateProjectMutation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (formData: ProjectFormData) => {
		setIsSubmitting(true);
		try {
			const validTeamMembers = formData.team
				.filter((member) => member.name.trim() !== '' && member.role.trim() !== '')
				.map((member, idx) => ({
					...member,
					id: typeof member.id === 'number' ? member.id : idx + 1,
				}));

			const projectData = {
				...formData,
				team: validTeamMembers,
			};

			const result = await createProject(projectData).unwrap();

			toast.success('Project created successfully!');
			navigate(`/projects/${result.id}`);
		} catch (error) {
			console.error('Failed to create project:', error);

			let errorMessage = 'Failed to create project';
			if (error && typeof error === 'object') {
				const apiError = error as { data?: string; message?: string };
				errorMessage = apiError.data || apiError.message || errorMessage;
			}

			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		navigate('/projects');
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<NavLink
					to='/projects'
					className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-8'>
					<svg
						className='w-4 h-4 mr-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Back to Projects
				</NavLink>

				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className='text-center mb-12'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>Create New Project</h1>
					<p className='text-lg text-gray-600'>Add a new project to your collection</p>
				</motion.div>

				<ProjectForm
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isSubmitting={isSubmitting}
					submitButtonText='Create Project'
				/>
			</div>
		</motion.div>
	);
};

export default AddProject;
