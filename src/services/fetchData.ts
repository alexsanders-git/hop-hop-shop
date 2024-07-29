export async function fetchData<T>(endpoint: string): Promise<IResponse<T>> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response = await fetch(`${baseURL}/${endpoint}`, {
			next: {
				revalidate: 200,
			},
			credentials: 'include',
		});

		if (!response.ok) throw new Error('Unable to fetch posts.');

		const json = await response.json();

		if (!json || !json.data) throw new Error('No data found.');

		return json.data as IResponse<T>;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export async function fetchDefault<T>(endpoint: string): Promise<T> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response = await fetch(`${baseURL}/${endpoint}`, {
			next: {
				revalidate: 200,
			},
			credentials: 'include',
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

export const getCategories = async (): Promise<ICategory[]> => {
	const res = await fetchData<ICategory>('shop/categories/');
	return res.items as ICategory[];
};

export const getCategoriesById = async (
	id: string,
): Promise<IResponse<ICategory>> => {
	return await fetchData<ICategory>(`shop/categories/${id}`);
};

export const getProductsByCategory = async (
	id: string,
): Promise<IResponse<IProduct>> => {
	return await fetchData<IProduct>(`shop/products/?category=${id}`);
};
export const getSearchProducts = async (
	search: string,
): Promise<IResponse<IProduct>> => {
	return await fetchData<IProduct>(`shop/products/?name=${search}`);
};
export const getLatestArrivalProducts = async (): Promise<IProduct[]> => {
	return await fetchDefault<IProduct[]>('shop/products/latest_arrival/');
};

export const getPopularProducts = async (): Promise<IProduct[]> => {
	return await fetchDefault<IProduct[]>('shop/products/popular/');
};

export const fetchDataProductPage = async (id: string): Promise<IProduct> => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;

		const res = await fetch(`${baseURL}/shop/products/${id}/`, {
			next: {
				revalidate: 200,
			},
		});
		if (!res.ok) {
			throw new Error(`Error fetching product data: ${res.statusText}`);
		}

		const json = await res.json();
		const product: IProduct = json.data;
		return product;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
