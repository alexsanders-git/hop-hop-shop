import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getDashboardCategoriesServer = async (): Promise<
	IResponse<ICategory>
> => {
	return await fetchData<IResponse<ICategory>>('shop/categories/');
};
export const getCategories = async (): Promise<IResponse<ICategory>> => {
	const res = await fetchWithAuth('shop/categories/');
	return res.data as IResponse<ICategory>;
};
export const removeCategoryById = async (id: number) => {
	const res = await fetchWithAuth(`shop/categories/${id}`, {
		method: 'DELETE',
	});
	return res;
};
export const getDashboardCategories = async (page: number) => {
	const res = await fetchWithAuth(`shop/categories?page=${page}`, {
		method: 'GET',
	});
	return res.data as IResponse<ICategory>;
};

export const getCategoryById = async (id: string) => {
	const res = await fetchWithAuth(`shop/categories/${id}`, {
		method: 'GET',
	});
	return res.data as ICategory;
};

export const createCategory = async (data: {
	name: string;
	description: string;
}) => {
	const res = await fetchWithAuth('shop/categories/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return res;
};

export const updateCategory = async (
	id: number,
	data: {
		name: string;
		description: string;
	},
) => {
	const res = await fetchWithAuth(`shop/categories/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
	return res;
};

export const createCategoryImage = async (id: number, data: FormData) => {
	const res = await fetchWithAuth(
		`shop/categories/${id}/upload-image/`,
		{
			method: 'POST',
			body: data,
		},
		true,
	);
	return res;
};
