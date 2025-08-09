import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { fetchProjects } from '../store/features/projects/projectsSlice';
import {
	selectProjects,
	selectProjectsError,
	selectProjectsLoading,
} from '../store/selectors/projectsSelectors';
import { ProjectCard } from '../components/ui/ProjectCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import type { AppDispatch } from '../store';

const Projects = () => {
	const dispatch = useDispatch<AppDispatch>();
	const projects = useSelector(selectProjects);
	const loading = useSelector(selectProjectsLoading);
	const error = useSelector(selectProjectsError);

	useEffect(() => {
		dispatch(fetchProjects());
	}, [dispatch]);

	const handleRetry = () => {
		dispatch(fetchProjects());
	};

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='flex flex-col items-center text-center'>
					<LoadingSpinner size='lg' />
					<p className='mt-4 text-gray-600'>Loading projects...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center p-4'>
				<ErrorMessage message={error} onRetry={handleRetry} />
			</div>
		);
	}

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gray-50 py-12'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className='text-center mb-12'>
					<h1 className='text-4xl font-bold text-gray-900 mb-4'>Projects</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						Explore our collection of innovative projects and their progress
					</p>
				</motion.div>

				{projects.length === 0 ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-center py-12'>
						<div className='text-6xl mb-4'>📋</div>
						<h3 className='text-2xl font-semibold text-gray-900 mb-2'>
							No Projects Yet
						</h3>
						<p className='text-gray-600'>Start by creating your first project!</p>
					</motion.div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{projects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
				)}
			</div>
		</motion.section>
	);
};

export default Projects;
