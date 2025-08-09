import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { getUserByIdThunk } from '../store/features/users/usersThunks';
import { clearCurrentUser } from '../store/features/users/usersSlice';

const ListDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const { currentUser, loading, error } = useSelector((state: RootState) => state.users);

	const userId = Number(id);

	useEffect(() => {
		if (!userId || isNaN(userId)) {
			return;
		}

		dispatch(clearCurrentUser());
		dispatch(getUserByIdThunk(userId));
	}, [dispatch, userId]);

	useEffect(() => {
		return () => {
			dispatch(clearCurrentUser());
		};
	}, [dispatch]);

	if (!userId || isNaN(userId)) {
		return <section>Invalid user ID</section>;
	}

	if (loading) {
		return <section>Loading user...</section>;
	}

	if (error) {
		return <section>Error: {error}</section>;
	}

	if (!currentUser) {
		return <section>User not found</section>;
	}

	return (
		<section className='p-4 rounded-lg bg-sky-700 text-gray-200'>
			<h1 className='mb-5 text-5xl'>User Details</h1>
			<div className='p-3 bg-stone-950 rounded-lg'>
				<h2 className='text-3xl'>{currentUser.name}</h2>
				<p className='text-lg'>
					<strong>Username:</strong> {currentUser.username}
				</p>
				<p className='text-lg'>
					<strong>Email:</strong> {currentUser.email}
				</p>
				{currentUser.phone && (
					<p className='text-lg'>
						<strong>Phone:</strong> {currentUser.phone}
					</p>
				)}
				{currentUser.website && (
					<p className='text-lg'>
						<strong>Website:</strong> {currentUser.website}
					</p>
				)}
				{currentUser.address && (
					<div>
						<h3 className='text-2xl'>Address</h3>
						<p className='text-lg'>
							{currentUser.address.street}, {currentUser.address.suite}
						</p>
						<p className='text-lg'>
							{currentUser.address.city}, {currentUser.address.zipcode}
						</p>
					</div>
				)}
				{currentUser.company && (
					<div>
						<h3 className='text-2xl'>Company</h3>
						<p className='text-lg'>
							<strong>Name:</strong> {currentUser.company.name}
						</p>
						<p className='text-lg'>
							<strong>Catch Phrase:</strong> {currentUser.company.catchPhrase}
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default ListDetails;
