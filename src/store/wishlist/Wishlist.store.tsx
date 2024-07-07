import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IState {
	likes: IProduct[];
}

interface IActions {
	toggleLike: (product: IProduct) => void;
}

export const useLike = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				likes: [],
				toggleLike: (product) =>
					set((state) => {
						const existingProductIndex = state.likes.findIndex(
							(p) => p.id === product.id,
						);
						if (existingProductIndex === -1) {
							state.likes.push(product);
						} else {
							state.likes.splice(existingProductIndex, 1);
						}
					}),
			})),
			{ name: 'likes' },
		),
	),
);
