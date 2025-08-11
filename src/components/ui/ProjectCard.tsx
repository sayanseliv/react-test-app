import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import type { Project } from '../../types/projects';
import { memo } from 'react';

interface ProjectCardProps {
	project: Project;
}

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
	const statusColors = {
		active: 'bg-green-100 text-green-800',
		completed: 'bg-blue-100 text-blue-800',
		'on-hold': 'bg-yellow-100 text-yellow-800',
		cancelled: 'bg-red-100 text-red-800',
	};

	return (
		<motion.div
			initial={{ opacity: 0, borderColor: 'rgba(209, 213, 219, 1)' }}
			animate={{ opacity: 1, borderColor: 'rgba(209, 213, 219, 1)' }}
			transition={{ duration: 0.3 }}
			whileHover={{
				borderColor: 'rgba(59, 130, 246, 1)',
				transition: { duration: 0.3, ease: 'easeInOut' },
			}}
			className='bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden'>
			<div className='flex flex-col justify-between h-full p-4'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-xl font-semibold text-gray-900 truncate'>{project.name}</h3>
					<span
						className={`px-2 py-1 shrink-0 text-xs font-medium rounded-full  ${
							statusColors[project.status]
						}`}>
						{project.status}
					</span>
				</div>

				{project.description && (
					<p className='text-gray-600 text-sm mb-4 line-clamp-2'>{project.description}</p>
				)}

				<div className='flex items-center justify-between gap-2'>
					<div className='flex items-center space-x-2'>
						<div className='flex -space-x-2'>
							{project.team.slice(0, 3).map((member, index) => (
								<div
									key={`${project.id}-member-${index}-${member.name}`}
									className='w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white'
									title={member.name}>
									{member.name.charAt(0).toUpperCase()}
								</div>
							))}
							{project.team.length > 3 && (
								<div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white'>
									+{project.team.length - 3}
								</div>
							)}
						</div>
					</div>

					<NavLink
						to={`/projects/${project.id}`}
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors'>
						View Details
						<svg
							className='w-4 h-4 ml-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</NavLink>
				</div>
			</div>
		</motion.div>
	);
});
