import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { increment, decrement, incrementByAmount } from '../store/features/counter/counterSlice';
import Modal from '../components/Modal/Modal';

const Home = () => {
	const [showModal, setShowModal] = useState(false);

	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	const onIncrement = () => dispatch(increment());
	const onDecrement = () => dispatch(decrement());

	const toggleModal = () => setShowModal((prev) => !prev);
	const closeModal = () => setShowModal(false);
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
						className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors'>
						-
					</button>

					<button
						onClick={onIncrement}
						className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors'>
						+
					</button>

					<button
						onClick={() => dispatch(incrementByAmount(5))}
						className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors'>
						+5
					</button>
				</div>
				<button
					onClick={toggleModal}
					className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors'>
					Call Modal
				</button>

				<Modal show={showModal} onClose={closeModal} direction='top'>
					<h2>Привет!</h2>
					<p>Это модальное окно с анимацией 🎉</p>
					<button
						onClick={closeModal}
						className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors'>
						Закрыть
					</button>
				</Modal>
			</div>
		</div>
	);
};
export default Home;
