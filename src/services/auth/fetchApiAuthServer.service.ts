'use server';
import { cookies } from 'next/headers';

import { CookiesEnums } from '@/utils/enums/cookiesEnums';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/';

const prepareHeaders = () => {
	const headers = new Headers();

	const token = cookies().get(CookiesEnums.access_token);
	if (token?.value) {
		headers.set('Authorization', `Bearer ${token.value}`);
	}

	headers.set('Content-Type', 'application/json');
	return headers;
};

// при роботі з авторизацією
export const fetchWithAuthServer = async (url: string, options = {}) => {
	try {
		let response = await fetch(`${baseUrl}${url}`, {
			...options,
			headers: prepareHeaders(),
			credentials: 'include',
		});

		const json = await response.json();
		console.log(json);
		if (!json || !json.data) throw new Error('No data found.');
		return json;
	} catch (error: unknown) {
		console.error('Error fetching data:', error);
		return error;
	}
};
