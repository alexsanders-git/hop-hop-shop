import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { $api } from '@/services/fetchData';
import {
	ApiResponseFetchCart,
	InterfaceFetchCartData,
} from '@/store/cart/Cart.interface';

interface IState {
	cart: InterfaceFetchCartData | null;
}

interface IActions {
	fetchCart: () => Promise<void>;
	addItemToCart: (id: number) => Promise<void>;
	subtractItemFromCart: (id: number) => Promise<void>;
	removeItemFromCart: (id: number) => Promise<void>;
	addCoupon: (coupon: string) => Promise<InterfaceCouponResponse | undefined>;
}

interface InterfaceCouponResponse {
	success: boolean;
	data: {
		message?: string;
		error?: string;
	};
}

export const useCart = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				cart: null,
				fetchCart: async () => {
					try {
						const { data } = await $api.get<ApiResponseFetchCart>('cart/');
						set((state) => {
							state.cart = data.data;
						});
					} catch (error) {
						console.error('Failed to fetch cart data:', error);
					}
				},
				addItemToCart: async (id: number) => {
					try {
						const res = await $api.post<ApiResponseFetchCart>(
							`cart/add/${id}/`,
						);
						if (res.data) {
							await useCart.getState().fetchCart();
						}
					} catch (error) {
						console.error('Failed to add item to cart:', error);
					}
				},

				subtractItemFromCart: async (id: number) => {
					try {
						const res = await $api.post<ApiResponseFetchCart>(
							`cart/subtract/${id}/`,
						);
						if (res.data) {
							await useCart.getState().fetchCart();
						}
					} catch (error) {
						console.error('Failed to subtract item from cart:', error);
					}
				},

				removeItemFromCart: async (id: number) => {
					try {
						const res = await $api.delete<ApiResponseFetchCart>(
							`cart/remove/${id}/`,
						);
						if (res.data) {
							await useCart.getState().fetchCart();
						}
					} catch (error) {
						console.error('Failed to remove item from cart:', error);
					}
				},
				addCoupon: async (
					coupon: string,
				): Promise<InterfaceCouponResponse | undefined> => {
					try {
						const res = await $api.post<InterfaceCouponResponse>(
							'cart/coupon/',
							{
								code: coupon,
							},
						);
						if (res.data) {
							await useCart.getState().fetchCart();
						}
						return res.data;
					} catch (error: any) {
						console.error('Failed to remove item from cart:', error);
						return error.response.data;
					}
				},
			})),
			{ name: 'cart' },
		),
	),
);
