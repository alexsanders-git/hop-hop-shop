import { LocalStorageEnums } from '@/utils/enums/localStorageEnums';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/';
const prepareHeaders = () => {
	const headers = new Headers();
	const token = localStorage.getItem(LocalStorageEnums.access_token);
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}
	headers.set('Content-Type', 'application/json');
	return headers;
};

const refreshAuthToken = async () => {
	try {
		const refreshResponse = await fetch(`${baseUrl}/auth/refresh-token`, {
			method: 'POST',
			headers: prepareHeaders(),
			credentials: 'include',
		});

		if (refreshResponse.ok) {
			const refreshData = await refreshResponse.json();
			localStorage.setItem(LocalStorageEnums.access_token, refreshData.access);
			return true;
		} else {
			// logoutAll();
			return false;
		}
	} catch (error) {
		console.error('Error refreshing auth token:', error);
		// logoutAll();
		return false;
	}
};
// при роботі з авторизацією
export const fetchWithAuth = async (url: string, options = {}) => {
	try {
		let response = await fetch(`${baseUrl}${url}`, {
			...options,
			headers: prepareHeaders(),
			credentials: 'include',
		});

		if (response.status === 401) {
			const tokenRefreshed = await refreshAuthToken();
			if (tokenRefreshed) {
				response = await fetch(`${baseUrl}${url}`, {
					...options,
					headers: prepareHeaders(),
					credentials: 'include',
				});
			}
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching data:', error);
		return error;
	}
};
