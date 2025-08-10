import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useProject } from '../hooks/useProjects';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import { useDeleteProjectMutation } from '../store/api/projectsApi';

const ProjectDetails = () => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const { id } = useParams<{ id: string }>();
	const projectId = Number(id);
	const navigate = useNavigate();

	const { project, loading, error, refetch } = useProject(projectId);
	const [deleteProject] = useDeleteProjectMutation();

	const openModal = () => setIsShowModal(true);
	const closeModal = () => {
		setIsShowModal(false);
		setIsDeleting(false);
	};

	const goBackOrHome = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate('/projects');
		}
	};

	const handleConfirmDelete = async () => {
		setIsDeleting(true);
		try {
			const result = await deleteProject(projectId).unwrap();

			if (result.success) {
				toast.success(result.message || 'Project deleted successfully!');

				closeModal();
				goBackOrHome();
			} else {
				toast.error('Failed to delete project');
				setIsDeleting(false);
			}
		} catch (error) {
			console.error('Failed to delete project:', error);

			let errorMessage = 'Failed to delete project';

			if (error && typeof error === 'object') {
				const apiError = error as { data?: string; message?: string };
				errorMessage = apiError.data || apiError.message || errorMessage;
			}

			toast.error(errorMessage);
			setIsDeleting(false);
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='flex flex-col items-center text-center'>
					<LoadingSpinner size='lg' />
					<p className='mt-4 text-gray-600'>Loading project details...</p>
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

	const statusColors = {
		active: 'bg-green-100 text-green-800',
		completed: 'bg-blue-100 text-blue-800',
		'on-hold': 'bg-yellow-100 text-yellow-800',
		cancelled: 'bg-red-100 text-red-800',
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='min-h-screen bg-gray-50 py-12'>
				<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
					<Link
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
					</Link>

					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
						className='bg-white rounded-lg shadow-lg overflow-hidden'>
						<div className='px-8 py-6 border-b border-gray-200'>
							<div className='flex items-start justify-between'>
								<div>
									<h1 className='text-3xl font-bold text-gray-900 mb-2'>
										{project.name}
									</h1>
									<p className='text-gray-600'>
										Created: {new Date(project.created_at).toLocaleDateString()}
									</p>
								</div>
								<div className='flex items-center gap-2'>
									<span
										className={`px-3 py-1 text-sm font-medium rounded-full ${
											statusColors[project.status]
										}`}>
										{project.status}
									</span>
									<button
										onClick={openModal}
										disabled={isDeleting}
										className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
										title='Delete project'>
										<HiTrash className='w-5 h-5' />
									</button>
								</div>
							</div>
						</div>

						<div className='px-8 py-6'>
							{project.description && (
								<div className='mb-8'>
									<h2 className='text-xl font-semibold text-gray-900 mb-3'>
										Description
									</h2>
									<p className='text-gray-700 leading-relaxed'>
										{project.description}
									</p>
								</div>
							)}

							<div>
								<h2 className='text-xl font-semibold text-gray-900 mb-4'>
									Team Members
								</h2>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
									{project.team.map((member) => (
										<motion.div
											key={member.id}
											initial={{ opacity: 0, scale: 0.95 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.3 }}
											className='flex items-center space-x-3 p-4 bg-gray-50 rounded-lg'>
											<div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-medium'>
												{member.name.charAt(0).toUpperCase()}
											</div>
											<div>
												<h3 className='font-medium text-gray-900'>
													{member.name}
												</h3>
												<p className='text-sm text-gray-600'>
													{member.role}
												</p>
											</div>
										</motion.div>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
			<Modal show={isShowModal} onClose={closeModal}>
				Are you sure you want to delete "<strong>{project.name}</strong>"? This action
				cannot be undone.
				<div className='flex align-center gap-4 justify-center mt-4'>
					<button
						onClick={handleConfirmDelete}
						type='button'
						className='py-2 px-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-colors'>
						Yes
					</button>
					<button
						onClick={closeModal}
						className='py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors'>
						Close
					</button>
				</div>
			</Modal>
		</>
	);
};
export default ProjectDetails;
