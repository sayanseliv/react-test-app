import { motion } from 'framer-motion';
import RandomUsersInput from '../components/RandomUsers/RandomUsersInput';
import RandomUsersList from '../components/RandomUsers/RandomUsersList';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useEffect } from 'react';
import { fetchRandomUsers } from '../store/features/randomUsers/randomUsersThunks';
const RandomUsers = () => {
	const dispatch = useAppDispatch();
	const { currentPage, searchTerm } = useAppSelector((state) => state.randomUsers);

	useEffect(() => {
		dispatch(fetchRandomUsers({ page: currentPage, searchTerm }));
	}, [currentPage, dispatch, searchTerm]);
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-gray-50 py-6'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1 className='mb-2'>RandomUsers</h1>
				<RandomUsersInput />
				<RandomUsersList />
			</div>
		</motion.section>
	);
};
export default RandomUsers;
