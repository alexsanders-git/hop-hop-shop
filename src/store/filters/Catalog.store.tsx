import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ISorting {
	name: string;
	value: string;
}

interface ICategory {
	name: string;
	value: string;
}

interface IState {
	catalog: {
		filters: any | null;
		sorting: ISorting | null;
		category: ICategory | null;
		minPrice: number;
		maxPrice: number;
	};
}

interface IActions {
	setSorting: (payload: ISorting | null) => void;
	setCategory: (payload: ICategory | null) => void;
	setPriceRange: (min: number, max: number) => void;
	resetAll: () => void;
}

export const useCatalog = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				catalog: {
					filters: null,
					sorting: null,
					category: null,
					minPrice: 0,
					maxPrice: 100,
				},
				setSorting: (payload) =>
					set((state) => {
						state.catalog.sorting = payload;
					}),
				setCategory: (payload) =>
					set((state) => {
						state.catalog.category = payload;
					}),
				setPriceRange: (min, max) =>
					set((state) => {
						state.catalog.minPrice = min;
						state.catalog.maxPrice = max;
					}),
				resetAll: () =>
					set((state) => {
						state.catalog.category = null;
						state.catalog.sorting = null;
						state.catalog.category = null;
						state.catalog.maxPrice = 100;
						state.catalog.minPrice = 0;
					}),
			})),
			{
				name: 'catalog',
			},
		),
		{ name: 'Catalog' },
	),
);
