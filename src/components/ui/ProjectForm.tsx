import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash } from 'react-icons/hi';
import LoadingSpinner from './LoadingSpinner';
import type { ProjectFormData, ProjectFormProps } from '../../types/projects';

const ProjectForm = ({
	initialData,
	onSubmit,
	isSubmitting,
	submitButtonText,
	onCancel,
}: ProjectFormProps) => {
	const [formData, setFormData] = useState<ProjectFormData>({
		name: initialData?.name || '',
		description: initialData?.description || '',
		status: initialData?.status || 'active',
		team: initialData?.team || [],
	});

	const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({});

	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof ProjectFormData, string>> = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Project name is required';
		}

		if (!formData.description.trim()) {
			newErrors.description = 'Description is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			await onSubmit(formData);
		} catch (error) {
			console.error('Form submission error:', error);
		}
	};

	const addTeamMember = () => {
		setFormData((prev) => ({
			...prev,
			team: [...prev.team, { name: '', role: '' }],
		}));
	};

	const removeTeamMember = (index: number) => {
		setFormData((prev) => ({
			...prev,
			team: prev.team.filter((_, i) => i !== index),
		}));
	};

	const updateTeamMember = (index: number, field: 'name' | 'role', value: string) => {
		setFormData((prev) => ({
			...prev,
			team: prev.team.map((member, i) =>
				i === index ? { ...member, [field]: value } : member
			),
		}));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
						Project Name *
					</label>
					<input
						type='text'
						id='name'
						value={formData.name}
						onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							errors.name ? 'border-red-500' : 'border-gray-300'
						}`}
						placeholder='Enter project name'
					/>
					{errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name}</p>}
				</div>

				{/* Description */}
				<div>
					<label
						htmlFor='description'
						className='block text-sm font-medium text-gray-700 mb-2'>
						Description *
					</label>
					<textarea
						id='description'
						rows={4}
						value={formData.description}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, description: e.target.value }))
						}
						className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							errors.description ? 'border-red-500' : 'border-gray-300'
						}`}
						placeholder='Enter project description'
					/>
					{errors.description && (
						<p className='mt-1 text-sm text-red-600'>{errors.description}</p>
					)}
				</div>

				<div>
					<label
						htmlFor='status'
						className='block text-sm font-medium text-gray-700 mb-2'>
						Status
					</label>
					<select
						id='status'
						value={formData.status}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								status: e.target.value as ProjectFormData['status'],
							}))
						}
						className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
						<option value='active'>Active</option>
						<option value='completed'>Completed</option>
						<option value='on-hold'>On Hold</option>
						<option value='cancelled'>Cancelled</option>
					</select>
				</div>

				{/* Team Members */}
				<div>
					<div className='flex items-center justify-between mb-4'>
						<label className='block text-sm font-medium text-gray-700'>
							Team Members
						</label>
						<button
							type='button'
							onClick={addTeamMember}
							className='inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors'>
							<HiPlus className='w-4 h-4 mr-1' />
							Add Member
						</button>
					</div>

					{formData.team.length === 0 ? (
						<p className='text-gray-500 text-sm italic'>No team members added yet</p>
					) : (
						<div className='space-y-3'>
							{formData.team.map((member, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3 }}
									className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
									<div className='flex-1'>
										<input
											type='text'
											placeholder='Member name'
											value={member.name}
											onChange={(e) =>
												updateTeamMember(index, 'name', e.target.value)
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										/>
									</div>
									<div className='flex-1'>
										<input
											type='text'
											placeholder='Role'
											value={member.role}
											onChange={(e) =>
												updateTeamMember(index, 'role', e.target.value)
											}
											className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
										/>
									</div>
									<button
										type='button'
										onClick={() => removeTeamMember(index)}
										className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors'>
										<HiTrash className='w-4 h-4' />
									</button>
								</motion.div>
							))}
						</div>
					)}
				</div>

				<div className='flex items-center justify-end space-x-4 pt-6'>
					<button
						type='button'
						onClick={onCancel}
						className='px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'>
						Cancel
					</button>
					<button
						type='submit'
						disabled={isSubmitting}
						className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center'>
						{isSubmitting && <LoadingSpinner size='sm' className='mr-2' />}
						{submitButtonText}
					</button>
				</div>
			</form>
		</motion.div>
	);
};

export default ProjectForm;
