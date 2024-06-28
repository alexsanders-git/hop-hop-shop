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
	images: any;
}

interface IProductDetails extends IProduct {
	description: string;
	attributes: IProductAttributes;
	images: IImage[]; // for product details, images is an array
}
