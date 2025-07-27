export interface Coordinates {
	readonly lat: string;
	readonly lng: string;
}
export interface Address {
	readonly city: string;
	readonly street: string;
	readonly suite: string;
	readonly zipcode: string;
	readonly geo: Coordinates;
}
export interface Company {
	readonly bs: string;
	readonly catchPhrase: string;
	readonly name: string;
}

export interface User {
	readonly id: number;
	readonly name: string;
	readonly username: string;
	readonly email: string;
	readonly phone: string;
	readonly website: string;
	readonly company: Company;
	readonly address: Address;
}
export interface UsersState {
	users: User[];
	currentUsers: User[];
	loading: boolean;
	error: string | null;
	searchQuery: string;
	currentUser: User | null;
}
