import SearchInput from '../components/SearchInput';
import UserList from '../components/UserList';

const List = () => {
	return (
		<>
			<section className='container w-full mx-auto flex flex-col gap-4'>
				<SearchInput />
				<UserList />
			</section>
		</>
	);
};
export default List;
