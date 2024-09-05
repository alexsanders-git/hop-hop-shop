import Cookies from 'js-cookie';

import { IResponseGetCart } from '@/types/response/response';

export const syncCartWithCookies = (cart: IResponseGetCart | null) => {
	if (cart) {
		Cookies.set('cart', JSON.stringify(cart), {
			sameSite: 'Lax', // or 'Strict' or 'None', depending on your needs
		});
	} else {
		Cookies.remove('cart');
	}
};
