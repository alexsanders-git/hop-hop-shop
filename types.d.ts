interface IPlaceholder {
	empty: boolean;
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

interface InterfaceUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	is_staff?: boolean;
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
