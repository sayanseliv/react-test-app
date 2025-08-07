import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import type { Project } from '../types/projects';
import { NavLink } from 'react-router-dom';

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	useEffect(() => {
		const fetchProjects = async () => {
			const { data, error } = await supabase.from('projects').select('*');
			if (error) {
				console.error('Error fetching projects:', error);
			} else {
				setProjects(data);
			}
		};
		fetchProjects();
	}, []);

	return (
		<section>
			<h1>Projects</h1>
			<ul>
				{projects.map((p) => (
					<li key={p.id}>
						<NavLink to={`/projects/${p.id}`}>{p.name}</NavLink>
					</li>
				))}
			</ul>
		</section>
	);
};
export default Projects;
