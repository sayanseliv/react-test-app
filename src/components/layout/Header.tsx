import { NavLink } from 'react-router-dom';
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
	`relative inline-block transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]  after:transition-all after:duration-300 after:w-0 hover:after:w-full
   ${isActive ? 'after:w-full after:bg-white text-white' : 'after:bg-sky-400 text-sky-400'}`;

const Header = () => (
	<header className='bg-neutral-950 p-4'>
		<nav className='max-w-7xl w-full mx-auto space-x-4 text-sky-700'>
			<NavLink to='/' className={getNavLinkClass}>
				Home
			</NavLink>
			<NavLink to='/list' className={getNavLinkClass}>
				List
			</NavLink>
			<NavLink to='/tasks' className={getNavLinkClass}>
				Tasks
			</NavLink>
			<NavLink to='/projects' className={getNavLinkClass}>
				Projects
			</NavLink>
			<NavLink to='/random-users' className={getNavLinkClass}>
				Users
			</NavLink>
		</nav>
	</header>
);

export default Header;
