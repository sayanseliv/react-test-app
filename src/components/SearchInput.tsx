import type React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { usersSlice } from '../store/usersSlice';

const { onSearchQuery, onClearQuery } = usersSlice.actions;
const SearchInput = () => {
	const dispatch = useAppDispatch();
	const { searchQuery } = useAppSelector((state) => state.users);
	const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
		dispatch(onSearchQuery(e.target.value));
	const onReset = () => dispatch(onClearQuery());
	return (
		<>
			<div className='flex flex-col gap-2'>
				<label htmlFor='searchInput'>Search</label>
				<input
					value={searchQuery}
					onChange={onChangeQuery}
					id='searchInput'
					type='text'
					placeholder='Search by name'
					className='p-1 border border-solid border-neutral-950 rounded-lg rounded-lg focus:border-sky-700 focus:outline focus:outline-sky-700 hover:border-sky-500 duration-150 transition-colors'
				/>
			</div>
			{searchQuery.length > 0 && (
				<button
					onClick={onReset}
					className='mt-2 self-start px-3 py-1 border border-solid border-neutral-950 rounded-lg text-sm font-medium hover:border-sky-700 hover:text-sky-600 focus:outline focus:outline-sky-700 transition-colors duration-150 cursor-pointer'>
					Reset
				</button>
			)}
		</>
	);
};
export default SearchInput;
