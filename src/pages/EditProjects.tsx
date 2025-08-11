import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import ProjectForm from '../components/ui/ProjectForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useProject } from '../hooks/useProjects';
import { useUpdateProjectMutation } from '../store/api/projectsApi';

import type { ProjectFormData } from '../types/projects';

const EditProjects = () => {
	const { id } = useParams<{ id: string }>();
	const projectId = Number(id);
	const navigate = useNavigate();

	const { project, loading, error, refetch } = useProject(projectId);
	const [updateProject] = useUpdateProjectMutation();
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

			await updateProject({ id: projectId, data: projectData }).unwrap();

			toast.success('Project updated successfully!');
			navigate(`/projects/${projectId}`);
		} catch (error) {
			console.error('Failed to update project:', error);

			let errorMessage = 'Failed to update project';
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
		navigate(`/projects/${projectId}`);
	};
	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='flex flex-col items-center text-center'>
					<LoadingSpinner size='lg' />
					<p className='mt-4 text-gray-600'>Loading project...</p>
				</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center p-4'>
				<ErrorMessage message={error} onRetry={refetch} />
			</div>
		);
	}
	if (!project) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<div className='text-6xl mb-4'>🔍</div>
					<h2 className='text-2xl font-semibold text-gray-900 mb-2'>Project Not Found</h2>
					<Link to='/projects' className='text-blue-600 hover:text-blue-700'>
						← Back to Projects
					</Link>
				</div>
			</div>
		);
	}

	const initialFormData: ProjectFormData = {
		name: project.name,
		description: project.description ?? '',
		status: project.status,
		team: project.team || [],
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
				<Link
					to={`/projects/${projectId}`}
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
					Back to Project
				</Link>

				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className='text-center mb-12'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>Edit Project</h1>
					<p className='text-lg text-gray-600'>
						Update "{project.name}" project information
					</p>
				</motion.div>

				<ProjectForm
					initialData={initialFormData}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					isSubmitting={isSubmitting}
					submitButtonText='Update Project'
				/>
			</div>
		</motion.div>
	);
};
export default EditProjects;
