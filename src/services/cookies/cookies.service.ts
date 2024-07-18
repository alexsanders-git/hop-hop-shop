export const fetchWithCookies = async (url: string, options?: RequestInit) => {
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

		return response.json();
	} catch (error) {
		console.error('Fetch failed:', error);
		return error;
	}
};
