export const fetchWithAuth = async (url: string, options?: RequestInit) => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${baseURL}${url}`, {
		credentials: 'include',
		...options,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
};
