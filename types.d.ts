interface IResponse<T> {
	items: T[];
	items_count: number;
	pagination: IPagination;
}

interface IPlaceholder {
	empty: boolean;
}

interface ICategory {
	id: number;
	name: string;
	slug?: string;
	image: string;
	description: string;
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

interface IOrders {
	id: number;
	status: string;
	created_at: string;
	total_quantity: string;
	total_price: string;
}

enum UserRole {
	User = 'User',
	Admin = 'Admin',
}

interface IPagination {
	next_page: string | null;
	previous_page: string | null;
	current_page: number;
}

interface IResponseError {
	success: boolean;
	type?: string;
	code?: string;
	error: string;
}

interface IDashboardSearch {
	id: number;
	name: string;
}
