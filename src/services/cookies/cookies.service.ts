import Cookies from 'js-cookie';

import { CookiesEnums, UserEnum } from '@/utils/enums/cookiesEnums';

export const fetchWithCookies = async <T>(
	url: string,
	options?: RequestInit,
): Promise<IResponseJson<T>> => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response = await fetch(`${baseURL}${url}`, {
			credentials: 'include',
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {}),
			},
		});

		const json = (await response.json()) as IResponseJson<T>;
		return json;
	} catch (error) {
		console.error('Fetch failed:', error);
		throw error;
	}
};

export const Logout = async () => {
	try {
		Cookies.remove(CookiesEnums.access_token);
		Cookies.remove(CookiesEnums.refresh_token);
		Cookies.remove(UserEnum.user);
		console.log('removed');
		return true;
	} catch (error) {
		console.error('LogOut failed:', error);
		return false;
	}
};
