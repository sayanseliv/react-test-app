import { motion } from 'framer-motion';

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className='bg-red-50 border border-red-200 rounded-lg p-4'>
			<div className='flex items-center'>
				<svg
					className='w-5 h-5 text-red-500 mr-3'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
				<p className='text-red-700'>{message}</p>
			</div>
			{onRetry && (
				<button
					onClick={onRetry}
					className='mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors'>
					Try Again
				</button>
			)}
		</motion.div>
	);
};
