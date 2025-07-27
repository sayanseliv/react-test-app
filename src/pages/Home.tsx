import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { increment, decrement, incrementByAmount } from '../store/counterSlice';

const Home = () => {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();
	const onIncrement = () => dispatch(increment());
	const onDecrement = () => dispatch(decrement());
	return (
		<div className='bg-white p-8 rounded-lg shadow-md'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
				React + TypeScript + Redux + Tailwind
			</h1>

			<div className='text-center'>
				<div className='text-6xl font-bold text-blue-600 mb-6'>{count}</div>

				<div className='space-x-4'>
					<button
						onClick={onDecrement}
						className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer'>
						-
					</button>

					<button
						onClick={onIncrement}
						className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer'>
						+
					</button>

					<button
						onClick={() => dispatch(incrementByAmount(5))}
						className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer'>
						+5
					</button>
				</div>
			</div>
		</div>
	);
};
export default Home;
