export async function fetchData<T>(
	endpoint: string,
	options?: RequestInit,
): Promise<IResponseJson<T>> {
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

		return (await response.json()) as IResponseJson<T>;
	} catch (error) {
		console.error(`Error fetching data: ${url}`, error);
		throw error;
	}
}

export const getCategories = async (): Promise<
	IResponseJson<IResponse<ICategory>>
> => {
	return await fetchData<IResponse<ICategory>>('shop/categories/');
};

export const getCategoriesById = async (
	id: string,
): Promise<IResponseJson<ICategory>> => {
	return await fetchData<ICategory>(`shop/categories/${id}`);
};

export const getProductsByCategory = async (
	id: string,
): Promise<IResponseJson<IResponse<IProduct>>> => {
	return await fetchData<IResponse<IProduct>>(`shop/products/?category=${id}`);
};
export const getLatestArrivalProducts = async (): Promise<
	IResponseJson<IProduct[]>
> => {
	return await fetchData<IProduct[]>('shop/products/latest_arrival/');
};

export const getPopularProducts = async (): Promise<
	IResponseJson<IProduct[]>
> => {
	return await fetchData<IProduct[]>('shop/products/popular/');
};
export const getAllCategories = async (): Promise<
	IResponseJson<ICategory[]>
> => {
	return await fetchData<ICategory[]>('shop/categories/all/');
};
