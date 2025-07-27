const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center h-[60vh] text-center px-4'>
			<h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
			<p className='text-xl text-gray-600 mb-6'>Page not found</p>
			<a
				href='/'
				className='inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
				Back to Home
			</a>
		</div>
	);
};

export default NotFound;
