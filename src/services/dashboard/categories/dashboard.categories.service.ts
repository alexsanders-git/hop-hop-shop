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
	return res as boolean;
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
