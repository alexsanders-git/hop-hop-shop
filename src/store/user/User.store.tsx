import Cookies from 'js-cookie';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CookiesEnums } from '@/utils/enums/cookiesEnums';

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
						Cookies.remove(CookiesEnums.access_token);
					}),
			})),
			{ name: 'user' },
		),
	),
);
