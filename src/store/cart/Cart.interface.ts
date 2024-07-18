interface Category {
	id: number;
	name: string;
	slug: string;
	image: string;
}

export interface InterfaceProductCart {
	id: number;
	name: string;
	category: Category;
	slug: string;
	price: string;
	images: {
		image: string;
	};
}

interface ProductDetails {
	product: InterfaceProductCart;
	quantity: number;
	price: number;
	total_price: number;
}

export interface InterfaceFetchCartData {
	products: ProductDetails[];
	total_price: number;
	total_items: number;
	subtotal_price: number;
	coupon_is_used: boolean;
}

export interface ApiResponseFetchCart {
	success: boolean;
	data: InterfaceFetchCartData;
}

export interface InterfaceCouponResponse {
	success: boolean;
	error?: string;
}
