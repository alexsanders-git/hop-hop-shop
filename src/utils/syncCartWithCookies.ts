import Cookies from 'js-cookie';

import { InterfaceFetchCartData } from '@/store/cart/Cart.interface';

export const syncCartWithCookies = (cart: InterfaceFetchCartData | null) => {
	if (cart) {
		Cookies.set('cart', JSON.stringify(cart), {
			sameSite: 'Lax', // or 'Strict' or 'None', depending on your needs
		});
	} else {
		Cookies.remove('cart');
	}
};
