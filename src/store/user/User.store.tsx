import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { LocalStorageEnums } from '@/utils/enums/localStorageEnums';

interface IState {
	user: IUser | null;
}

interface IActions {
	setUser: (user: IUser) => void;
	logout: () => void;
}

export const useUser = create<IState & IActions>()(
	devtools(
		persist(
			immer((set) => ({
				user: null,
				setUser: (payload) =>
					set((state) => {
						state.user = payload;
					}),
				logout: () =>
					set((state) => {
						state.user = null;
						localStorage.removeItem(LocalStorageEnums.access_token);
					}),
			})),
			{ name: 'user' },
		),
	),
);
