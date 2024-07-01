import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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

export interface Data {
	products: ProductDetails[];
	total_price: number;
	total_items: number;
	coupon_is_used: boolean;
}

interface IState {
	products: ProductDetails[];
	total_price: number;
	total_items: number;
	coupon_is_used: boolean;
}

interface IActions {
	setCart: (cart: Data) => void;
}

export const useCart = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				products: [],
				total_price: 0,
				total_items: 0,
				coupon_is_used: false,
				setCart: (cart) =>
					set((state) => {
						state.products = cart.products;
						state.total_price = cart.total_price;
						state.total_items = cart.total_items;
						state.coupon_is_used = cart.coupon_is_used;
					}),
			})),
			{ name: 'cart' },
		),
	),
);
