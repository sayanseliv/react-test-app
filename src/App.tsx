import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const ListDetails = lazy(() => import('./pages/ListDetails'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectsDetails = lazy(() => import('./pages/ProjectDetails'));
const AddProject = lazy(() => import('./pages/AddProject'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />}></Route>
				<Route path='list' element={<List />}></Route>
				<Route path='/list/:id' element={<ListDetails />} />
				<Route path='/projects' element={<Projects />}></Route>
				<Route path='/projects/add' element={<AddProject />}></Route>
				<Route path='/projects/:id' element={<ProjectsDetails />}></Route>
				<Route path='/tasks' element={<Tasks />}></Route>
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
