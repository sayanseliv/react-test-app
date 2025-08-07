import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const ListDetails = lazy(() => import('./pages/ListDetails'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectsDetails = lazy(() => import('./pages/ProjectsDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<Suspense
			fallback={
				<div className='flex items-center justify-center min-h-screen bg-gray-100'>
					<div className='flex items-center space-x-2'>
						<div className='w-4 h-4 bg-blue-500 rounded-full animate-jump'></div>
						<div className='w-4 h-4 bg-blue-500 rounded-full animate-jump animate-delay-50'></div>
						<div className='w-4 h-4 bg-blue-500 rounded-full animate-jump animate-delay-100'></div>
						<span className='ml-4 text-gray-700 text-lg'>Loading...</span>
					</div>
				</div>
			}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />}></Route>
					<Route path='list' element={<List />}></Route>
					<Route path='/list/:id' element={<ListDetails />} />
					<Route path='/projects' element={<Projects />}></Route>
					<Route path='/projects/:id' element={<ProjectsDetails />}></Route>
					<Route path='/tasks' element={<Tasks />}></Route>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
