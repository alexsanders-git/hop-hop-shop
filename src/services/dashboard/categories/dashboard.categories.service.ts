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
