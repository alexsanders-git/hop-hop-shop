import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getProductsDashboardServer = async (): Promise<
	IResponse<IProduct>
> => {
	return await fetchData<IResponse<IProduct>>('shop/products/');
};

export const removeProductById = async (id: number) => {
	const res = await fetchWithAuth(`shop/products/${id}`, { method: 'DELETE' });
	return res as boolean;
};

export const getDashboardProducts = async (page: number) => {
	const res = await fetchWithAuth(`shop/products?page=${page}`, {
		method: 'GET',
	});
	return res.data as IResponse<IProduct>;
};
export const createProduct = async (data: {
	name: string;
	description: string;
	category: string;
	price: string;
	SKU?: number;
}) => {
	const res = await fetchWithAuth('shop/products/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return res;
};
export const createProductImage = async (id: number, data: FormData) => {
	const res = await fetchWithAuth(
		`shop/products/${id}/upload-images/`,
		{
			method: 'POST',
			body: data,
		},
		true,
	);
	return res;
};
export const getProductByID = async (id: string) => {
	const res = await fetchWithAuth(`shop/products/${id}`, {
		method: 'GET',
	});
	return res.data as IProduct;
};
export const updateProduct = async (
	id: number,
	data: {
		name: string;
		description: string;
		category: number;
		price: number;
		SKU?: number;
	},
) => {
	const res = await fetchWithAuth(`shop/products/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
	return res;
};
