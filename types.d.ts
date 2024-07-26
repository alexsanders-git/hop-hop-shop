interface IResponse<T> {
	items_count: number;
	pages_link: IPagination;
	items: T[];
}

interface IPlaceholder {
	empty: boolean;
}

interface IPagination {
	next: string | null;
	previous: string | null;
}

interface ICategory {
	id: number;
	name: string;
	slug: string;
	image: string;
}

interface IImage {
	image: string;
}

interface IProductAttributes {
	brand: string;
	material: string;
	style: string;
	size: number;
}

interface IProduct {
	id: number;
	name: string;
	slug: string;
	price: number;
	SKU: number;
	category: ICategory;
	description?: string;
	attributes?: IProductAttributes;
	images: IImage | IImage[];
}

interface IUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	user_role: UserRole.Admin | UserRole.User;
}

interface IPersonalData {
	name: string;
	lastname: string;
	email: string;
	phone: string;
}

interface IDeliveryAddress {
	country: string;
	city: string;
	postalCode: string;
	address: string;
}

interface ICreditCard {
	cardNumber: string;
	cvv: string;
	expiryDate: string;
	cardName: string;
}

enum UserRole {
	User = 'User',
	Admin = 'Admin',
}
