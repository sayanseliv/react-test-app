import { useState, useCallback } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import { onClearQuery, setSearchTerm } from '../../store/features/randomUsers/randomUsersSlice';

const RandomUsersInput = () => {
	const dispatch = useAppDispatch();
	const [localValue, setLocalValue] = useState('');

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setLocalValue(e.target.value);

			dispatch(setSearchTerm(e.target.value));
		},
		[dispatch]
	);

	const onReset = useCallback(() => {
		setLocalValue('');
		dispatch(onClearQuery());
	}, [dispatch]);
	return (
		<div className='flex items-center gap-6'>
			<input
				value={localValue}
				onChange={handleChange}
				type='text'
				placeholder='Search users...'
				name='taskInput'
				className='p-1 w-full border border-solid border-neutral-950 rounded-lg focus:border-sky-700 focus:outline focus:outline-sky-700 hover:border-sky-500 duration-150 transition-colors'
			/>
			{localValue.length > 0 && (
				<button
					onClick={onReset}
					className='px-3 py-1 border border-solid border-neutral-950 rounded-lg text-sm font-medium hover:border-sky-700 hover:text-sky-600 focus:outline focus:outline-sky-700 transition-colors duration-150'>
					Reset
				</button>
			)}
		</div>
	);
};
export default RandomUsersInput;
