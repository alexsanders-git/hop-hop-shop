import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IState {
	checkout: {
		personal: boolean;
		delivery: boolean;
		payment: boolean;
	};
}

interface IActions {
	setPersonal: (personal: boolean) => void;
	setDelivery: (delivery: boolean) => void;
	setPayment: (payment: boolean) => void;
}

export const useCheckout = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				checkout: {
					personal: true,
					delivery: false,
					payment: false,
				},
				setPersonal: (personal) =>
					set((state) => {
						state.checkout.personal = personal;
					}),
				setDelivery: (delivery) =>
					set((state) => {
						state.checkout.delivery = delivery;
					}),
				setPayment: (payment) =>
					set((state) => {
						state.checkout.payment = payment;
					}),
			})),
			{ name: 'checkout' },
		),
	),
);
