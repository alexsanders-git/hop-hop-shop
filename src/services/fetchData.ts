export const fetchDataCart = async (url: string, options?: RequestInit) => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${baseURL}${url}`, {
		credentials: 'include',
		...options,
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
};

export async function fetchData<T>(endpoint: string): Promise<T> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response = await fetch(`${baseURL}/${endpoint}`, {
			next: {
				revalidate: 200,
			},
		});

		if (!response.ok) throw new Error('Unable to fetch posts.');

		const json = await response.json();

		if (!json || !json.data) throw new Error('No data found.');

		return json.data as T;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export const getCategories = async (): Promise<ICategory[]> => {
	return await fetchData<ICategory[]>('shop/categories/');
};

export const getCategoriesById = async (id: string): Promise<ICategory> => {
	return await fetchData<ICategory>(`shop/categories/${id}`);
};

export const getProducts = async (): Promise<IProduct[]> => {
	return await fetchData<IProduct[]>('shop/products/');
};

export const getProductsByCategory = async (
	id: string,
): Promise<IProduct[]> => {
	return await fetchData<IProduct[]>(`shop/products/?category=${id}`);
};

export const getLatestArrivalProducts = async (): Promise<IProduct[]> => {
	return await fetchData<IProduct[]>('shop/products/latest_arrival/');
};

export const getPopularProducts = async (): Promise<IProduct[]> => {
	return await fetchData<IProduct[]>('shop/products/popular/');
};

export const fetchDataProductPage = async (
	id: string,
): Promise<IProduct | null> => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;

		const res = await fetch(`${baseURL}/shop/products/${id}/`, {
			// mode: 'cors',
		});
		if (!res.ok) {
			throw new Error(`Error fetching product data: ${res.statusText}`);
		}

		const json = await res.json();
		const product: IProduct = json.data;
		return product;
	} catch (error) {
		console.error('Failed to fetch product data:', error);
		return null;
	}
};
