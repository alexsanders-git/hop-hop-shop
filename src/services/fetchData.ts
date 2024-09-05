export async function fetchData<T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T | IResponseError> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const url = `${baseURL}/${endpoint}`;
	try {
		const response = await fetch(url, {
			next: {
				revalidate: 200,
			},
			credentials: 'include',
			...options,
		});

		const json = await response.json();
		if (json.success) {
			return json.data as T;
		} else {
			return {
				error: {
					message: json.error?.message || 'Unknown error occurred.',
				},
			} as IResponseError;
		}
	} catch (error) {
		console.error(`Error fetching data: ${url}`, error);
		throw error;
	}
}

export const getCategories = async (): Promise<
	IResponseError | IResponse<ICategory>
> => {
	return await fetchData<IResponse<ICategory>>('shop/categories/');
};

export const getCategoriesById = async (
	id: string,
): Promise<IResponseError | ICategory> => {
	return await fetchData<ICategory>(`shop/categories/${id}`);
};

export const getProductsByCategory = async (
	id: string,
): Promise<IResponseError | IResponse<IProduct>> => {
	return await fetchData<IResponse<IProduct>>(`shop/products/?category=${id}`);
};
export const getLatestArrivalProducts = async (): Promise<
	IResponseError | IProduct[]
> => {
	return await fetchData<IProduct[]>('shop/products/latest_arrival/');
};

export const getPopularProducts = async (): Promise<
	IResponseError | IProduct[]
> => {
	return await fetchData<IProduct[]>('shop/products/popular/');
};
