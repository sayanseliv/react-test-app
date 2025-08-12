import React, { memo } from 'react';
import type { RandomUser } from '../../types/random-users';

type Props = {
	user: RandomUser;
};

const RandomUsersItem: React.FC<Props> = ({ user }) => {
	const fullName = `${user.name.first} ${user.name.last}`;
	const location = `${user.location.city}, ${user.location.country}`;
	const imgSrc = user.picture?.large ?? user.picture?.medium ?? user.picture?.thumbnail;
	return (
		<article
			className='flex items-center gap-4 p-4 bg-white/80 dark:bg-neutral-900/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-150'
			aria-label={`User ${fullName}`}
			tabIndex={0}>
			<img
				src={imgSrc}
				alt={fullName}
				className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700'
				loading='lazy'
			/>

			<div className='flex-1 min-w-0'>
				<div className='flex items-start justify-between gap-3'>
					<div className='truncate'>
						<h3 className='text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate'>
							{fullName}
						</h3>
						<p className='text-xs text-neutral-500 dark:text-neutral-400 truncate'>
							{user.email}
						</p>
					</div>

					<div className='text-right'>
						<p className='text-xs text-neutral-500 dark:text-neutral-400'>
							{user.dob?.age ?? '—'} y.o.
						</p>
						<p className='text-xs text-neutral-500 dark:text-neutral-400'>{user.nat}</p>
					</div>
				</div>

				<div className='mt-2 flex items-center justify-between gap-3'>
					<p className='text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 truncate'>
						📍 {location}
					</p>

					<div className='flex items-center gap-2'>
						<a
							href={`mailto:${user.email}`}
							onClick={(e) => e.stopPropagation()}
							className='inline-flex items-center px-2 py-1 text-xs font-medium border border-transparent rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline focus:outline-2 focus:outline-sky-500'>
							Email
						</a>

						<a
							href={`tel:${user.phone}`}
							onClick={(e) => e.stopPropagation()}
							className='inline-flex items-center px-2 py-1 text-xs font-medium border border-neutral-200 rounded-md hover:border-sky-500 focus:outline focus:outline-2 focus:outline-sky-500'>
							Call
						</a>
					</div>
				</div>
			</div>
		</article>
	);
};
export default memo(RandomUsersItem);
