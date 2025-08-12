import { useAppSelector } from '../../hooks/redux';
import { selectFilteredUsers } from '../../store/selectors/randomUsersSelector';
import type { RandomUser } from '../../types/random-users';
import LoadingSpinner from '../ui/LoadingSpinner';
import RandomUsersItem from './RandomUsersItem';

const RandomUsersList = () => {
	const users = useAppSelector(selectFilteredUsers);
	const { loading, error } = useAppSelector((state) => state.randomUsers);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='flex flex-col items-center text-center'>
					<LoadingSpinner size='lg' />
					<p className='mt-4 text-gray-600'>Loading users...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return <div className='text-red-500 text-center py-4'>Error: {error}</div>;
	}

	return (
		<div className='space-y-2'>
			{users.length === 0 ? (
				<p className='text-gray-500 text-center py-4'>No users to display</p>
			) : (
				users.map((user: RandomUser) => (
					<RandomUsersItem
						key={`${user.login?.uuid || user.email}-${user.name.first}-${
							user.name.last
						}`}
						user={user}
					/>
				))
			)}
		</div>
	);
};
export default RandomUsersList;
