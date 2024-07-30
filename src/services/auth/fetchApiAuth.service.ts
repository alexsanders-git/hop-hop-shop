import Cookies from 'js-cookie';

import { CookiesEnums } from '@/utils/enums/cookiesEnums';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/';

const prepareHeaders = (isFile: boolean) => {
	const headers = new Headers();

	const token = Cookies.get(CookiesEnums.access_token);
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}
	if (!isFile) {
		headers.set('Content-Type', 'application/json');
	}
	return headers;
};

const refreshAuthToken = async (isFile: boolean) => {
	try {
		const refreshResponse = await fetch(`${baseUrl}auth/token/refresh/`, {
			method: 'POST',
			headers: prepareHeaders(isFile),
			credentials: 'include',
		});

		if (refreshResponse.ok) {
			const refreshData = await refreshResponse.json();
			Cookies.set(CookiesEnums.access_token, refreshData.data.access);
			return true;
		} else {
			// logoutAll();
			Cookies.remove(CookiesEnums.access_token);
			return false;
		}
	} catch (error) {
		console.error('Error refreshing auth token:', error);
		Cookies.remove(CookiesEnums.access_token);
		// logoutAll();
		return false;
	}
};

// при роботі з авторизацією
export const fetchWithAuth = async (
	url: string,
	options = {},
	isFile = false,
) => {
	try {
		let response = await fetch(`${baseUrl}${url}`, {
			...options,
			headers: prepareHeaders(isFile),
			credentials: 'include',
		});

		if (response.status === 401) {
			const tokenRefreshed = await refreshAuthToken(isFile);
			if (tokenRefreshed) {
				response = await fetch(`${baseUrl}${url}`, {
					...options,
					headers: prepareHeaders(isFile),
					credentials: 'include',
				});
			}
		}

		const json = await response.json();

		console.log(json);

		if (!json || !json.data) throw new Error('No data found.');

		return json;
	} catch (error: unknown) {
		console.error('Error fetching data:', error);
		return error;
	}
};
