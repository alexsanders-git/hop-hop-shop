import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getProductsDashboardServer = async (): Promise<
	IResponse<IProduct>
> => {
	return await fetchData<IProduct>('shop/products/');
};

export const removeProductById = async (id: number) => {
	const res = await fetchWithAuth(`shop/products/${id}`, { method: 'DELETE' });
	return res as boolean;
};

export const getDashboardProducts = async (page: number) => {
	const res = await fetchWithAuth(`shop/products?page=${page}`, {
		method: 'GET',
	});
	return res.data as IDashboardProducts;
};
