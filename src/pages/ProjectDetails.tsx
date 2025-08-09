import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useProject } from '../hooks/useProjects';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const ProjectDetails = () => {
	const { id } = useParams<{ id: string }>();
	const projectId = Number(id);

	const { project, loading, error, refetch } = useProject(projectId);

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
							<span
								className={`px-3 py-1 text-sm font-medium rounded-full ${
									statusColors[project.status]
								}`}>
								{project.status}
							</span>
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
											<p className='text-sm text-gray-600'>{member.role}</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
export default ProjectDetails;
