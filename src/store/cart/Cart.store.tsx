import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { fetchWithAuth } from '@/services/auth/auth.service';
import { fetchDataCart } from '@/services/fetchData';
import {
	ApiResponseFetchCart,
	InterfaceCouponResponse,
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
	addCoupon: (coupon: string) => Promise<InterfaceCouponResponse>;
}

export const useCart = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				cart: null,
				fetchCart: async () => {
					try {
						const data: ApiResponseFetchCart = await fetchDataCart('/cart/');
						set((state) => {
							state.cart = data.data;
						});
					} catch (error) {
						console.error('Failed to fetch cart data:', error);
					}
				},

				addItemToCart: async (id: number) => {
					try {
						const data: ApiResponseFetchCart = await fetchDataCart(
							`/cart/add/${id}/`,
							{
								method: 'POST',
							},
						);
						if (data) {
							await useCart.getState().fetchCart();
						}
					} catch (error) {
						console.error('Failed to add item to cart:', error);
					}
				},

				subtractItemFromCart: async (id: number) => {
					try {
						const data: ApiResponseFetchCart = await fetchDataCart(
							`/cart/subtract/${id}/`,
							{
								method: 'POST',
							},
						);
						if (data) {
							await useCart.getState().fetchCart();
						}
					} catch (error) {
						console.error('Failed to subtract item from cart:', error);
					}
				},

				removeItemFromCart: async (id: number) => {
					try {
						const data: ApiResponseFetchCart = await fetchDataCart(
							`/cart/remove/${id}/`,
							{
								method: 'DELETE',
							},
						);
						if (data) {
							await useCart.getState().fetchCart();
						}
					} catch (error) {
						console.error('Failed to remove item from cart:', error);
					}
				},

				addCoupon: async (coupon: string): Promise<any | undefined> => {
					const res: InterfaceCouponResponse = await fetchWithAuth(
						'/cart/coupon/',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ code: coupon }),
						},
					);
					if (res?.success) {
						await useCart.getState().fetchCart();
					}
					return res;
				},
			})),
			{ name: 'cart' },
		),
	),
);
