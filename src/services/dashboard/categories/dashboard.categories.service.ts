import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getDashboardCategoriesServer = async (): Promise<
	IResponse<ICategory>
> => {
	return await fetchData<ICategory>('shop/categories/');
};

export const removeCategoryById = async (id: number) => {
	const res = await fetchWithAuth(`shop/categories/${id}`, {
		method: 'DELETE',
	});
	console.log(res);
	const data = await getDashboardCategoriesServer();
	if (data) {
		return data as IResponse<ICategory>;
	}
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

export const updateCategory = async (data: {
	name: string;
	description: string;
}) => {
	const res = await fetchWithAuth('shop/categories/', {
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
